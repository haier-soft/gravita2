function fixedCollTitle() {
    $(window).on("scroll", function () {
      if (window.innerWidth <= 991) {
        let offsetTop = $(window).scrollTop();
        collections.each(function () {
          let item = $(this);
          let itemOffsetTop = item.offset().top;
          let itemOffsetBottom = item.offset().top + item.height() - 40;
          let itemTitleHeight = item.find(".colls-item__title").height();

          if (offsetTop > itemOffsetTop && offsetTop < itemOffsetBottom) {
            item
              .find(".colls-item__title")
              .removeClass("absolute")
              .addClass("fixed")
              .css("width", $(this).width() - 20 + "px");
            item.css("padding-top", itemTitleHeight + "px");
          } else if (offsetTop < itemOffsetTop) {
            item.find(".colls-item__title").removeClass("fixed");
            item.css("padding-top", "0px");
          } else if (offsetTop > itemOffsetBottom) {
            item
              .find(".colls-item__title")
              .removeClass("fixed")
              .addClass("absolute");
          }
        });
      } else {
        collections.each(function () {
          $(this).find(".colls-item__title").removeClass("absolute").removeClass("fixed");
        })
      }
    });
  }
  fixedCollTitle()
  $(window).on("resize", () => fixedCollTitle())