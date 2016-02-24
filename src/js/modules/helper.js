var cookie =  require('./cookie.js');
var view = require('./view.js');
var md5 = require('md5');
var model = require('./model.js');
var request = require('superagent');


var helper = module.exports = {
  init: function() {
    helper.toggleNotify();
    helper.getHotlistsData();
    helper.loginModal();
    helper.loginState();
  },

  toggleNotify: function() {
    var close = document.querySelector("#notify");
    if (!cookie.getItem('topNotify')) {
      close.addEventListener('click', helper.closeNotify);
    } else {
      view.notifyDisplay('none');
    }
  },

  closeNotify: function(e) {
    view.notifyDisplay();
    cookie.setItem('topNotify', 'true');
    e.target.removeEventListener('click', helper.closeNotify);
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

  modalOpen: function(e) {
    var node = e.target;
    if (node && node === document.querySelector('#isfollow') && !cookie.getItem('loginSuc')) {
      view.modalShow();
    }
  },

  loginModal: function() {
    document.addEventListener('click', helper.modalOpen);
    document.addEventListener('click', helper.modalClickClose);
    document.querySelector('.modal').addEventListener('click', helper.modalClickOutside);
  },

  loginState: function() {
    if (cookie.getItem('followSuc')) {
      view.updateFollowUI();
    }
    document.querySelector('form').addEventListener('submit', helper.pocceedLogin);
  },

  pocceedLogin: function(e) {
    var userName = document.querySelector('#username'),
        password = document.querySelector('#password');
    e.preventDefault();
    if (!cookie.getItem('loginSuc') && userName.value && password.value) {
      helper.getLoginData(md5(userName.value), md5(password.value));
    }
  },

  getLoginData: function(userName, password) {
    request.get('http://study.163.com/webDev/login.htm')
      .query({userName: userName, password: password})
      .end(function(err,res) {
        if (+res.text === 1) {
          cookie.setItem('loginSuc', 'true');
          document.querySelector('form').removeEventListener('submit', helper.pocceedLogin);
          view.modalClose();
          helper.getFollowData();
        } else {
          view.loginAlert();
        }
      })
  },
  getFollowData: function() {
      request.get('http://study.163.com/webDev/attention.htm', function(err, res) {
        if (+res.text === 1) {
          cookie.setItem('followSuc', 'true');
          view.updateFollowUI();
        } else {
          alert('关注失败');
        }
      })
  },

  getHotlistsData: function() {
    request.get('http://study.163.com/webDev/hotcouresByCategory.htm', function(err, res) {
      model.hotData = JSON.parse(res.text);
      model.hotData.sort(function(a, b) { return b.learnerCount - a.learnerCount });
      view.drawHotlists(model.hotData);
    })
  }
};
