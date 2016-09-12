var express = require('express');
var router = express.Router();

var crypto = require('crypto');
var User = require('../models/user.js');
var Blog = require('../models/post.js');

//test
router.get('/hello/', function(req, res, next) {
	res.send('<h2>hello, this is test!</h2>');
});

//主页
router.get('/', function(req, res, next) {

	//取得已经发表的博文
	// var blog = new Blog({
	// 	title: '',
	// 	content: '',
	// 	userName: '',
	// 	postDate: new Date()
	// });
	Blog.getAll(function(docs) {
		if (req.session.user) {  //已登录
			res.render('index', { title: '主页', state: 'logined', blogs: docs});
		} else {   				 //未登录
			res.render('index', { title: '主页', state: 'unlogined',  blogs: docs});
		}
	});

});

//注册页面
router.get('/reg', function(req, res, next) {
	//已登录
	if (req.session.user) {
		res.render('reg', { title: '注册', state: 'logined'});
	} else {   //未登录
		res.render('reg', { title: '注册', state: 'unlogined'});
	}
});
//注册
router.post('/reg', function(req, res, next) {
	var name = req.body.name;
	var password = req.body.password;
	var passwordRe = req.body['password-repeat'];
	//检查两次密码输入时候一致
	if (password != passwordRe) {
		req.flash('error', '两次输入的密码不一致!');
		console.log('password:' + password);
		console.log('repeat password:' + passwordRe);
		return res.redirect('/reg');
	}
	//生成密码的md5值
	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
	var newUser = new User({
		name: req.body.name,
		password: password,
		email: req.body.email
	});
	//检查用户名是否已经存在
	User.get(newUser['name'], function(err, user) {
		console.log('user:' + user);
		if (user) {
			req.flash('error', '用户已经存在!');
			console.log('用户已存在!');
			return res.redirect('/reg');    //返回注册页面
		}
		//如果用户不存在则新增用户
		newUser.save(function(err, user) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/reg');
			}
			req.session.user = user;  //用户信息存入session
			req.flash('success', '注册成功!');
			res.redirect('/');        //注册成功后返回主页
			console.log('session:' + req.session.user);
		});
	});

});

//登录页面
router.get('/login', function(req, res, next) {
	//已登录
	if (req.session.user) {
		res.render('login', { title: '登录', state: 'logined'});
	} else {   //未登录
		res.render('login', { title: '登录', state: 'unlogined'});
	}
});

//登录
router.post('/login', function(req, res, next) {
	var name = req.body.name;
	var password = req.body.password;
	if (name == '' || password == '') {
		return res.redirect('/login');
	}
	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
	var user = new User({
		name: req.body.name,
		password: password,
	});
	//取得已注册的用户信息
	User.get(name, function(err, user) {
		if (err) {
			return res.redirect('/login');
		}
		//比对用户密码
		if (user && password == user.password) {
			req.session.user = user;        //用户信息存入session
			req.flash('success', '登陆成功!');
			console.log('session:' + req.session.user);
			return res.redirect('/');        //登陆成功后返回主页
		} else {
			req.flash('error', '用户名或密码错误!');
			return res.redirect('/login');
		}
	});

});

//页面权限控制
router.get('/post', function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
});

//发表页面
router.get('/post', function(req, res, next) {
	res.render('post', {title: '发表'});
});
//发表
router.post('/post', function(req, res, next) {
	//获得前端传来的博文
	console.log('=========session=======:' + req.session.user);
	var newBlog = new Blog({
		title: req.body.title,
		content: req.body.content,
		userName: req.session.user['name'],
		postDate: new Date()
	});
	//存入mongo
	newBlog.save(function(err, blog) {
		console.log('发表新博文成功!');
		console.log('标题:' + blog.title);
		//返回主页
		return res.redirect('/');
	});

});

//退出登录
router.get('/logout', function(req, res, next) {
	//删除session
	req.session.user = null;
	return res.redirect('/');
});

module.exports = router;
