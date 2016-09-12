var config = require('../config');
// 	Db = require('mongodb').Db,
// 	Connection = require('mongodb').Connection,
// 	Server = require('mongodb').Server;

// // module.exports = new Db(config.db, new Server(config.host, Connection.DEFAULT_PORT), {safe: true});
// module.exports = new Db(config.db, new Server(config.host, 27017), {safe: true});

var mongo = require("mongodb"),
  Server = mongo.Server,
  mongoServer = new mongo.Server('localhost', 27017, {safe: true}),
  db = new mongo.Db('blog',mongoServer, {safe: true});

module.exports = db;