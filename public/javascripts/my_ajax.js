/**
 * Created by wy on 2016/9/20.
 */

var page = 2;

var moreBlogs = function (page) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log(xhr.responseText);
                page++;
            }
        }
    };
    var url = 'http://localhost:3000/more_blogs?' + page;
    xhr.open('GET', url);
    xhr.send(null);
}