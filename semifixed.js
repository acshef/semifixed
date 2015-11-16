// 1.1.0
(function($) {
  $.fn.semifixed = function() {
    var elem = $(this).first().css("position","fixed");
    var visible = true;
    var delta = 0;
    var offset = document.documentElement.scrollTop;
    var height = elem.height()+2; // Re-initialize to recalculate the height
    $(window).off("scroll.fix").on("scroll.semifixed",function(e){ // Can be re-initialized because namespaced event(s) are removed
      delta = (window.scrollY||document.documentElement.scrollTop) - offset;
      offset = window.scrollY||document.documentElement.scrollTop;
      if (delta>0 && visible) {
        $('.dropdown.open .dropdown-toggle',elem).dropdown("toggle"); // Hide any open dropdowns
        elem.find(document.activeElement).blur(); // Blur an element (in the navbar) if it has focus
        elem.stop(true).animate({top:-height},"fast"); // Move the navbar off-screen
        visible=false;
      } else if (delta<0 && !visible){
        elem.stop(true).animate({top:0},"fast"); // Put navbar back on-screen
        visible=true;
      }
    });
    return elem; // Return jQuery object (single element)
  };
  $(".navbar-fixed-top").semifixed(); // It's self-aware!
}(jQuery));
