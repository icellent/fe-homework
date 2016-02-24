var helper = require('./helper.js');

var view = module.exports = {

  notifyDisplay: function(none) {
    var topNotify = document.querySelector(".u-top-notify");
    if (none !== undefined) {
      topNotify.style.display = none;
    } else {
      topNotify.style.opacity = 1;
      setTimeout(function() {
        topNotify.style.opacity = 0;
      }, 50);
      setTimeout(function() {
        topNotify.style.display = 'none';
      }, 250);
    }
  },

  modalClose: function() {
    if (document.querySelector('.modal-backdrop')) {
      document.body.removeChild(document.querySelector('.modal-backdrop'));
    }
    document.getElementsByClassName('modal')[0].style.display = 'none';
  },

  modalShow: function() {
    var backdrop = document.createElement('div');
    backdrop.setAttribute("class", "modal-backdrop");
    document.body.appendChild(backdrop);
    document.getElementsByClassName('modal')[0].style.display = 'block';
  },

  loginAlert: function() {
    var span = document.createElement('span');
    span.setAttribute('class', 'alert');
    span.innerHTML = "用户名或密码错误";
    document.querySelector('.modal .modal-body').appendChild(span);

    // setTimeout(function() {
    //   span.style.opacity = 0.8;
    // }, 1000);
    // setTimeout(function() {
    //   span.style.opacity = 0.4;
    // }, 1000);
    setTimeout(function() {
      span.style.opacity = 0;
    }, 1200);
    setTimeout(function() {
      document.querySelector('.modal .modal-body').removeChild(span);
    }, 1800);
  },

  removeAlert: function(el) {
    document.querySelector('.modal .modal-body').removeChild('span');
  },

  resetPassword: function() {
    document.querySelector('#password').value = "";
  },

  updateFollowUI: function () {
    var isfollow = document.getElementById('isfollow');
    isfollow.classList.add('followed');
    isfollow.innerHTML = '<i class="fa fa-check"></i> 已关注 | <a href="#">取消</a>';
  },


  toggleModal: function() {
    document.addEventListener('click', view.modalShow);
    document.addEventListener('click', view.modalClickClose);
    document.querySelector('.modal').addEventListener('click', view.modalClickOutside);
  },

  drawHotlists: function(data) {
    document.querySelector(".hot-lists").innerHTML = "";
    for (var i = 0; i < data.length; i++) {
      if (i > 10) {
        break;
      }
      var li = document.createElement('li'),
          a = document.createElement('a'),
          featureSpan = document.createElement('span'),
          descSpan = document.createElement('span'),
          span = document.createElement('span'),
          p = document.createElement('p'),
          img = document.createElement('img');
          p.innerHTML = data[i].name;
       a.setAttribute('href', data[i].providerLink);
       img.setAttribute('src', data[i].smallPhotoUrl);
       span.innerHTML = data[i].learnerCount;
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
  }
};
