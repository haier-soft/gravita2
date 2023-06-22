function formOnSuccess(form) {
    let thisForm = $(form)
    thisForm.find("input[type='text'],input[type='tel']").each(function () {
        $(this)
            .val("")
            .siblings(".form-group__placeholder").css("display", "flex")
    })
    thisForm.find('textarea').val("")
    thisForm.find('.form-group').each(function () {
        $(this).removeClass("error")
    })
    thisForm.find('.file-form').removeClass("error")
    thisForm.find('.file-form__item').each(function () {
        $(this).remove()
    })
    $("#js-modal-thanks").fadeIn(500);
    $("body").addClass("noscroll");
}
function formReviewSuccess(form) {
    let thisForm = $(form)
    thisForm.find("input[type='text'],input[type='tel']").each(function () {
        $(this)
            .val("")
            .siblings(".form-group__placeholder").css("display", "flex")
    })
    thisForm.find('textarea').val("")
    thisForm.find('.form-group').each(function () {
        $(this).removeClass("error")
    })
    thisForm.find('.file-form').removeClass("error")
    thisForm.find('.file-form__item').each(function () {
        $(this).remove()
    })
    thisForm.find("input[type='radio']:checked").prop('checked', false);
    $("#js-modal-review").fadeIn(500);
    $("body").addClass("noscroll");
}
$(function () {
    // Для демонстрации, удалить
    if (document.querySelector(".item-review")) {
        const review = document.querySelectorAll(".item-review")
        review[0].querySelector(".rating-container.dark").style.width = "80%"
    }
    // Для демонстрации, удалить
    if (document.querySelector(".stock-form")) {
        const inp = document.querySelector(".stock-form input")
        inp.addEventListener("input", () => {
            if (inp.value.length > 0) {
                document.querySelector(".stock-suggest").classList.add("open");

            } else {
                document.querySelector(".stock-suggest").classList.remove("open");
            }
        })
    }
    // Для демонстрации, удалить, est na over js
    if ($('.js-projects').length > 0) {
        const slickProjects = $(".js-projects .carousel-projects").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true,
            infinite: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 800,
            prevArrow:
                '<button class="prev" type="button"><svg><use href="img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow:
                '<button class="next" type="button"><svg><use href="img/icons/sprite.svg#arrow-right"></svg></button>',
            responsive: [
                {
                    breakpoint: 1080,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        });

        let currentSlideProjects = slickProjects.slick("slickCurrentSlide") + 1;
        let totalSlidesProjects = slickProjects.slick("getSlick").slideCount;

        $(".js-projects .counter__current").text(currentSlideProjects);
        $(".js-projects .counter__total").text(totalSlidesProjects);

        slickProjects.on("afterChange", function (event, slick, currentSlide, nextSlide) {
            $(".js-projects .counter__current").text(currentSlide + 1);
        });
    }
    // add file
    document.querySelectorAll(".file-form").forEach(item => {
        item.querySelector("input").addEventListener("change", e => {
            let files = e.target.files;
            for (let i = 0; i < files.length; i++) {
                let f = files[i];
                item.querySelector(".file-form__items").innerHTML += `
      <div class="file-form__item">
          <span class="file-form__name">${f.name}</span>
          <span class="file-form__del"><svg><use href="img/icons/sprite.svg#del-item"></use></svg></span>
      </div>`
            }
        })
        item.addEventListener("click", e => {
            item.querySelectorAll(".file-form__del").forEach(del => {
                if (del.contains(e.target)) {
                    del.parentNode.remove()
                }
            })
        })
    })
    // show/unshow custom input placeholder
    if (document.querySelector(".form-group")) {
        document.querySelectorAll(".form-group").forEach(item => {
            let inp = item.querySelector("input")
            if (inp && item.querySelector(".form-group__placeholder")) {
                if (!inp.classList.contains("phone")) {
                    inp.addEventListener("input", () => {
                        if (inp.value.length === 0) {
                            item.querySelector(".form-group__placeholder").style.display = "flex"
                        } else {
                            item.querySelector(".form-group__placeholder").style.display = "none"
                        }
                    })
                } else {
                    inp.addEventListener("focus", () => {
                        item.querySelector(".form-group__placeholder").style.display = "none"
                    })
                    inp.addEventListener("blur", () => {
                        if (!inp.classList.contains("completed")) {
                            item.querySelector(".form-group__placeholder").style.display = "flex"
                        }
                    })
                }
            }
        })
    }
    //active tab position
    const tabs = document.querySelectorAll(".tabs-scroll")
    tabs.forEach(item => {
        let tabsPos = item.querySelector(".tabs__item.active").getBoundingClientRect().left - item.getBoundingClientRect().left - 10
        item.scrollLeft = tabsPos
    })
    // item-review images length
    if (document.querySelectorAll(".item-review")) {
        const itemReview = document.querySelectorAll(".item-review")
        itemReview.forEach(item => {
            const images = item.querySelectorAll(".item-review__img")
            if (item && images.length > 2) {
                item.querySelector(".item-review__img:nth-child(3)").innerHTML += `<div class="h5">
            +${images.length - 2}
          </div>`
            }
        })
    }
    //promo-slider 
    if ($('.js-promo').length > 0) {
        const slickPromo = $(".js-promo .carousel").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true,
            infinite: true, 
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 800,
            prevArrow:
                '<button class="prev" type="button"><svg><use href="img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow:
                '<button class="next" type="button"><svg><use href="img/icons/sprite.svg#arrow-right"></svg></button>',
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        });

        let currentSlidePromo = slickPromo.slick("slickCurrentSlide") + 1;
        let totalSlidesPromo = slickPromo.slick("getSlick").slideCount;

        $(".js-promo .counter__current").text(currentSlidePromo);
        $(".js-promo .counter__total").text(totalSlidesPromo);

        slickPromo.on("afterChange", function (event, slick, currentSlide, nextSlide) {
            $(".js-promo .counter__current").text(currentSlide + 1);
        });
    }
    //project-slider
    if ($('.js-project').length > 0) {
        let init = false
        function slickProjectInit() {
            if (window.innerWidth > 480) {
                if (!init) {
                    init = true
                    const slickProject = $(".js-project .carousel").slick({
                        slidesToShow: 1,
                        slidesToScroll: 1, 
                        swipeToSlide: true,
                        centerMode: true,
                        centerPadding: '20px',
                        infinite: true,
                        dots: false,
                        autoplay: true,
                        autoplaySpeed: 5000,
                        speed: 800,
                        prevArrow: '.js-project__prev',
                        nextArrow: '.js-project__next',
                    });
                    $(".js-project .counter").css("display", "flex");
                    let currentSlideProject = slickProject.slick("slickCurrentSlide") + 1;
                    let totalSlidesProject = slickProject.slick("getSlick").slideCount;

                    $(".js-project .counter__current").text(currentSlideProject);
                    $(".js-project .counter__total").text(totalSlidesProject);

                    slickProject.on("afterChange", function (event, slick, currentSlide, nextSlide) {
                        $(".js-project .counter__current").text(currentSlide + 1);
                    });
                }
            } else if (window.innerWidth <= 480 && init) {
                $(".js-project .carousel").slick('unslick');
                init = false
                $(".js-project .counter").css("display", "none");
            }
        }
        slickProjectInit()
        $(window).on('resize', () => slickProjectInit())

    }
    //project-products-slider
    if ($('.js-project-products').length > 0) {
        const slickProjectProducts = $(".js-project-products .carousel").slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 5000,
            infinite: true,
            dots: false,
            speed: 800,
            responsive: [
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 4,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    },
                }
            ],
            prevArrow:
                '<button class="prev" type="button"><svg><use href="img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow:
                '<button class="next" type="button"><svg><use href="img/icons/sprite.svg#arrow-right"></svg></button>',
        });

        let currSlidePrProducts = slickProjectProducts.slick("slickCurrentSlide") + 1;
        let totalSlidesPrProducts = slickProjectProducts.slick("getSlick").slideCount;
        $(".js-project-products .counter__current").text(currSlidePrProducts);
        $(".js-project-products .counter__total").text(totalSlidesPrProducts);

        slickProjectProducts.on("afterChange", function (event, slick, currentSlide, nextSlide) {
            $(".js-project-products .counter__current").text(currentSlide + 1);
        });
        if (slickProjectProducts.slick("getSlick").options.slidesToShow >= totalSlidesPrProducts) {
            $(".js-project-products .counter").css("display", "none");
        } else {
            $(".js-project-products .counter").css("display", "flex");
        }
        $(window).on("resize", function () {
            let slidesToShow
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
                $(".js-project-products .counter").css("display", "none");
            } else {
                $(".js-project-products .counter").css("display", "flex");
            }

        })
    }
    //certificates-slider
    if ($('.js-certificates').length > 0) {
        let init = false
        function slickCertInit() {
            if (window.innerWidth <= 576) {
                if (!init) {
                    init = true
                    const slickCert = $(".js-certificates .carousel").slick({
                        slidesToShow: 1,
                        swipeToSlide: true, 
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 5000,
                        speed: 800, 
                        infinite: true,
                        dots: false,
                        prevArrow:
                            '<button class="prev" type="button"><svg><use href="img/icons/sprite.svg#arrow-left"></svg></button>',
                        nextArrow:
                            '<button class="next" type="button"><svg><use href="img/icons/sprite.svg#arrow-right"></svg></button>',
                    });
                    $(".js-certificates .counter").css("display", "flex");
                    let currentSlideCert = slickCert.slick("slickCurrentSlide") + 1;
                    let totalSlidesCert = slickCert.slick("getSlick").slideCount;

                    $(".js-certificates .counter__current").text(currentSlideCert);
                    $(".js-certificates .counter__total").text(totalSlidesCert);

                    slickCert.on("afterChange", function (event, slick, currentSlide, nextSlide) {
                        $(".js-certificates .counter__current").text(currentSlide + 1);
                    });
                }
            } else if (window.innerWidth > 576 && init) {
                $(".js-certificates .carousel").slick('unslick');
                init = false
                $(".js-certificates .counter").css("display", "none");
            }
        }
        slickCertInit()
        $(window).on('resize', () => slickCertInit())

    }
    //our-team-slider
    if ($(".js-team").length > 0) {
        $(".js-team").each(function () {
            let init = false
            let slickTeam
            function slickTeamInit(team) {
                if (window.innerWidth <= 991) {
                    if (!init) {
                        init = true
                        slickTeam = $(team).find(".carousel").slick({
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            swipeToSlide: true,
                            autoplay: true,
                            autoplaySpeed: 5000,
                            speed: 800,
                            infinite: true,
                            dots: false,
                            prevArrow:
                                '<button class="prev" type="button"><svg><use href="img/icons/sprite.svg#arrow-left"></svg></button>',
                            nextArrow:
                                '<button class="next" type="button"><svg><use href="img/icons/sprite.svg#arrow-right"></svg></button>',
                        });
                        $(team).find(".counter").css("display", "flex");
                        let currentSlideTeam = slickTeam.slick("slickCurrentSlide") + 1;
                        let totalSlidesTeam = slickTeam.slick("getSlick").slideCount;
                        $(team).find(".counter__current").text(currentSlideTeam);
                        $(team).find(".counter__total").text(totalSlidesTeam);
                        if (!team.classList.contains("active")) {
                            slickTeam.slick("slickPause")
                        }
                        slickTeam.on("afterChange", function (event, slick, currentSlide, nextSlide) {
                            $(team).find(".counter__current").text(currentSlide + 1);
                        });
                    }
                } else if (window.innerWidth > 991 && init) {
                    slickTeam.slick('unslick');
                    init = false
                    $(team).find(".counter").css("display", "none");
                }
            }
            slickTeamInit(this)
            $(window).on('resize', () => slickTeamInit(this))
        })
    }
    $(".our-team .tabs__item").on("click", function () {
        let activeNav = $(this).attr("data-nav")
        if (window.innerWidth <= 991) {
            $(".our-team .js-team").each(function () {
                $(this).find(".carousel").slick('slickPause')
            });
        }
        $(this).addClass("active").siblings(".tabs__item").removeClass("active");
        $(`[data-block=${activeNav}]`)
            .addClass("active")
            .siblings("[data-block]")
            .removeClass("active");
        if (window.innerWidth <= 991) {
            $(".our-team .js-team.active .carousel").slick('setPosition');
            $(".our-team .js-team.active .carousel").slick('slickPlay');
        }
    })
    //store-slider
    if ($('.store-gallery').length > 0) {
        let slickStoreGallery = $(".store-gallery__carousel").slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay: false,
            autoplaySpeed: 4000,
            fade: false,
            asNavFor: ".store-gallery__thumbs",
            prevArrow:
                '<button class="prev slick-arrow" type="button"><svg><use href="img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow:
                '<button class="next slick-arrow" type="button"><svg><use href="img/icons/sprite.svg#arrow-right"></svg></button>',
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
            responsive: [
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 6,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 3,
                    },
                },
            ],
        });

        let currentSlideStore = slickStoreGallery.slick("slickCurrentSlide") + 1;
        let totalSlidesStore = slickStoreGallery.slick("getSlick").slideCount;

        $(".store-gallery .counter__current").text(currentSlideStore);
        $(".store-gallery .counter__total").text(totalSlidesStore);

        slickStoreGallery.on("afterChange", function (event, slick, currentSlide, nextSlide) {
            $(".store-gallery .counter__current").text(currentSlide + 1);
        });
    }
    //viewed products slider
    if ($('.js-viewed-products').length > 0) {
        const slickViewed = $(".js-viewed-products .carousel").slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            swipeToSlide: true,
            infinite: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 800,
            prevArrow:
                '<button class="prev" type="button"><svg><use href="img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow:
                '<button class="next" type="button"><svg><use href="img/icons/sprite.svg#arrow-right"></svg></button>',
            responsive: [
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 4,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    },
                },
            ],
        });

        let currentSlideViewed = slickViewed.slick("slickCurrentSlide") + 1;
        let totalSlidesViewed = slickViewed.slick("getSlick").slideCount;

        $(".js-viewed-products .counter__current").text(currentSlideViewed);
        $(".js-viewed-products .counter__total").text(totalSlidesViewed);

        slickViewed.on("afterChange", function (event, slick, currentSlide, nextSlide) {
            $(".js-viewed-products .counter__current").text(currentSlide + 1);
        });
    }
    //news-slider
    if ($('.js-news').length > 0) {
        $(".js-news").each(function () {
            let thisNews = $(this)
            const slickNews = thisNews.find(".carousel").slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                swipeToSlide: true,
                infinite: true,
                dots: false,
                autoplay: true,
                autoplaySpeed: 5000,
                speed: 800,
                prevArrow:
                    '<button class="prev" type="button"><svg><use href="img/icons/sprite.svg#arrow-left"></svg></button>',
                nextArrow:
                    '<button class="next" type="button"><svg><use href="img/icons/sprite.svg#arrow-right"></svg></button>',
                responsive: [
                    {
                        breakpoint: 1280,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                        },
                    },
                ],
            });
    
            let currentSlideNews = slickNews.slick("slickCurrentSlide") + 1;
            let totalSlidesNews = slickNews.slick("getSlick").slideCount;
    
            thisNews.find(".counter__current").text(currentSlideNews);
            thisNews.find(".counter__total").text(totalSlidesNews);
            if (!this.classList.contains("active")) {
                slickNews.slick("slickPause")
            }
            slickNews.on("afterChange", function (event, slick, currentSlide, nextSlide) {
                thisNews.find(".counter__current").text(currentSlide + 1);
            });
        })
    }
    $(".news-slider .tabs__item").on("click", function () {
        let activeNav = $(this).attr("data-nav")
        $(".news-slider .js-news").each(function () {
            $(this).find(".carousel").slick('slickPause')
        });
        $(this).addClass("active").siblings(".tabs__item").removeClass("active");
        $(`[data-block=${activeNav}]`)
            .addClass("active")
            .siblings("[data-block]")
            .removeClass("active");
            $(".js-news.active .carousel").slick('setPosition');
            $(".js-news.active .carousel").slick('slickPlay');
    })
    //designers-slider
    if ($('.js-designers').length > 0) {
        const slickDesigners = $(".js-designers .carousel").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true,
            infinite: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 800,
            prevArrow:
                '<button class="prev" type="button"><svg><use href="img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow:
                '<button class="next" type="button"><svg><use href="img/icons/sprite.svg#arrow-right"></svg></button>',
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        });

        let currentSlideDesigners = slickDesigners.slick("slickCurrentSlide") + 1;
        let totalSlidesDesigners = slickDesigners.slick("getSlick").slideCount;

        $(".js-designers .counter__current").text(currentSlideDesigners);
        $(".js-designers .counter__total").text(totalSlidesDesigners);

        slickDesigners.on("afterChange", function (event, slick, currentSlide, nextSlide) {
            $(".js-designers .counter__current").text(currentSlide + 1);
        });
    }
    $(".f-select--checkbox input").on("change", function () {
        let selected = $(this).parents(".f-select--checkbox").find(".f-select__selected")
        if ($(".f-select--checkbox input:checked").length === 1) {
            let textInp = $(this).siblings("label").text()
            selected.text(textInp);
        } else if ($(".f-select--checkbox input:checked").length > 1) {
            selected.html(`Выбрано<mark>${$(".f-select--checkbox input:checked").length}</mark>`);
        } else {
            selected.text("Выберите стиль");
        }
    })
    $(".f-select__radio input").on("change", function () {
        let textRad = $(this).siblings("label").text()
        $(this)
            .parents(".f-select")
            .find(".f-select__selected").text(textRad);
    })
    $(".cart-promo__header").on("click", function () {
        $(this)
            .toggleClass("open")
            .siblings(".cart-promo__content")
            .slideToggle()
    });
    $(".shops .tabs__item").on("click", function (e) {
        e.preventDefault();
        if (!e.target.classList.contains("active")) {
            let activeNav = $(this).attr("data-nav")
            $(this).addClass("active").siblings(".tabs__item").removeClass("active");
            $(`[data-block=${activeNav}]`)
                .addClass("active")
                .siblings("[data-block]")
                .removeClass("active");
        }
    })
    $('.stock-suggest__close').on("click", function (e) {
        $('.stock-suggest').removeClass("open")
    });
    //remove stock item
    $('.item-stock__del').on("click", function (e) {
        //let id = $(this).parents('.item-stock').data('id');
        $(this).parents('.item-stock').remove();
    });
    //remove cart item
    $('.item-cart__del').on("click", function (e) {
        //let id = $(this).parents('.item-cart').data('id');
        $(this).parents('.item-cart').remove();
    });
    // order-modal
    if ($(".order").length > 0) {
        $(".breadcrumbs__link--tocart").on("click", function (e) {
            e.preventDefault();
            $('#js-modal-order').fadeIn(500)
            $("body").addClass("noscroll");
        })
    }
    $('.js-anchor').click(function () {
        var elementClick = $(this).attr('href');
        var destination = $(elementClick).offset().top;
        $('html,body').animate({ scrollTop: destination - 30 }, 1000);
        return false;
    });
    if (document.querySelector(".share-list")) {
        const url = encodeURIComponent(window.location.href)
        const title = encodeURIComponent(document.title)
        let linkMass = [
          {
            title: 'Телеграм',
            href: "https://t.me/share/url?url=" + url + '&text=' + title,
            img: "img/icons/baseline-telegram.svg"
          },
          {
            title: 'VK',
            href: "https://vk.com/share.php?url=" + url + "&title=" + title,
            img: "img/icons/simple-icons_vk.svg"
          },
          {
            title: 'WhatsApp',
            href: "https://api.whatsapp.com/send?text=" + encodeURIComponent(document.title + " " + window.location.href),
            img: "img/icons/baseline-whatsapp.svg"
          },
          {
            title: 'Viber',
            href: "viber://forward?text=" + url,
            img: "img/icons/viber-outline.svg"
          },
          {
            title: 'Одноклассники',
            href: "https://connect.ok.ru/offer?url=" + url + "&title=" + title,
            img: "img/icons/ok-ru.svg"
          },
        ]
        
        document.querySelector(".share-list").insertAdjacentHTML('beforeend', `
          ${linkMass.map(item => `<a class="share-list__item" href="${item.href}" target="_blank" rel="noopener">
             <img src="${item.img}" alt="">
             <span>${item.title}</span>
          </a>`
        ).join("")}
      `);
      }
    $('.s-result .js-anchor')
})
