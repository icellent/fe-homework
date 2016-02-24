var helper = require('./helper.js');

var view = module.exports = {
  init: function() {
    this.toggleNotify();
    this.hottestList();
    this.toggleModal();
  },

  notifyDisplay: function(toggle) {
    var topNotify = document.querySelector(".u-top-notify");
    topNotify.style.display = toggle;
  },

  toggleNotify: function() {
    var close = document.querySelector("#notify");
    if (helper.getCookie("topNotify")) {
      view.notifyDisplay('none');
    } else {
      view.notifyDisplay('block');
      close.addEventListener('click', function(e) {
        helper.setCookie("topNotify", "true");
        view.notifyDisplay('none');
        this.removeEventListener('click');
      });
    }
  },

  backdrop: function() {
    var backdrop = document.createElement('div');
    backdrop.setAttribute("class", "modal-backdrop");
    document.body.appendChild(backdrop);
  },

  modalClickOutside: function(e) {
    var node = e.target;
    while (node && node != document.body) {
      if (node === document.querySelector('.modal-dialog')) {
        return;
      }
      node = node.parentNode;
    }
    view.modalClose();
  },

  modalClickClose: function(e) {
    var node = e.target;
    if (node && node === document.querySelector('.modal button.close>span')) {
      view.modalClose();
    }
  },

  modalClose: function() {
      if (document.querySelector('.modal-backdrop')) {
        document.body.removeChild(document.querySelector('.modal-backdrop'));
      }
      document.getElementsByClassName('modal')[0].style.display = 'none';
  },

  modalShow: function(e) {
    var node = e.target;
    if (node && node === document.querySelector('#isfollow') && !helper.getCookie('loginSuc')) {
      view.backdrop();
      document.getElementsByClassName('modal')[0].style.display = 'block';
    }
  },

  updateFollowUI: function () {
    var isfollow = document.getElementById('#isfollow');
    isfollow.classList.add('followed');
    isfollow.innerHTML = '<i class="fa fa-check"></i> 已关注 | <a href="#">取消</a>'
  },

  userLogin: function(e) {
      var username = document.querySelector('#username').value;
      var password = document.querySelector('#password').value;
      if (helper.validate(username, password)) {
        helper.setCookie('loginSuc', 'true');
        if (help.getFollowState() === 1) {
          helper.setCookie('followSuc', 'true');
        }
        view.modalClose();
        view.updateFollowUI();
      }
      else {
        alert('login fail');
      }
  },

  toggleModal: function() {
    document.addEventListener('click', view.modalShow);
    document.addEventListener('click', view.modalClickClose);
    document.querySelector('.modal').addEventListener('click', view.modalClickOutside);
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
