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
                //添加DOM元素显示
                var ele = document.getElementsByTagName('article')[0];
                var jsonArray = JSON.parse(xhr.responseText);

                if (jsonArray.length > 0) {
                    window.page++;
                    for (var i = 0; i < jsonArray.length; i++) {
                        var child = document.createElement('div');
                        var childH4 = document.createElement('h4');
                        var childP = document.createElement('p');
                        var childSpan1 = document.createElement('span');
                        var childA = document.createElement('a');
                        var childSpan2 = document.createElement('span');
                        var childBr = document.createElement('br');

                        childH4.innerHTML = jsonArray[i].title;
                        childP.innerHTML = jsonArray[i].content;
                        childA.innerHTML = jsonArray[i].userName + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                        childSpan2.innerHTML = String(jsonArray[i].postDate).substr(0, 24);

                        // alert(String(jsonArray[i].postDate));

                        child.setAttribute('id', 'blog');
                        childA.setAttribute('href', '#');
                        childA.setAttribute('id', 'name');

                        child.appendChild(childH4);
                        child.appendChild(childP);
                        childSpan1.appendChild(childA);
                        child.appendChild(childSpan1);
                        child.appendChild(childSpan2);
                        ele.appendChild(child);
                        ele.appendChild(childBr);
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