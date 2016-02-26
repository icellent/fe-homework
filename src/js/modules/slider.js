var slider = module.exports = {
  slideEvent: function() {
    var childNodes = document.querySelectorAll('.slide-indicators li');
    var sliders = document.querySelectorAll('#slideshow .slide');
    // var n = 0;
    // setTimeout(function() {
    //   if (n<2) {
    //     sliders[n].style.opacity = 0;
    //     childNodes[n].classList.remove('active');
    //     sliders[n+1].style.opacity = 1;
    //     childNodes[n+1].classList.add('active');
    //     n++;
    //   } else {
    //     n = 0;
    //     sliders[n].style.opacity = 1;
    //     childNodes[n].classList.add('active');
    //     sliders[sliders.length-1].style.opacity = 0;
    //     childNodes[childNodes.length-1].classList.remove('active');
    //   }
    //
    //   setTimeout(arguments.callee, 5000);
    // },5000);

    var indicatSlide = function(e) {
      var that = this;
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i] !== that) {
          childNodes[i].classList.remove('active');
          sliders[i].style.opacity = 0;

        } else {
          this.className = 'active';
          sliders[i].style.opacity = 1;
        }
      }
    };
    for (var i = 0; i < childNodes.length; i++) {
      childNodes[i].addEventListener('click', indicatSlide);
    }
  },
};
