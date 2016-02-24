// var request = require('superagent');

var model = module.exports = {
  init: function() {
    model.getHotData();
  },

  hotData: [],

  randomHotData: [],

  getHotData: function() {
    var xhr = new XMLHttpRequest();
    function handleData() {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          model.hotData = JSON.parse(xhr.responseText);
        }
      }
    };
    xhr.open('GET','http://study.163.com/webDev/hotcouresByCategory.htm', true);
    xhr.send(null);
    xhr.onreadystatechange = handleData;
    // request.get('http://study.163.com/webDev/hotcouresByCategory.htm', function(err, res) {
    //   model.hotData = JSON.parse(res.text);
    // })
  }
};
