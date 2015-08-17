// 1.0.0
(function($) {
  $.fn.semifixed = function() {
    var elem = $(this)[0];
        elem.style.position = "fixed";
    var delta = 0;
    var offset = document.documentElement.scrollTop;
    $(window).on("scroll",function(){
      delta = (window.scrollY||document.documentElement.scrollTop) - offset;
      offset = window.scrollY||document.documentElement.scrollTop;
      var top = elem.offsetTop;
      if (delta > 0) { // Scrolling DOWNWARD
        if (top > -(elem.offsetHeight+1)) {
          elem.style.top = Math.max(top-delta,-(elem.offsetHeight+1))+"px";
        }
      } else if (top <= 0) { // SCROLLING UPWARD
        elem.style.top = Math.min(top-delta,0)+"px";
      } // ELSE there's a scroll event, but no change in document position
    });
    return $(elem);
  };
  $(".navbar-fixed-top").semifixed(); // It's self-aware!
}(jQuery));
