const _ = require('lodash');
const path = require('path');

const config = require(path.join(__dirname, '/config/config'));

const mongoose = require('mongoose');

const models = require(path.join(__dirname, '/app/models/'));
const routes = require(path.join(__dirname, '/app/routes/'));

const restify = require('restify');
const server = restify.createServer();
const restifyPlugins = restify.plugins;


server.use(restifyPlugins.bodyParser());
server.use(restifyPlugins.queryParser());
server.use(restifyPlugins.gzipResponse());
server.pre(restify.pre.sanitizePath());

server.use(
  function crossOrigin(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    return next();
  }
);

models();
const Pool = mongoose.model('Pool');
routes(server);

server.get(/.*/, restifyPlugins.serveStatic({
  directory: './webapp/dist',
  default: 'index.html'
}));

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name, {useMongoClient: true})
  .then(() => {
    server.listen(8080, async () => {
      console.log('%s listening at %s', server.name, server.url);

      const updateFunc = async () => {
        const ps = await Pool.getToRefresh();

        await Promise.all(_.map(ps, async (p) => {
          try {
            await new Promise(resolve => {
              setTimeout(resolve, (Math.random() * 5 + 1) * 1000);
            });
            console.log('Update pool status of ' + p._id);

            let startTime = new Date();
            const peers = await p.getPeers();
            let endTime = new Date();

            let diff = endTime-startTime;
            startTime = new Date();
            await p.updateStats();
            endTime = new Date();

            diff += endTime-startTime;
            diff /= 2;
            if(!p.ping || p.ping === 0) {
              p.ping = diff;
            } else {
              // Average over time
              p.ping = Math.floor(p.ping*0.3 + p.ping*0.7);
            }
            p.errCounter = 0;
            p.sucCounter += 1;
            await Promise.all(_.map(peers, async (it) => {
              let p = await Pool.findOne({ip: it});
              if (!p) {
                await Pool.create({ip: it});
              }
            }));
          }
          catch (err) {
            p.errCounter += 1;
            p.sucCounter = 0;
            p.last_offline = Date.now();
          }
          finally {
            await p.save();
          }
        }));
        setTimeout(updateFunc, 1);
      };
      updateFunc();
    });
  }).catch(console.log);