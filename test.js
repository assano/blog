/**
 * Created by wy on 2016/9/20.
 */
var Blog = require('./models/post');

// Blog.deleteOne('57e0c2695e018530f4e7fe56', function (result) {
//     console.log(result);
// });
Blog.getBlogsByPage(1, function (docs) {
    console.dir(docs);
});