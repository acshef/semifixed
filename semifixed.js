// 1.2.0
(function($) {
  $.fn.semifixed = function(nohandle) {
    var elem = $(this).first().css("position","fixed");
    var visible = true;
    var delta = 0;
    var offset = document.documentElement.scrollTop;
    var height = elem.height()+2; // Re-initialize to recalculate the height
    (elem.data("semifixed-handle")||$()).remove();
    if (!nohandle) {
      var handle = $("<div class=semifixed-handle>")
      .css({cursor:"pointer",position:"fixed",top:0,left:-15,borderStyle:"solid",borderWidth:"15px 15px 0 0",borderColor:"transparent"})
      .css("border-top-color",elem.css("background-color"))
      .appendTo("body");
    } else {
      var handle = $();
    }
    function hide() {
      $('.dropdown.open .dropdown-toggle',elem).dropdown("toggle"); // Hide any open dropdowns
      elem.find(document.activeElement).blur(); // Blur an element (in the navbar) if it has focus
      elem.stop(true).animate({top:-height},"fast",function(){ // Move the navbar off-screen
        handle.stop(true).animate({left:0},"fast");
      });
      visible=false;
    }
    function show() {
      elem.stop(true).animate({top:0},"fast",function(){ // Put navbar back on-screen
        handle.css("left",-height/5);
      });
      visible=true;
    }
    $(window).off("scroll.semifixed").on("scroll.semifixed",function(e){ // Can be re-initialized because namespaced event(s) are removed
      delta = (window.scrollY||document.documentElement.scrollTop) - offset;
      offset = window.scrollY||document.documentElement.scrollTop;
      if (delta>0 && visible) { hide(); }
      else if (delta<0 && !visible){ show(); }
    });
    if (!nohandle) {
      $(handle).on("click",show);
      elem.data("semifixed-handle",handle);
    } else {
      elem.removeData("semifixed-handle");
    }
    return elem; // Return jQuery object (single element)
  };
  $(".navbar-fixed-top").semifixed(); // It's self-aware!
}(jQuery));
