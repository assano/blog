var mongodb = require('./db');

function Blog(blog) {
	this.title = blog.title; 
	this.content = blog.content;
	this.userName = blog.userName;
	this.postDate = blog.postDate;
}

//存储微博信息
Blog.prototype.save = function(callback) {
	//要存入数据库的文档
	var blog = {
		title: this.title,
		content: this.content,
		userName: this.userName,
		postDate: this.postDate
	};
	//打开数据库
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		//读取blogs集合
		db.collection('blogs', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//将新博文插入 blogs集合
			collection.insert(blog, {safe: true}, function(err, blog) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, blog);  //成功，并返回存储后的用户文档
			});
		});
	});
}

//读取用户的微博
Blog.get = function(name, callback) {
	//打开数据库
	mongodb.open(function(err, db) {
		if (err) {
			console.log('mongo get error');
			return callback(err);
		}
		//读取blogs集合
		db.collection('blogs', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//查找用户名为name 的博文   ==================未分页
			collection.find({name: name}, function(err, blogs) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, blogs);
			});
		});
	});
}

//读取所有的微博
Blog.getAll = function(callback) {
	//打开数据库
	mongodb.open(function(err, db) {
		if (err) {
			console.log('mongo get error');
			return callback(err);
		}
		//读取blogs集合
		db.collection('blogs', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//查找用户名为name 的博文   ==================未分页
			// collection.find({}, function(err, blogs) {
			// 	mongodb.close();
			// 	if (err) {
			// 		return callback(err);
			// 	}
			// 	callback(blogs);
			// });
			collection.find({}).toArray(function(err, docs) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
			    // console.dir(docs);
			    callback(docs);
  			});
		});
	});
}

module.exports = Blog;