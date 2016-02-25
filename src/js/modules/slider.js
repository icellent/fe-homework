var slider = module.exports = {
  slideEvent: function() {
    var childNodes = document.querySelectorAll('.slide-indicators li');
    var sliders = document.querySelectorAll('#slideshow .slide');

    var indicatSlide = function(e) {
      var that = this;
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i] !== that) {
          childNodes[i].classList.remove('active');
          sliders[i].style.display = 'none';
        } else {
          this.className = 'active';
          sliders[i].style.display = 'block';
        }
      }
    };
    for (var i = 0; i < childNodes.length; i++) {
      childNodes[i].addEventListener('click', indicatSlide);
    }
  },
};
