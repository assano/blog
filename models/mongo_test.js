var mongodb = require('./db');


//存储用户信息
var save = function(callback) {
	//要存入数据库的文档
	var user = {
		name: 'wangyang',
		password: '111111',
		email: 'test@163.com'
	};
	console.log('1====');  //========================
	//打开数据库
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		//读取users集合
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//将用户数据插入users 集合
			collection.insert(user, {safe: true}, function(err, user) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, user[0]);  //成功，并返回存储后的用户文档
			});
		});
	});
}

//读取用户信息
var get = function(name, callback) {
	//打开数据库
	mongodb.open(function(err, db) {
		console.log('b====');  //========================
		if (err) {
			return callback(err);
		}
		//读取users集合
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//查找用户名为name 的一个文档
			collection.findOne({name: name}, function(err, user) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, user);
			});
		});
	});
}

save(function(err, user) {
	if (err) {
		console.log('err=======');
	}
	console.log('user: ' + user);
});