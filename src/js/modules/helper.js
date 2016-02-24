var model = require('./model.js');
var cookie =  require('./cookie.js');
var md5 = require('md5');


var helper = module.exports = {
  getCookie: function(name) {
    return cookie.getItem(name);
  },

  setCookie: function(name, value) {
    return cookie.setItem(name, value);
  },
  randomize: function(array) {
    array.sort(function(a, b) {
      return b.learnerCount - a.learnerCount;
    })
  },
  validate: function(username, password) {
    if (username && password) {
      username = md5(username);
      password =  md5(password);

      return model.loginData(username, password);
    }
  },

  getFollowState: function() {

  },
  getHottest: function() {
    helper.randomize(model.hotData);
    for (var i = 0; i < model.hotData.length; i++) {
      if (i > 9) {
        break;
      }
      model.randomHotData[i] = model.hotData[i];
    }
    return model.randomHotData;
  }
};
