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

  videoMoal: function() {
    var vid = '<div class="modal-header">';
          vid += '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
          vid += '<h4 class="modal-title video-title">请观看下面的视频</h4>';
        vid += '</div>';
        vid += '<div class="modal-body">';
          vid += '<video src="http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4" controls width="890"></video>';
        vid += '</div>';
    document.querySelector('.modal-dialog').style.width = '950px';
    document.querySelector('.modal-dialog>.modal-content').innerHTML = vid;
  },

  loginModal: function() {
    var lm = '<div class="modal-header">';
          lm += '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
          lm += '<h4 class="modal-title">登录网易云课堂</h4>';
        lm += '</div>';
        lm += '<form action="">';
          lm += '<div class="modal-body">';
            lm += '<input type="text" name="name" id="username" placeholder="用户名">';
            lm += '<input type="password" name="password" id="password" placeholder="密码">';
          lm += '</div>';
            lm += '<div class="modal-footer">';
            lm += '<button type="submit">登录</button>';
          lm += '</div>';
        lm += '</form>';
    document.querySelector('.modal-dialog').style.width = '390px';
    document.querySelector('.modal-dialog>.modal-content').innerHTML = lm;
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

  generateList: function(data) {
    var li = document.createElement('li');
    var node = '<a href="' + data.providerLink + '#">';
        node += '<span class="feature">';
        node += '<img src="' + data.smallPhotoUrl + '" alt="">';
        node += '</span>';
        node += '<span class="desc">';
        node += '<p>' + data.name +'</p>';
        node += '<span>' + data.learnerCount + '</span>';
        node += '</span>';
        node += '</a>';
    li.innerHTML = node;
    document.querySelector(".hot-lists").appendChild(li);
  },

  drawHotlists: function(data) {
    var hotlists = document.querySelector(".hot-lists");
    var n = 0;
    hotlists.innerHTML = "";
    for (var i = 0; i < 10; i++) {
      view.generateList(data[i]);
    }
    function updatelist() {
        hotlists.removeChild(hotlists.firstChild);
        view.generateList(data[n+10]);
        n++;
      if (n < 10) {
        setTimeout(updatelist, 5000);
      }
    }
    setTimeout(updatelist, 5000);
  }
};
