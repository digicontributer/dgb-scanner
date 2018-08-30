const _ = require('lodash');
const path = require('path');
const mongoose = require('mongoose');

const logger = require('./../lib/logger');

const Pool = mongoose.model('Pool');
const Node = mongoose.model('Node');
const config = require(path.join(__dirname, '../../config/config'));

module.exports = (server) => {
  const nodeUpdateFunc = async () => {
    const nodes = await Node.find({
      errCounter: {$lt: 5}
    }).sort({
      updatedAt: 1
    }).limit(10);
    await Promise.all(_.map(nodes, async (n) => {
      logger.debug('Update node status of ' + n.ip);
      try {
        let peers = await n.updateInfo();
        n.sucCounter += 1;
        peers = _.sortBy(peers, 'time');
        await Promise.all(_.map(peers, async (it) => {
          let n = await Node.findOne({
            ip: it.ip
          });
          if (!n) {
            n = await Node.create({
              ip: it.ip,
              port: config.coin.port
            });
          }
        }));
      }
      catch (err) {
        n.errCounter += 1;
      }
      finally {
        await n.save();
      }
    }));
    setTimeout(nodeUpdateFunc, 1);
  };

  logger.info('Start scanning of nodes and pools');
  setTimeout(nodeUpdateFunc, 1);
};