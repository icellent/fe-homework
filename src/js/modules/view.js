var helper = require('./helper.js');

var view = module.exports = {
  init: function() {
    this.toggleNotify();
    this.hottestList();
  },

  toggleNotify: function() {
    var topNotify = document.querySelector(".u-top-notify");
    var close = document.querySelector("#notify");
    if (helper.getCookie("topNotify")) {
      topNotify.style.display = 'none';
    } else {
      topNotify.style.display = 'block';
      close.addEventListener('click', function(e) {
        helper.setCookie("topNotify", "true");
        topNotify.style.display = 'none';
      });
    }
  },

  hottestList: function() {
    document.querySelector(".hot-lists").innerHTML = "";
    document.addEventListener('readystatechange', function() {
      var item = helper.getHottest();
      for (var i = 0; i < item.length; i++) {
        var li = document.createElement('li'),
            a = document.createElement('a'),
            featureSpan = document.createElement('span'),
            descSpan = document.createElement('span'),
            span = document.createElement('span'),
            p = document.createElement('p'),
            img = document.createElement('img');
            p.innerHTML = item[i].name;
         a.setAttribute('href', item[i].providerLink);
         img.setAttribute('src', item[i].smallPhotoUrl);
         span.innerHTML = item[i].learnerCount;
         featureSpan.setAttribute('class', 'feature');
         descSpan.setAttribute('class', 'desc');
         featureSpan.appendChild(img);
         descSpan.appendChild(p);
         descSpan.appendChild(span);
         a.appendChild(featureSpan);
         a.appendChild(descSpan);
         li.appendChild(a);
         document.querySelector(".hot-lists").appendChild(li);
      }
    });
  }
};
