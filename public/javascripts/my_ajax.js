/**
 * Created by wy on 2016/9/20.
 */

var page = 1;

var moreBlogs = function (page) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log(xhr.responseText);
                //添加DOM元素显示
                // var ele = document.getElementById('content');
                var ele = document.getElementsByTagName('article')[0];
                var jsonArray = JSON.parse(xhr.responseText);

                if (jsonArray.length > 0) {
                    window.page++;
                    for (var i = 0; i < jsonArray.length; i++) {
                        var child = document.createElement('div');
                        var a = document.createElement('a');
                        a.innerHTML = jsonArray[i].content;
                        a.setAttribute('href', '#');
                        child.appendChild(a);
                        ele.appendChild(child);
                    }
                }
            }
        }
    };
    var url = 'http://localhost:3000/more_blogs?page=' + window.page;
    xhr.open('GET', url);
    xhr.send(null);
}

var hello = function () {
    alert("hello, world");
}