function setVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setVh()
  window.addEventListener('resize', function () {
    setVh();
  });
  window.addEventListener('orientationchange', function () {
    setVh();
  });
  
  function resetBtnVisible() {
    const resetBtn = document.querySelector(".f-search__reset")
    resetBtn.style.visibility = "visible"
    resetBtn.style.pointerEvents = "auto"
  }
  function resetBtnHidden() {
    const resetBtn = document.querySelector(".f-search__reset")
    resetBtn.style.visibility = "hidden"
    resetBtn.style.pointerEvents = "none"
  }
  let gutterMasonry = 0;
  let gutterMasonryColl = 0;
  let carditemGutter = 0
  let colMasonryWidth = 0;
  
  
  $(function () {
  
  
    var screenWidth = screen.width;
    var windowWidth = window.innerWidth
  
  
    // -------------------------------------------
  
    /*
     *  Header
     */
  
    let lastScroll = 0;
    const defaultOffset = 200;
    const header = $(".header");
    const scrollPosition = () =>
        window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => header.hasClass("hide");
  
    $(window).on("scroll", function () {
      if (
          scrollPosition() > lastScroll &&
          !containHide() &&
          scrollPosition() > defaultOffset
      ) {
        header.addClass("hide");
      } else if (scrollPosition() < lastScroll && containHide()) {
        header.removeClass("hide");
      }
  
      lastScroll = scrollPosition();
    });
  
    /*
     *  Location
     */
  
    if (screenWidth > 991) {
      $(".location__link").on("click", function (e) {
        e.preventDefault();
        $(".location__dropdown").slideToggle();
      });
  
      $(".location__confirm").on("click", function (e) {
        e.preventDefault();
        $(".location__dropdown").slideUp();
      });
    } else {
      $(".location__link").on("click", function (e) {
        e.preventDefault();
        let location = $(this).parents(".location");
        location.find(".location__dropdown").fadeIn();
        $("body").addClass("noscroll");
        if (location.find(".overlay").length <= 0) {
          console.log("no");
          location.append('<div class="overlay"></div>');
        }
      });
  
      $(".location__confirm").on("click", function (e) {
        e.preventDefault();
        let location = $(this).parents(".location");
        location.find(".location__dropdown").fadeOut();
        $("body").removeClass("noscroll");
        location.find(".overlay").remove();
      });
  
      $(".location").on("click", ".overlay", function () {
        $(this).siblings(".location__dropdown").fadeOut();
        $("body").removeClass("noscroll");
        $(this).remove();
      });
    }
  
    $(".location__btn").on("click", function () {
      $(this).parents(".location__dropdown").slideUp();
      $(this).parents(".location").find(".overlay").remove();
    });
  
    /*
     *  Dropdown
     */
  
    $(".menu-toggle").on("click", function () {
      $(".search").slideUp();
      $(this).toggleClass("open");
      $(".dropdown").slideToggle();
      $("body").toggleClass("noscroll");
      let location = $(".location");
      location.find(".location__dropdown").fadeOut();
      location.find(".overlay").remove();
    });
  
    /*
     *  Video
     */
  
    const players = Plyr.setup(".js-player");
  
    /*
     *  Plus - minus
     */
  
    $(".js-minus").on("click", function () {
      let $input = $(this).parent().find("input");
      let count = parseInt($input.val()) - 1;
      count = count < 1 ? 1 : count;
      $input.val(count);
      $input.change();
      return false;
    });
  
    $(".js-plus").on("click", function () {
      let $input = $(this).parent().find("input");
      $input.val(parseInt($input.val()) + 1);
      $input.change();
      return false;
    });
  
    /*
     *  Search
     */
  
    if (windowWidth > 767) {
      $(".search-btn").on("click", function () {
        $(".dropdown").slideUp();
        $(".menu-toggle").hide().removeClass("open");
        $(".search-close").show();
        $(".search").slideDown().find("input").focus();
        $(".search").append('<div class="search__overlay"></div>');
        $("body").addClass("noscroll");
        $(".search-close").addClass("open");
      });
    } else {
      $(".search-btn").on("click", function () {
        $(".menu-toggle").hide();
        $(".search-close").show();
        $(".search").slideDown().find("input").focus();
        $("body").addClass("noscroll");
        $(".search-close").addClass("open");
      });
    }
  
    $(".search-close").on("click", function () {
      const btn = $(this);
      btn.removeClass("open");
      $(".search").slideUp();
      $("body").removeClass("noscroll");
  
      setTimeout(function () {
        btn.hide();
        $(".menu-toggle").show();
      }, 400);
    });
  
    $(".search").on("click", ".search__overlay", function () {
      $(".search-close").removeClass("open");
      $(".search").slideUp();
      $("body").removeClass("noscroll");
  
      setTimeout(function () {
        $(".search-close").hide();
        $(".menu-toggle").show();
        $(".search__overlay").remove();
      }, 400);
    });
  
    /*
  
     *  Modal
     */
  
    $(".js-modal-show").on("click", function () {
      var currentModal = $(this).attr("href");
      $(currentModal).fadeIn(500);
      $("body").addClass("noscroll");
    });
  
    $(".js-modal-close").on("click", function (e) {
      e.preventDefault();
      $(".js-modal").fadeOut(100);
      $("body").removeClass("noscroll");
    });
  
    $("body").on("click", ".js-modal", function (e) {
      if (e.target.classList.contains("js-modal")) {
        $(".js-modal").fadeOut(100);
        $("body").removeClass("noscroll");
      }
      e.stopPropagation();
    });
  
    /*
     *   Callback
     */
  
    $(".callback-btn").on("click", function () {
      $(this).parents(".dropdown").slideUp();
      $(".menu-toggle").removeClass("open");
    });
  
    /*
     *   Маска телефона
     */
  
    $(".phone").mask("+7 (999) 999-99-99", { completed: function () { $(this).addClass("completed") } });
  
    /*
     *  Tabs
     */
  
    // $(".js-tab-link").on("click", function (e) {
    //   e.preventDefault();
    //   let link = $(this).attr("href");
  
    //   $(this).addClass("active").siblings(".js-tab-link").removeClass("active");
    //   $(link)
    //     .addClass("active")
    //     .fadeIn()
    //     .siblings(".js-tab")
    //     .hide()
    //     .removeClass("active");
    // });
  
    /*
     *   Accordion
     */
  
    $(".accordion__header").on("click", function () {
      $(this)
          .toggleClass("open")
          .siblings(".accordion__content")
          .slideToggle()
          .parents(".accordion__item")
          .siblings(".accordion__item")
          .find(".accordion__header")
          .removeClass("open")
          .siblings(".accordion__content")
          .slideUp();
    });
  
    /*
     * Back to Top
     */
  
    // $(window).scroll(function () {
    //   if ($(this).scrollTop() > 100) {
    //     $(".scrollup").fadeIn();
    //   } else {
    //     $(".scrollup").fadeOut();
    //   }
    // });
  
    $(".scrollup").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
      return false;
    });
  
    /*
     * Tooltip
     */
  
    $(".tooltip__icon").on("click", function (e) {
      $(this).siblings(".tooltip__popup").fadeToggle();
      if (
          windowWidth - $(this).siblings(".tooltip__popup").offset().left - 260 <
          150
      ) {
        $(this).siblings(".tooltip__popup").css({ left: "auto", right: 0 });
      }
      e.stopPropagation();
    });
  
    $("body").on("click", () => {
      $(".tooltip__popup").fadeOut();
    });
  
  
    /*
     * Catalog search
     */
  
    $(".f-search__show").on("click", function (e) {
      e.preventDefault();
      $(".f-search__form").fadeIn().find("input").focus();
    });
  
    /*
     * Sort
     */
  
    $(".sort__toggle").on("click", function () {
      $(this).toggleClass("open").siblings(".sort__dropdown").slideToggle();
    });
  
    $(".sort__link").on("click", function (e) {
      e.preventDefault();
      let textSort = $(this).text();
      $(this)
          .parents(".sort__dropdown")
          .slideUp()
          .siblings(".sort__toggle")
          .removeClass("open")
          .find(".sort__selected")
          .text(textSort);
    });
  
    /*
     * Filter
     */
  
    $(".f-select__header").on("click", function () {
      $(this)
          .parents(".f-select")
          .siblings(".f-select")
          .find(".f-select__header")
          .removeClass("open")
          .siblings(".f-select__list")
          .slideUp();
      $(this).toggleClass("open").siblings(".f-select__list").slideToggle();
    });
  
    $(".f-select__toggle").on("click", function () {
      if ($(this).hasClass("open")) {
        $(this).removeClass("open").find("span").text("Показать все");
        $(this)
            .siblings(".f-select__wrap")
            .find(".f-select__checkbox:not(.hit)")
            .hide();
        $(this).siblings(".f-select__title").text("Популярные:");
      } else {
        $(this).addClass("open").find("span").text("Скрыть все");
        $(this).siblings(".f-select__wrap").find(".f-select__checkbox").show();
        $(this).siblings(".f-select__title").text("Все коллекции:");
      }
    });
  
    $("body").on("mousedown", function (e) {
      if (
          !e.target.classList.contains("f-select") &&
          !e.target.closest(".f-select")
      ) {
        $(".f-select__list").slideUp();
      }
      e.stopPropagation();
    });
  
    $(".filter__toggle").on("click", function () {
      if (window.innerWidth > 767) {
        if ($(this).hasClass("open")) {
          $(this).removeClass("open").find("span").text("Показать все фильтры");
          $(".f-select:nth-child(n + 5)").slideUp();
          $(".f-select__header")
            .removeClass("open")
            .siblings(".f-select__list")
            .slideUp();
        } else {
          $(this).addClass("open").find("span").text("Скрыть все фильтры");
          $(".f-select:nth-child(n + 5)").slideDown();
        }
      } else {
        if ($(this).hasClass("open")) {
          $(this).removeClass("open").find("span").text("Показать все фильтры");
          $(".filter__selects").slideUp();
          $(".f-select__header")
            .removeClass("open")
            .siblings(".f-select__list")
            .slideUp();
        } else {
          $(this).addClass("open").find("span").text("Скрыть все фильтры");
          $(".filter__selects").slideDown();
        }
      }
  
    });
  
    /*
     * Catalog collections
     */
  
    const collections = $(".collections");
    function fixedCollTitle() {
      $(window).on("scroll", function () {
        const collItem = collections.find(".colls-item");
        if (window.innerWidth <= 991) {
          let offsetTop = $(window).scrollTop();
          collItem.each(function () {
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
          collItem.each(function () {
            $(this).find(".colls-item__title").removeClass("absolute").removeClass("fixed");
          })
        }
      });
    }
    fixedCollTitle()
    $(window).on("resize", () => fixedCollTitle())
    /*
     * Product
     */
  
    let product = $(".product");
    if (product.length > 0) {
      $(window).on("scroll", function () {
        let offsetTop = $(window).scrollTop();
        if (window.innerWidth > 991) {
          let productOffsetTop = product.offset().top;
          let productOffsetBottom =
              productOffsetTop +
              product.find(".product__row").height() -
              product.find(".product__wrap").height();
  
          if (
              offsetTop > productOffsetTop &&
              offsetTop < productOffsetBottom &&
              !product.hasClass("fixed")
          ) {
            product.addClass("fixed").removeClass("absolute");
          } else if (offsetTop < productOffsetTop) {
            product.removeClass("fixed");
          } else if (
              offsetTop > productOffsetBottom &&
              !product.hasClass("absolute")
          ) {
            product.removeClass("fixed").addClass("absolute");
          }
        } else {
          let delta = 230;
          if (window.innerWidth < 576) {
            delta = 180;
          }
          let productOffsetBottom =
              product.offset().top +
              product.find(".product__left").height() -
              $(window).height()  +
              delta
          if (offsetTop > productOffsetBottom) {
            $(".product__right").addClass("static");
          } else {
            $(".product__right").removeClass("static");
          }
        }
      });
    }
  
  
    $(".js-product-anchor").on("click", function (e) {
      e.preventDefault();
      let target = $(this).attr("href");
      let targetOffsetTop = $(target).position().top;
      let productOffsetBottom =
          product.offset().top + product.find(".product__left").height();
      let destination = productOffsetBottom + targetOffsetTop + 40;
      $("html,body").animate({ scrollTop: destination }, 600);
      return false;
    });
  
    $(".product-info__more").on("click", function (e) {
      e.preventDefault();
      let list = $(this).siblings(".product-info__list");
      list.toggleClass("open");
      if ($(this).hasClass("open")) {
        $(this).removeClass("open").find("span").text("Развернуть");
      } else {
        $(this).addClass("open").find("span").text("Свернуть");
      }
    });
  
    $(".js-copy-product-code").on("click", function (e) {
      e.preventDefault();
      let $tmp = $("<input>");
      $("body").append($tmp);
      $tmp.val($(".product__code span").text()).select();
      document.execCommand("copy");
      $tmp.remove();
      $(".js-copy-label").addClass("open");
  
      setTimeout(function () {
        $(".js-copy-label").removeClass("open");
      }, 3500);
    });
  
    $(".js-copy-product-link").on("click", function (e) {
      e.preventDefault();
      let $tmp = $("<input>");
      $("body").append($tmp);
      $tmp.val(window.location.href).select();
      document.execCommand("copy");
      $tmp.remove();
      $(".js-copy-label-light").addClass("open");
  
      setTimeout(function () {
        $(".js-copy-label-light").removeClass("open");
      }, 3500);
    });
  
    /*
     * Collection
     */
  
    let goods = $(".goods");
  
    if (goods.length > 0) {
      let goodsNav = $(".goods-nav");
      if (screenWidth > 767) {
        $(window).on("scroll", function () {
          let offsetTop = $(window).scrollTop();
          let goodsOffsetTop = goods.offset().top - 84;
          let goodsOffsetBottom =
              goods.offset().top + goods.height() - goodsNav.height() - 84;
  
          if (offsetTop > goodsOffsetTop && offsetTop < goodsOffsetBottom) {
            goodsNav.addClass("fixed");
          } else {
            goodsNav.removeClass("fixed");
          }
  
          $(".goods-nav__link").each(function () {
            let sectionOffset = $(this.hash).offset().top - 94;
            if (
                sectionOffset <= offsetTop &&
                offsetTop < sectionOffset + $(this.hash).height()
            ) {
              $(this).addClass("active");
            } else {
              $(this).removeClass("active");
            }
          });
        });
      } else {
        $(".goods-nav__link").removeClass("js-anchor");
        $(".goods-nav__link").on("click", function (e) {
          e.preventDefault();
          $(this)
              .addClass("active")
              .siblings(".goods-nav__link")
              .removeClass("active");
          $(this.hash)
              .fadeIn()
              .addClass("active")
              .siblings(".coll-goods")
              .hide()
              .removeClass("active");
  
          $(".coll-goods").masonry({
            gutter: gutterMasonryColl,
            //columnWidth: colMasonryWidth,
            itemSelector: ".coll-goods__item",
            lazyLoad: true,
          });
        });
      }
    }
  
    /*
     * Masonry
     */
    if (windowWidth > 1859) {
      gutterMasonry = 144;
      gutterMasonryColl = 144;
      colMasonryWidth = 352;
      carditemGutter = 392
    } else if (windowWidth < 1860 && windowWidth > 1599) {
      gutterMasonry = 122;
      gutterMasonryColl = 122;
      colMasonryWidth = 288;
      carditemGutter = 328
    } else if (windowWidth < 1600 && windowWidth > 1279) {
      gutterMasonry = 101;
      gutterMasonryColl = 101;
      colMasonryWidth = 224;
      carditemGutter = 264
    } else if (windowWidth < 1280 && windowWidth > 991) {
      gutterMasonry = 133;
      gutterMasonryColl = 60;
      colMasonryWidth = 224;
      carditemGutter = 133
    } else if (windowWidth < 992 && windowWidth > 767) {
      gutterMasonry = 20;
      gutterMasonryColl = 20;
      colMasonryWidth = 216;
    } else if (windowWidth < 768 && windowWidth > 575) {
      gutterMasonry = 86;
      gutterMasonryColl = 86;
    } else if (windowWidth < 576) {
      gutterMasonry = 10;
      gutterMasonryColl = 10;
      colMasonryWidth = ".catalog-grid__item";
    }
  
  
    $(window).on("resize", function () {
      windowWidth = $(window).width();
      if (windowWidth > 1859) {
        gutterMasonry = 144;
        gutterMasonryColl = 144;
        colMasonryWidth = 352;
        carditemGutter = 392
      } else if (windowWidth < 1860 && windowWidth > 1599) {
        gutterMasonry = 122;
        gutterMasonryColl = 122;
        colMasonryWidth = 288;
        carditemGutter = 328
      } else if (windowWidth < 1600 && windowWidth > 1279) {
        gutterMasonry = 101;
        gutterMasonryColl = 101;
        colMasonryWidth = 224;
        carditemGutter = 264
      } else if (windowWidth < 1280 && windowWidth > 991) {
        gutterMasonry = 133;
        gutterMasonryColl = 60;
        colMasonryWidth = 224;
        carditemGutter = 133
      } else if (windowWidth < 992 && windowWidth > 767) {
        gutterMasonry = 20;
        gutterMasonryColl = 20;
        colMasonryWidth = 216;
      } else if (windowWidth < 768 && windowWidth > 575) {
        gutterMasonry = 86;
        gutterMasonryColl = 86;
      } else if (windowWidth < 576) {
        gutterMasonry = 10;
        gutterMasonryColl = 10;
        colMasonryWidth = ".catalog-grid__item";
      }
  
      $cataloGrid = $(".catalog-grid")
      $cataloGrid.imagesLoaded(function () {
        $cataloGrid.masonry({
          horizontalOrder: true,
          gutter: gutterMasonry,
          itemSelector: ".catalog-grid__item",
          columnWidth: '.catalog-grid__item',
          lazyLoad: true,
        });
      })
      $coolGoods = $(".coll-goods")
      $coolGoods.imagesLoaded(function () {
        $coolGoods.masonry({
          horizontalOrder: true,
          gutter: gutterMasonryColl,
          itemSelector: ".coll-goods__item",
          columnWidth: '.coll-goods__item',
          lazyLoad: true,
        });
      })
      $cardItems = $(".card-items")
      $cardItems.imagesLoaded(function () {
        $cardItems.masonry({
          horizontalOrder: true,
          gutter: carditemGutter,
          itemSelector: ".card-item",
          columnWidth: '.card-item',
          lazyLoad: true,
        });
      })
    });
  
    $cataloGrid = $(".catalog-grid")
  $cataloGrid.imagesLoaded(function () {
    $cataloGrid.masonry({
      horizontalOrder: true,
      gutter: gutterMasonry,
      itemSelector: ".catalog-grid__item",
      columnWidth: '.catalog-grid__item',
      lazyLoad: true,
    });
  })
  $coolGoods = $(".coll-goods")
  $coolGoods.imagesLoaded(function () {
    $coolGoods.masonry({
      horizontalOrder: true,
      gutter: gutterMasonryColl,
      itemSelector: ".coll-goods__item",
      columnWidth: '.coll-goods__item',
      lazyLoad: true,
    });
  })
  $cardItems = $(".card-items")
  $cardItems.imagesLoaded(function () {
    $cardItems.masonry({
      horizontalOrder: true,
      gutter: carditemGutter,
      itemSelector: ".card-item",
      columnWidth: '.card-item',
      lazyLoad: true,
    });
  })
  
    /*
     * Range slider price
     */
  
    const $range = $(".js-range-price");
    const $inputFrom = $(".js-input-from");
    const $inputTo = $(".js-input-to");
    if($inputTo.val()>0){
      var rangeMax = $inputTo.val();
    }else{
      var rangeMax = $inputTo.attr('max');
    }
    if($inputFrom.val()>0){
      var rangeMin = $inputFrom.val();
    }else{
      var rangeMin = $inputFrom.attr('min');
    }
    var minInput = $inputFrom.attr('id');
    var maxInput = $inputTo.attr('id');
    let instance,
        min = Number($inputFrom.attr('min')),
        max = Number($inputTo.attr('max')),
        from = 0,
        to = 0;
  
    $range.ionRangeSlider({
      grid: false,
      type: "double",
      min: min,
      max: max,
      from: rangeMin,
      to: rangeMax,
      prettify_enabled: true,
      onStart: updateInputs,
      onChange: updateInputs,
      onFinish: sendForm,
    });
  
    instance = $range.data("ionRangeSlider");
  
    function sendForm(data){
      smartFilter.keyup(BX(minInput));
      smartFilter.keyup(BX(maxInput));
    }
  
    function updateInputs(data) {
      from = Number(data.from);
      to = Number(data.to);
  
      $inputFrom.prop("value", from);
      $inputTo.prop("value", to);
      //$(".js-input-to").val(to);
  
    }
  
    $inputFrom.on("input", function () {
      var val = Number($(this).prop("value"));
  
      if (val < min) {
        val = min;
      } else if (val > to) {
        val = to;
      }
      //$inputFrom.prop("value", val);
      instance.update({
        from: val,
      });
    });
  
    $inputTo.on("input", function () {
      var val = Number($(this).prop("value"));
      if (val < from) {
        val = from;
      } else if (val > max) {
        val = max;
  
      }
  
      instance.update({
        to: val,
      });
    });
  
  });
  function formOnSuccess(form) {
    let thisForm = $(form);
    thisForm.find("input[type='text'],input[type='tel'],input[type='email']").each(function() {
        $(this).val("").siblings(".form-group__placeholder").css("display", "flex")
    });
    thisForm.find("textarea").val("");
    thisForm.find("input[type='file']").val("");
    thisForm.find(".form-group").each(function() {
        $(this).removeClass("error")
    });
    thisForm.find(".file-form").removeClass("error");
    thisForm.find(".file-form__item").each(function() {
        $(this).remove()
    });
    $("#js-modal-thanks").fadeIn(500);
    $("body").addClass("noscroll")
}
function formReviewSuccess(form) {
    let thisForm = $(form);
    thisForm.find("input[type='text'],input[type='tel']").each(function() {
        $(this).val("").siblings(".form-group__placeholder").css("display", "flex")
    });
    thisForm.find("textarea").val("");
    thisForm.find("input[type='file']").val("");
    thisForm.find(".form-group").each(function() {
        $(this).removeClass("error")
    });
    thisForm.find(".file-form").removeClass("error");
    thisForm.find(".file-form__item").each(function() {
        $(this).remove()
    });
    thisForm.find("input[type='radio']:checked").prop("checked", false);
    $("#js-modal-review").fadeIn(500);
    $("body").addClass("noscroll")
}
$(function() {
    if (document.querySelector(".stock-form")) {
        const inp = document.querySelector(".stock-form input");
        inp.addEventListener("input", ()=>{
            if (inp.value.length > 0) {
                document.querySelector(".stock-suggest").classList.add("open")
            } else {
                document.querySelector(".stock-suggest").classList.remove("open")
            }
        }
        )
    }
    if ($(".js-projects").length > 0) {
        const slickProjects = $(".js-projects .carousel-projects").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true,
            infinite: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5e3,
            speed: 800,
            prevArrow: '<button class="prev" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow: '<button class="next" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-right"></svg></button>',
            responsive: [{
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
        let currentSlideProjects = slickProjects.slick("slickCurrentSlide") + 1;
        let totalSlidesProjects = slickProjects.slick("getSlick").slideCount;
        $(".js-projects .counter__current").text(currentSlideProjects);
        $(".js-projects .counter__total").text(totalSlidesProjects);
        slickProjects.on("afterChange", function(event, slick, currentSlide, nextSlide) {
            $(".js-projects .counter__current").text(currentSlide + 1)
        })
    }
    document.querySelectorAll(".file-form").forEach(item=>{
        item.querySelector("input").addEventListener("change", e=>{
            item.querySelectorAll('.file-form__item').forEach(el=>el.remove());
            let files = e.target.files;
            for (let i = 0; i < files.length; i++) {
                let f = files[i];
                item.querySelector(".file-form__items").innerHTML += `
      <div class="file-form__item">
          <span class="file-form__name">${f.name}</span>
          <span class="file-form__del"><svg><use href="/local/access/img/icons/sprite.svg#del-item"></use></svg></span>
      </div>`
            }
        }
        );
        item.addEventListener("click", e=>{
            item.querySelectorAll(".file-form__del").forEach((del,idx)=>{
                if (del.contains(e.target)) {
                    const dt = new DataTransfer();
                    const input = item.querySelector("input");
                    const {files} = input;
                    for (let i = 0; i < files.length; i++) {
                        let file = files[i];
                        if (i !== idx)
                            dt.items.add(file)
                    }
                    input.files = dt.files;
                    del.parentNode.remove()
                }
            }
            )
        }
        )
    }
    );
    if (document.querySelector(".form-group")) {
        document.querySelectorAll(".form-group").forEach(item=>{
            let inp = item.querySelector("input");
            if (inp && item.querySelector(".form-group__placeholder")) {
                if (!inp.classList.contains("phone")) {
                    inp.addEventListener("input", ()=>{
                        if (inp.value.length === 0) {
                            item.querySelector(".form-group__placeholder").style.display = "flex"
                        } else {
                            item.querySelector(".form-group__placeholder").style.display = "none"
                        }
                    }
                    )
                } else {
                    inp.addEventListener("focus", ()=>{
                        item.querySelector(".form-group__placeholder").style.display = "none"
                    }
                    );
                    inp.addEventListener("blur", ()=>{
                        if (!inp.classList.contains("completed")) {
                            item.querySelector(".form-group__placeholder").style.display = "flex"
                        }
                    }
                    )
                }
            }
        }
        )
    }
    const tabs = document.querySelectorAll(".tabs-scroll");
    tabs.forEach(item=>{
        let tabsPos = item.querySelector(".tabs__item.active").getBoundingClientRect().left - item.getBoundingClientRect().left - 10;
        item.scrollLeft = tabsPos
    }
    );
    if (document.querySelectorAll(".item-review")) {
        const itemReview = document.querySelectorAll(".item-review");
        itemReview.forEach(item=>{
            const images = item.querySelectorAll(".item-review__img");
            if (item && images.length > 2) {
                item.querySelector(".item-review__img:nth-child(3)").innerHTML += `<div class="h5">
            +${images.length - 2}
          </div>`
            }
        }
        )
    }
    if ($(".js-promo").length > 0) {
        const slickPromo = $(".js-promo .carousel").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true,
            infinite: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5e3,
            speed: 800,
            prevArrow: '<button class="prev" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow: '<button class="next" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-right"></svg></button>',
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
        let currentSlidePromo = slickPromo.slick("slickCurrentSlide") + 1;
        let totalSlidesPromo = slickPromo.slick("getSlick").slideCount;
        $(".js-promo .counter__current").text(currentSlidePromo);
        $(".js-promo .counter__total").text(totalSlidesPromo);
        slickPromo.on("afterChange", function(event, slick, currentSlide, nextSlide) {
            $(".js-promo .counter__current").text(currentSlide + 1)
        })
    }
    if ($(".js-project").length > 0) {
        let init = false;
        function slickProjectInit() {
            if (window.innerWidth > 480) {
                if (!init) {
                    init = true;
                    const slickProject = $(".js-project .carousel").slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        swipeToSlide: true,
                        centerMode: true,
                        centerPadding: "20px",
                        infinite: true,
                        dots: false,
                        autoplay: true,
                        autoplaySpeed: 5e3,
                        speed: 800,
                        prevArrow: ".js-project__prev",
                        nextArrow: ".js-project__next"
                    });
                    $(".js-project .counter").css("display", "flex");
                    let currentSlideProject = slickProject.slick("slickCurrentSlide") + 1;
                    let totalSlidesProject = slickProject.slick("getSlick").slideCount;
                    $(".js-project .counter__current").text(currentSlideProject);
                    $(".js-project .counter__total").text(totalSlidesProject);
                    slickProject.on("afterChange", function(event, slick, currentSlide, nextSlide) {
                        $(".js-project .counter__current").text(currentSlide + 1)
                    })
                }
            } else if (window.innerWidth <= 480 && init) {
                $(".js-project .carousel").slick("unslick");
                init = false;
                $(".js-project .counter").css("display", "none")
            }
        }
        slickProjectInit();
        $(window).on("resize", ()=>slickProjectInit())
    }
    if ($(".js-project-products").length > 0) {
        const slickProjectProducts = $(".js-project-products .carousel").slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 5e3,
            infinite: true,
            dots: false,
            speed: 800,
            responsive: [{
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            }],
            prevArrow: '<button class="prev" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow: '<button class="next" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-right"></svg></button>'
        });
        let currSlidePrProducts = slickProjectProducts.slick("slickCurrentSlide") + 1;
        let totalSlidesPrProducts = slickProjectProducts.slick("getSlick").slideCount;
        $(".js-project-products .counter__current").text(currSlidePrProducts);
        $(".js-project-products .counter__total").text(totalSlidesPrProducts);
        slickProjectProducts.on("afterChange", function(event, slick, currentSlide, nextSlide) {
            $(".js-project-products .counter__current").text(currentSlide + 1)
        });
        if (slickProjectProducts.slick("getSlick").options.slidesToShow >= totalSlidesPrProducts) {
            $(".js-project-products .counter").css("display", "none")
        } else {
            $(".js-project-products .counter").css("display", "flex")
        }
        $(window).on("resize", function() {
            let slidesToShow;
            if (window.innerWidth >= 1280) {
                slidesToShow = 5
            } else if (window.innerWidth >= 992 && window.innerWidth < 1280) {
                slidesToShow = 4
            } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
                slidesToShow = 3
            } else {
                slidesToShow = 2
            }
            if (slidesToShow >= totalSlidesPrProducts) {
                $(".js-project-products .counter").css("display", "none")
            } else {
                $(".js-project-products .counter").css("display", "flex")
            }
        })
    }
    if ($(".js-certificates").length > 0) {
        let init = false;
        function slickCertInit() {
            if (window.innerWidth <= 576) {
                if (!init) {
                    init = true;
                    const slickCert = $(".js-certificates .carousel").slick({
                        slidesToShow: 1,
                        swipeToSlide: true,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 5e3,
                        speed: 800,
                        infinite: true,
                        dots: false,
                        prevArrow: '<button class="prev" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-left"></svg></button>',
                        nextArrow: '<button class="next" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-right"></svg></button>'
                    });
                    $(".js-certificates .counter").css("display", "flex");
                    let currentSlideCert = slickCert.slick("slickCurrentSlide") + 1;
                    let totalSlidesCert = slickCert.slick("getSlick").slideCount;
                    $(".js-certificates .counter__current").text(currentSlideCert);
                    $(".js-certificates .counter__total").text(totalSlidesCert);
                    slickCert.on("afterChange", function(event, slick, currentSlide, nextSlide) {
                        $(".js-certificates .counter__current").text(currentSlide + 1)
                    })
                }
            } else if (window.innerWidth > 576 && init) {
                $(".js-certificates .carousel").slick("unslick");
                init = false;
                $(".js-certificates .counter").css("display", "none")
            }
        }
        slickCertInit();
        $(window).on("resize", ()=>slickCertInit())
    }
    if ($(".js-team").length > 0) {
        $(".js-team").each(function() {
            let init = false;
            let slickTeam;
            function slickTeamInit(team) {
                if (window.innerWidth <= 991) {
                    if (!init) {
                        init = true;
                        slickTeam = $(team).find(".carousel").slick({
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            swipeToSlide: true,
                            autoplay: true,
                            autoplaySpeed: 5e3,
                            speed: 800,
                            infinite: true,
                            dots: false,
                            prevArrow: '<button class="prev" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-left"></svg></button>',
                            nextArrow: '<button class="next" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-right"></svg></button>'
                        });
                        $(team).find(".counter").css("display", "flex");
                        let currentSlideTeam = slickTeam.slick("slickCurrentSlide") + 1;
                        let totalSlidesTeam = slickTeam.slick("getSlick").slideCount;
                        $(team).find(".counter__current").text(currentSlideTeam);
                        $(team).find(".counter__total").text(totalSlidesTeam);
                        if (!team.classList.contains("active")) {
                            slickTeam.slick("slickPause")
                        }
                        slickTeam.on("afterChange", function(event, slick, currentSlide, nextSlide) {
                            $(team).find(".counter__current").text(currentSlide + 1)
                        })
                    }
                } else if (window.innerWidth > 991 && init) {
                    slickTeam.slick("unslick");
                    init = false;
                    $(team).find(".counter").css("display", "none")
                }
            }
            slickTeamInit(this);
            $(window).on("resize", ()=>slickTeamInit(this))
        })
    }
    $(".our-team .tabs__item").on("click", function() {
        let activeNav = $(this).attr("data-nav");
        if (window.innerWidth <= 991) {
            $(".our-team .js-team").each(function() {
                $(this).find(".carousel").slick("slickPause")
            })
        }
        $(this).addClass("active").siblings(".tabs__item").removeClass("active");
        $(`[data-block=${activeNav}]`).addClass("active").siblings("[data-block]").removeClass("active");
        if (window.innerWidth <= 991) {
            $(".our-team .js-team.active .carousel").slick("setPosition");
            $(".our-team .js-team.active .carousel").slick("slickPlay")
        }
    });
    if ($(".store-gallery").length > 0) {
        let slickStoreGallery = $(".store-gallery__carousel").slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay: false,
            autoplaySpeed: 4e3,
            fade: false,
            asNavFor: ".store-gallery__thumbs",
            prevArrow: '<button class="prev slick-arrow" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow: '<button class="next slick-arrow" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-right"></svg></button>'
        });
        $(".store-gallery__thumbs").slick({
            infinite: false,
            slidesToShow: 7,
            slidesToScroll: 1,
            swipeToSlide: true,
            asNavFor: ".store-gallery__carousel",
            dots: false,
            focusOnSelect: true,
            arrows: false,
            variableWidth: true,
            responsive: [{
                breakpoint: 1280,
                settings: {
                    slidesToShow: 6
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3
                }
            }]
        });
        let currentSlideStore = slickStoreGallery.slick("slickCurrentSlide") + 1;
        let totalSlidesStore = slickStoreGallery.slick("getSlick").slideCount;
        $(".store-gallery .counter__current").text(currentSlideStore);
        $(".store-gallery .counter__total").text(totalSlidesStore);
        slickStoreGallery.on("afterChange", function(event, slick, currentSlide, nextSlide) {
            $(".store-gallery .counter__current").text(currentSlide + 1)
        })
    }
    if ($(".js-viewed-products").length > 0) {
        const slickViewed = $(".js-viewed-products .carousel").slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            swipeToSlide: true,
            infinite: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5e3,
            speed: 800,
            prevArrow: '<button class="prev" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow: '<button class="next" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-right"></svg></button>',
            responsive: [{
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            }]
        });
        let currentSlideViewed = slickViewed.slick("slickCurrentSlide") + 1;
        let totalSlidesViewed = slickViewed.slick("getSlick").slideCount;
        $(".js-viewed-products .counter__current").text(currentSlideViewed);
        $(".js-viewed-products .counter__total").text(totalSlidesViewed);
        slickViewed.on("afterChange", function(event, slick, currentSlide, nextSlide) {
            $(".js-viewed-products .counter__current").text(currentSlide + 1)
        })
    }
    if ($(".js-news").length > 0) {
        $(".js-news").each(function() {
            let thisNews = $(this);
            const slickNews = thisNews.find(".carousel").slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                swipeToSlide: true,
                infinite: true,
                dots: false,
                autoplay: true,
                autoplaySpeed: 5e3,
                speed: 800,
                prevArrow: '<button class="prev" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-left"></svg></button>',
                nextArrow: '<button class="next" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-right"></svg></button>',
                responsive: [{
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 2
                    }
                }, {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1
                    }
                }]
            });
            let currentSlideNews = slickNews.slick("slickCurrentSlide") + 1;
            let totalSlidesNews = slickNews.slick("getSlick").slideCount;
            thisNews.find(".counter__current").text(currentSlideNews);
            thisNews.find(".counter__total").text(totalSlidesNews);
            if (!this.classList.contains("active")) {
                slickNews.slick("slickPause")
            }
            slickNews.on("afterChange", function(event, slick, currentSlide, nextSlide) {
                thisNews.find(".counter__current").text(currentSlide + 1)
            })
        })
    }
    $(".news-slider .tabs__item").on("click", function() {
        let activeNav = $(this).attr("data-nav");
        $(".news-slider .js-news").each(function() {
            $(this).find(".carousel").slick("slickPause")
        });
        $(this).addClass("active").siblings(".tabs__item").removeClass("active");
        $(`[data-block=${activeNav}]`).addClass("active").siblings("[data-block]").removeClass("active");
        $(".js-news.active .carousel").slick("setPosition");
        $(".js-news.active .carousel").slick("slickPlay")
    });
    if ($(".js-designers").length > 0) {
        const slickDesigners = $(".js-designers .carousel").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true,
            infinite: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5e3,
            speed: 800,
            prevArrow: '<button class="prev" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow: '<button class="next" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-right"></svg></button>',
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
        let currentSlideDesigners = slickDesigners.slick("slickCurrentSlide") + 1;
        let totalSlidesDesigners = slickDesigners.slick("getSlick").slideCount;
        $(".js-designers .counter__current").text(currentSlideDesigners);
        $(".js-designers .counter__total").text(totalSlidesDesigners);
        slickDesigners.on("afterChange", function(event, slick, currentSlide, nextSlide) {
            $(".js-designers .counter__current").text(currentSlide + 1)
        })
    }
    $(".f-select--checkbox input").on("change", function() {
        let selected = $(this).parents(".f-select--checkbox").find(".f-select__selected");
        if ($(".f-select--checkbox input:checked").length === 1) {
            let textInp = $(this).siblings("label").text();
            selected.text(textInp)
        } else if ($(".f-select--checkbox input:checked").length > 1) {
            selected.html(`Выбрано<mark>${$(".f-select--checkbox input:checked").length}</mark>`)
        } else {
            selected.text("Выберите стиль")
        }
    });
    $(".f-select__radio input").on("change", function() {
        let textRad = $(this).siblings("label").text();
        $(this).parents(".f-select").find(".f-select__selected").text(textRad)
    });
    $(".cart-promo__header").on("click", function() {
        $(this).toggleClass("open").siblings(".cart-promo__content").slideToggle()
    });
    $(".shops .tabs__item").on("click", function(e) {
        e.preventDefault();
        if (!e.target.classList.contains("active")) {
            let activeNav = $(this).attr("data-nav");
            $(this).addClass("active").siblings(".tabs__item").removeClass("active");
            $(`[data-block=${activeNav}]`).addClass("active").siblings("[data-block]").removeClass("active")
        }
    });
    $(".stock-suggest__close").on("click", function(e) {
        $(".stock-suggest").removeClass("open")
    });
    $(".item-stock__del").on("click", function(e) {
        $(this).parents(".item-stock").remove()
    });
    if ($(".order").length > 0) {
        $(".breadcrumbs__link--tocart").on("click", function(e) {
            e.preventDefault();
            $("#js-modal-order").fadeIn(500);
            $("body").addClass("noscroll")
        })
    }
    $(".js-anchor").click(function() {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $("html,body").animate({
            scrollTop: destination - 30
        }, 1e3);
        return false
    });
    if (document.querySelector(".share-list")) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        let linkMass = [{
            title: "Телеграм",
            href: "https://t.me/share/url?url=" + url + "&text=" + title,
            img: "/local/access/img/icons/baseline-telegram.svg"
        }, {
            title: "VK",
            href: "https://vk.com/share.php?url=" + url + "&title=" + title,
            img: "/local/access/img/icons/simple-icons_vk.svg"
        }, {
            title: "WhatsApp",
            href: "https://api.whatsapp.com/send?text=" + encodeURIComponent(document.title + " " + window.location.href),
            img: "/local/access/img/icons/baseline-whatsapp.svg"
        }, {
            title: "Viber",
            href: "viber://forward?text=" + url,
            img: "/local/access/img/icons/viber-outline.svg"
        }, {
            title: "Одноклассники",
            href: "https://connect.ok.ru/offer?url=" + url + "&title=" + title,
            img: "/local/access/img/icons/ok-ru.svg"
        }];
        document.querySelector(".share-list").insertAdjacentHTML("beforeend", `
          ${linkMass.map(item=>`<a class="share-list__item" href="${item.href}" target="_blank" rel="noopener">
             <img src="${item.img}" alt="">
             <span>${item.title}</span>
          </a>`).join("")}
      `)
    }
    $(".menu__link").on("click", function() {
        $(".search").slideUp();
        $(".dropdown").slideUp();
        $("body").removeClass("noscroll");
        $(".menu-toggle").removeClass("open")
    })
});

  