/*jslint node: true */
'use strict';

const path = require('path');

const rootPath = path.normalize(__dirname + '/..');

const NODE_ENV = process.env.NODE_ENV || 'development';
const NODE_HOST = process.env.NODE_HOST || '0.0.0.0';
const NODE_PORT = process.env.NODE_PORT || 9000;
const MONGO_HOST = process.env.MONGO_HOST || '127.0.0.1';
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const APP_NAME = 'dgb-node-scanner-';

const config = {
  development: {
    root: rootPath,
    app: {
      name: APP_NAME + NODE_ENV,
      address: NODE_HOST,
      port: NODE_PORT
    },
    db: {
      host: MONGO_HOST,
      port: MONGO_PORT,
      name: APP_NAME + NODE_ENV
    },
    log: {
      name: APP_NAME + NODE_ENV,
      level: 'debug',
      exceptions: true
    },
    p2pool: {
      net1: {
        seeds: 'crypto.office-on-the.net pool.boxienet.net'.split(' '),
        port: 5029
      },
      net2: {
        seeds: 'crypto.office-on-the.net pool.boxienet.net'.split(' '),
        port: 5029
      }
    },
    coin: {
      seeds: [
        'digiexplorer.info',
        'seed.digibyteprojects.com',
        'seed.digibyte.co',
        'seed.digibyte.io'
      ],
      port: 12024,
      magic: [0xfa, 0xc3, 0xb6, 0xda]
    }
  },
  test: {
    root: rootPath,
    app: {
      name: APP_NAME + NODE_ENV,
      address: NODE_HOST,
      port: NODE_PORT
    },
    db: {
      host: MONGO_HOST,
      port: MONGO_PORT,
      name: APP_NAME + NODE_ENV
    },
    log: {
      name: APP_NAME + NODE_ENV,
      level: LOG_LEVEL,
      exceptions: true
    },
    p2pool: {
      net1: {
        seeds: 'crypto.office-on-the.net pool.boxienet.net'.split(' '),
        port: 5029
      },
      net2: {
        seeds: 'crypto.office-on-the.net pool.boxienet.net'.split(' '),
        port: 5029
      }
    },
    coin: {
      seeds: [
        'digiexplorer.info',
        'seed.digibyteprojects.com',
        'seed.digibyte.co',
        'seed.digibyte.io'
      ],
      port: 12024,
      magic: [0xfa, 0xc3, 0xb6, 0xda]
    }
  },
  production: {
    root: rootPath,
    app: {
      name: APP_NAME + NODE_ENV,
      address: NODE_HOST,
      port: NODE_PORT
    },
    db: {
      host: MONGO_HOST,
      port: MONGO_PORT,
      name: APP_NAME + NODE_ENV
    },
    log: {
      name: APP_NAME + NODE_ENV,
      level: LOG_LEVEL,
      exceptions: true
    },
    p2pool: {
      net1: {
        seeds: 'crypto.office-on-the.net pool.boxienet.net'.split(' '),
        port: 5029
      },
      net2: {
        seeds: 'crypto.office-on-the.net pool.boxienet.net'.split(' '),
        port: 5029
      }
    },
    coin: {
      seeds: [
        'digiexplorer.info',
        'seed.digibyteprojects.com',
        'seed.digibyte.co',
        'seed.digibyte.io'
      ],
      port: 12024,
      magic: [0xfa, 0xc3, 0xb6, 0xda]
    }
  }
};

module.exports = config[NODE_ENV];