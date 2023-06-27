$(function() {
    $(document).on("click", ".filter__selected .filter__item a", function (e) {
        e.preventDefault();
        let filterVal = $(this).data('filter');
        if (filterVal != "") {
            console.log(filterVal);
            /*$("#" + filterVal).removeAttr('checked');
            smartFilter.keyup(BX(filterVal));*/
            $("#" + filterVal).trigger( "click" );
        } else {
            window.location.href = $(this).attr('href');
        }
    });
    $('.catalog .sort__list .sort__link').on('click', function () {
        let href = $(this).attr('href');
        window.location.href = href;
        console.log(href);
    });
    $(document).on("click", ".catalog__more", function (e) {
        let url = $(this).attr('href');
        let thisBlock = $(this);
        let tmpUrl = $(this).data('pager');
        $.ajax({
            type: "POST",
            dataType: "html",
            url: url,
            success: function (response) {
                let page_content = $(response);
                if($(thisBlock).parents('.loadPagination').hasClass('paginationReviews')){
                    if ($('.loadReviews').length > 0) {
                        let $moreBlocks = $(page_content.find('.loadReviews').html());
                        if (page_content.find('.loadCards').length > 0) {
                            $('.loadReviews').append($moreBlocks);
                        } else {
                            $('.loadReviews').html('');
                        }
                    }
                    if (page_content.find('.paginationReviews').length > 0) {
                        $('.paginationReviews').eq(0).html(page_content.find('.paginationReviews').html());
                    } else {
                        $('.paginationReviews').eq(0).html('');
                    }
                }else {
                    if ($('.loadCards').length > 0) {
                        let $moreBlocks = $(page_content.find('.loadCards').html());
                        if (page_content.find('.loadCards').length > 0) {
                            $('.loadCards').append($moreBlocks);
                            $('.loader').show();
                            if ($(".card-items").length > 0) {
                                setTimeout(function () {
                                    $cardItems.masonry('appended', $moreBlocks);
                                    $('.loader').hide();
                                }, 500);
                            } else {
                                setTimeout(function () {
                                    $cataloGrid.masonry('appended', $moreBlocks);
                                    $('.loader').hide();
                                }, 500);
                            }
                            /*$('.loadCards').imagesLoaded().progress( function() {

                            });*/
                        } else {
                            $('.loadCards').html('');
                        }
                    }
                    if ($('.loadCollection').length > 0) {
                        let $moreBlocks = $(page_content.find('.loadCollection').html());
                        let $moreGoods = $moreBlocks.find('.coll-goods').html();
                        console.log($moreBlocks.find('.coll-goods').length);
                        if (page_content.find('.loadCollection').length > 0) {
                            $('.loadCollection').append($moreBlocks);
                            /*$('.loadCollection').imagesLoaded().progress( function() {
                                $cataloGrid.masonry('appended', $moreBlocks);
                            });*/
                            setTimeout(function () {
                                $cataloGrid.masonry('appended', $moreBlocks);
                                $moreBlocks.find('.coll-goods').each(function(index, element){
                                    $(this).masonry({
                                        gutter: gutterMasonryColl,
                                        //columnWidth: colMasonryWidth,
                                        itemSelector: ".coll-goods__item",
                                        lazyLoad: true,
                                    });
                                });
                            }, 200);
                        } else {
                            $('.loadCollection').html('');
                        }
                    }


                    if (page_content.find('.loadPagination').length > 0) {
                        $('.loadPagination').eq(0).html(page_content.find('.loadPagination').html());
                    } else {
                        $('.loadPagination').eq(0).html('');
                    }
                }
                window.history.pushState(null, null, tmpUrl);


                //setTimeout(masonry, 100);
                //masonry();
            }
        });
        e.preventDefault();
    });
    $('#productForm .js-plus-o').on('click', function (e) {
        let productQuantityPieces = $('#productQuantityDef').val();
        let productQuantityOsn = $('#productQuantityOsn').val();
        let productQuantity = $('#productQuantity').val();
        let typeMeasure = $('#productForm input[name="unit"]:checked').val();
        let addPodrezka = 'N';
        if ($('#productForm .addPodrezka').is(':checked')) {
            addPodrezka = 'Y';
        }
        let param = $.param({
            'PODREZKA': addPodrezka,
            'QUANTITY': productQuantity,
            'QUANTITY_PIECES': productQuantityPieces,
            'QUANTITY_OSN': productQuantityOsn,
            'MEASURE': typeMeasure,
            'TYPE': 'plus',
            'DEFAULT': omniProduct
        });
        sendCalculate(param);
        e.preventDefault();
    });
    $('#productForm .js-minus-o').on('click', function (e) {
        let productQuantity = $('#productQuantity').val();
        let productQuantityOsn = $('#productQuantityOsn').val();
        let typeMeasure = $('#productForm input[name="unit"]:checked').val();
        let addPodrezka = 'N';
        if ($('#productForm .addPodrezka').is(':checked')) {
            addPodrezka = 'Y';
        }
        let param = $.param({
            'PODREZKA': addPodrezka,
            'QUANTITY': productQuantity,
            'QUANTITY_OSN': productQuantityOsn,
            'MEASURE': typeMeasure,
            'TYPE': 'minus',
            'DEFAULT': omniProduct
        });
        sendCalculate(param);
        e.preventDefault();
    });
    $('#productForm #productQuantity').on('change', function (e) {
        let productQuantity = $('#productQuantity').val();
        let productQuantityOsn = $('#productQuantityOsn').val();
        let typeMeasure = $('#productForm input[name="unit"]:checked').val();
        let addPodrezka = 'N';
        if ($('#productForm .addPodrezka').is(':checked')) {
            addPodrezka = 'Y';
        }
        let param = $.param({
            'PODREZKA': addPodrezka,
            'QUANTITY': productQuantity,
            'QUANTITY_OSN': productQuantityOsn,
            'MEASURE': typeMeasure,
            'TYPE': 'change',
            'DEFAULT': omniProduct
        });
        sendCalculate(param);
        e.preventDefault();
    });
    $('#productForm .radiobutton__control').on('click', function (e) {
        let productQuantity = $('#productQuantity').val();
        let productQuantityOsn = $('#productQuantityOsn').val();
        let typeMeasure = $(this).val();
        let lastMeasure = $('#productMeasureLast').val();
        let addPodrezka = 'N';
        if ($('#productForm .addPodrezka').is(':checked')) {
            let addPodrezka = 'Y';
        }
        let param = $.param({
            'PODREZKA': addPodrezka,
            'QUANTITY': productQuantity,
            'QUANTITY_OSN': productQuantityOsn,
            'MEASURE': typeMeasure,
            'LAST_MEASURE': lastMeasure,
            'TYPE': 'ratio',
            'DEFAULT': omniProduct
        });
        sendCalculate(param);
        $('#productMeasureLast').val(typeMeasure);
    });
    /*$('#productForm .addPodrezka').on('click', function(e) {
        let productQuantity = $('#productQuantity').val();
        let productQuantityOsn = $('#productQuantityOsn').val();
        let typeMeasure = $('#productForm input[name="unit"]:checked').val();
        let addPodrezka = 'N';
        if($('#productForm .addPodrezka').is(':checked')){
            addPodrezka = 'Y';
        }
        let param = $.param({
            'PODREZKA': addPodrezka,
            'QUANTITY': productQuantity,
            'QUANTITY_OSN': productQuantityOsn,
            'MEASURE': typeMeasure,
            'TYPE': 'podrezka',
            'DEFAULT':omniProduct
        });
        sendCalculate(param);
    });*/

    $('#buy .product__btn').on('click', function (e) {
        let param = $.param({
            'ID': omniProduct["ID"],
            'QUANTITY': $('#productQuantityDef').val(),
            'MODE': 'addCart',
        });
        $.ajax({
            url: "/local/include/ajax/ajax.php",
            type: "POST",
            dataType: "json",
            async: false,
            data: param,
            success: function (response) {
                $('.basket-btn span').text(response.cartCount);
                $(".js-copy-label-green").addClass("open");
                setTimeout(function () {
                    $(".js-copy-label-green").removeClass("open");
                }, 3500);
            }
        });
        e.preventDefault();
    });

    $('input[name="NAME"], input[name="PROP[1]"]').on('input', function (e) {//валидация ФИО
        let val = $(this).val();
        let res = val.replace(/[^а-я ]/gi, '');
        $(this).val(res);
    });
    $('input[name="SQUARE_ROOM"], input[name="EXPERIENCE"], input[name="COST"]').on('input', function (e) {//валидация ФИО
        let val = $(this).val();
        let res = val.replace(/[^0-9,. ]/gi, '');
        $(this).val(res);
    });

    $('.js-open-modals-samples').on('click', function (e) {
        $('#js-modal-samples input[name="PRODUCT_ID"]').val(omniProduct["ID"]);
        $('#js-modal-samples input[name="PRODUCT_NAME"]').val(omniProduct["NAME"]);
        $("#js-modal-samples").fadeIn(500);
        $("body").addClass("noscroll");
        e.preventDefault();
    });
    $('#js-modal-samples form').on('submit', function (e) {
        let error = false;
        let email = $(this).find('input[name="EMAIL"]').val();

        $(this).find('.required').each(function(index, element) {
            let typeInput = $(this).attr('type');

            if(typeInput=="text" || typeInput=="tel"){
                if($(this).val()==""){
                    $(this).parent().addClass('error');
                    error = true;
                }else{
                    $(this).parent().removeClass('error');
                }
            }else if(typeInput=="email"){
                if (!validateEmail(email)) {
                    error = true;
                    $(form).find('input[type="email"]').parent().addClass('error');
                }else{
                    $(form).find('input[type="email"]').parent().removeClass('error');
                }
            }
        });

        $(this).find('input[name="EMAIL"]').parent().removeClass('error');
        if (email != "") {
            if (!validateEmail(email)) {
                error = true;
                $(this).find('input[name="EMAIL"]').parent().addClass('error');
            }
        }
        if (!error) {
            let param = $.param({
                MODE: 'formSample'
            });
            param = param + "&" + $(this).serialize();
            $.ajax({
                url: "/local/include/ajax/ajax.php",
                type: "POST",
                dataType: "json",
                data: param,
                success: function (response) {
                    if (response.type == "success") {
                        $('#js-modal-samples form .form-group input').val('');
                        $('#js-modal-samples form .form-group textarea').val('');
                        $("#js-modal-samples").fadeOut(100);
                        $("#js-modal-thanks").fadeIn(500);
                    } else {
                        $("#js-modal-samples").fadeOut(100);
                        $("#js-modal-error").fadeIn(500);
                    }
                }
            });
        }
        e.preventDefault();
    });
    $('#js-modal-callback form').on('submit', function (e) {
        let error = false;
        $(this).find('.required').each(function(index, element) {
            let typeInput = $(this).attr('type');

            if(typeInput=="text" || typeInput=="tel"){
                if($(this).val()==""){
                    $(this).parent().addClass('error');
                    error = true;
                }else{
                    $(this).parent().removeClass('error');
                }
            }else if(typeInput=="email"){
                if (!validateEmail(email)) {
                    error = true;
                    $(form).find('input[type="email"]').parent().addClass('error');
                }else{
                    $(form).find('input[type="email"]').parent().removeClass('error');
                }
            }
        });
        if (!error) {
            let param = $.param({
                MODE: 'formCallback'
            });
            param = param + "&" + $(this).serialize();
            $.ajax({
                url: "/local/include/ajax/ajax.php",
                type: "POST",
                dataType: "json",
                data: param,
                success: function (response) {
                    if (response.type == "success") {
                        $('#js-modal-callback form .form-group input').val('');
                        $("#js-modal-callback").fadeOut(100);
                        $("#js-modal-thanks").fadeIn(500);
                    } else {
                        $("#js-modal-callback").fadeOut(100);
                        $("#js-modal-error").fadeIn(500);
                    }
                }
            });
        }
        e.preventDefault();
    });
    $('#js-modal-3d_design form').on('submit', function (e) {
        let error = false;
        $(this).find('.required').each(function(index, element) {
            let typeInput = $(this).attr('type');

            if(typeInput=="text" || typeInput=="tel"){
                if($(this).val()==""){
                    $(this).parent().addClass('error');
                    error = true;
                }else{
                    $(this).parent().removeClass('error');
                }
            }else if(typeInput=="email"){
                if (!validateEmail(email)) {
                    error = true;
                    $(form).find('input[type="email"]').parent().addClass('error');
                }else{
                    $(form).find('input[type="email"]').parent().removeClass('error');
                }
            }
        });
        if (!error) {
            let param = $.param({
                MODE: 'form3Ddesign'
            });
            param = param + "&" + $(this).serialize();
            $.ajax({
                url: "/local/include/ajax/ajax.php",
                type: "POST",
                dataType: "json",
                data: param,
                success: function (response) {
                    if (response.type == "success") {
                        $('#js-modal-3d_design form .form-group input').val('');
                        $("#js-modal-3d_design").fadeOut(100);
                        $("#js-modal-thanks").fadeIn(500);
                    } else {
                        $("#js-modal-3d_design").fadeOut(100);
                        $("#js-modal-error").fadeIn(500);
                    }
                }
            });
        }
        e.preventDefault();
    });
    $('.f-search__reset').on('click', function(e){
        e.preventDefault();
        $('.f-search__form input[name="FILTER_SEARCH"]').val('');
        $('.f-search__form form').trigger( "submit" )
    });
    $('.f-search__form input[name="FILTER_SEARCH"]').on('input', function(){
        $('.f-search__reset').hide();
        $('.f-search__submit').show();
    });
    if ($('.gallery__carousel').length > 0) {
        let slickGallery = $(".gallery__carousel").slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay: false,
            autoplaySpeed: 4000,
            fade: false,
            asNavFor: ".gallery__thumbs",
            prevArrow:
                '<button class="prev" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow:
                '<button class="next" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-right"></svg></button>',
        });

        $(".gallery__thumbs").slick({
            infinite: false,
            slidesToShow: 7,
            slidesToScroll: 1,
            swipeToSlide: true,
            asNavFor: ".gallery__carousel",
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

        let currentSlideGallery = slickGallery.slick("slickCurrentSlide") + 1;
        let totalSlidesGallery = slickGallery.slick("getSlick").slideCount;

        $(".gallery .counter__current").text(currentSlideGallery);
        $(".gallery .counter__total").text(totalSlidesGallery);

        slickGallery.on("afterChange", function (event, slick, currentSlide, nextSlide) {
            $(".gallery .counter__current").text(currentSlide + 1);
        });
    }
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
                '<button class="prev" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow:
                '<button class="next" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-right"></svg></button>',
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
    if ($('.js-other .carousel-projects').length > 0) {

        const slickOther = $(".js-other .carousel-projects").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true,
            infinite: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 800,
            prevArrow:
                '<button class="prev" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow:
                '<button class="next" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-right"></svg></button>',
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

        let currentSlideOther = slickOther.slick("slickCurrentSlide") + 1;
        let totalSlidesOther = slickOther.slick("getSlick").slideCount;

        $(".js-other .counter__current").text(currentSlideOther);
        $(".js-other .counter__total").text(totalSlidesOther);

        slickOther.on("afterChange", function (event, slick, currentSlide, nextSlide) {
            $(".js-other .counter__current").text(currentSlide + 1);
        });
    }
    if ($('.product-carousel').length > 0) {
        $(".product-carousel").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 800,
            prevArrow:
                '<button class="prev" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow:
                '<button class="next" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-right"></svg></button>',
        });
    }
    if ($('.js-similar-size').length > 0) {
        const slickSize = $(".js-similar-size .carousel").slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            swipeToSlide: true,
            infinite: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 800,
            prevArrow:
                '<button class="prev" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow:
                '<button class="next" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-right"></svg></button>',
            responsive: [
                {
                    breakpoint: 1200,
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

        let currentSlideSize = slickSize.slick("slickCurrentSlide") + 1;
        let totalSlidesSize = slickSize.slick("getSlick").slideCount;

        $(".js-similar-size .counter__current").text(currentSlideSize);
        $(".js-similar-size .counter__total").text(totalSlidesSize);

        slickSize.on("afterChange", function (event, slick, currentSlide, nextSlide) {
            $(".js-similar-size .counter__current").text(currentSlide + 1);
        });
    }
    if ($('.js-similar-style').length > 0) {
        const slickStyle = $(".js-similar-style .carousel").slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            swipeToSlide: true,
            infinite: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 800,
            prevArrow:
                '<button class="prev" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-left"></svg></button>',
            nextArrow:
                '<button class="next" type="button"><svg><use href="/local/access/img/icons/sprite.svg#arrow-right"></svg></button>',
            responsive: [
                {
                    breakpoint: 1200,
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

        let currentSlideStyle = slickStyle.slick("slickCurrentSlide") + 1;
        let totalSlidesStyle = slickStyle.slick("getSlick").slideCount;

        $(".js-similar-style .counter__current").text(currentSlideStyle);
        $(".js-similar-style .counter__total").text(totalSlidesStyle);

        slickStyle.on("afterChange", function (event, slick, currentSlide, nextSlide) {
            $(".js-similar-style .counter__current").text(currentSlide + 1);
        });
    }

    /*О компании*/
    $('#aboutForm, #projectForm, #sendReviewForm').on('submit', function (e) {
        let $that = $(this),
            form = $(this),
            error = false,
            formData = new FormData($that.get(0)); // создаем новый экземпляр объекта и передаем ему нашу форму (*)

        $(this).find('.required').each(function(index, element) {
            let typeInput = $(this).attr('type');

            if(typeInput=="text" || typeInput=="tel"){
                if($(this).val()==""){
                    $(this).parent().addClass('error');
                    error = true;
                }else{
                    $(this).parent().removeClass('error');
                }
            }else if(typeInput=="email"){
                if (!validateEmail(email)) {
                    error = true;
                    $(form).find('input[type="email"]').parent().addClass('error');
                }else{
                    $(form).find('input[type="email"]').parent().removeClass('error');
                }
            }
        });
        if(!error){
            $.ajax({
                url: "/local/include/ajax/ajax.php",
                type: "POST",
                dataType: "json",
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function(response){
                    if (response.type == "success") {
                        formOnSuccess(form);
                    } else {
                        $("#js-modal-error").fadeIn(500);
                        $("body").addClass("noscroll");
                    }
                }
            });
        }
        e.preventDefault();
    });
    $('#aboutForm input[name="FIO"]').on('input', function(e){//валидация ФИО
        let val = $(this).val();
        let res = val.replace(/[^а-я ]/gi, '');
        $(this).val(res);
    });
    /*Новости / статьи*/
    $(".news-slider .tabs__item").on("click", function () {
        let activeNav = $(this).attr("data-nav")
        if (window.innerWidth <= 991) {
            $(".news-slider .js-team").each(function () {
                $(this).find(".carousel").slick('slickPause')
            });
        }
        $(this).addClass("active").siblings(".tabs__item").removeClass("active");
        $(`[data-block=${activeNav}]`)
            .addClass("active")
            .siblings("[data-block]")
            .removeClass("active");
        if (window.innerWidth <= 991) {
            $(".news-slider .js-team.active .carousel").slick('setPosition');
            $(".news-slider .js-team.active .carousel").slick('slickPlay');
        }
    });
    /*Корзина*/
    $('.item-cart .js-plus-o').on('click', function (e) {
        let cartID = $(this).parents('.item-cart').data('basket');
        let productQuantityPieces = $('#productQuantityDef_'+cartID).val();
        let productQuantityOsn = $('#productQuantityOsn_'+cartID).val();
        let productQuantity = $('#productQuantity_'+cartID).val();
        let typeMeasure = $('#basket_'+cartID+' input[name="unit"]:checked').val();
        let addPodrezka = 'N';
        let param = $.param({
            'PODREZKA': addPodrezka,
            'QUANTITY': productQuantity,
            'QUANTITY_PIECES': productQuantityPieces,
            'QUANTITY_OSN': productQuantityOsn,
            'MEASURE': typeMeasure,
            'TYPE': 'plus',
            'DEFAULT': omniProductCart[cartID]
        });
        sendCalculateBsk(param, cartID);
        e.preventDefault();
    });
    $('.item-cart .js-minus-o').on('click', function (e) {
        let cartID = $(this).parents('.item-cart').data('basket');
        let productQuantityPieces = $('#productQuantityDef_'+cartID).val();
        let productQuantityOsn = $('#productQuantityOsn_'+cartID).val();
        let productQuantity = $('#productQuantity_'+cartID).val();
        let typeMeasure = $('#basket_'+cartID+' input[name="unit"]:checked').val();
        let addPodrezka = 'N';
        let param = $.param({
            'PODREZKA': addPodrezka,
            'QUANTITY': productQuantity,
            'QUANTITY_PIECES': productQuantityPieces,
            'QUANTITY_OSN': productQuantityOsn,
            'MEASURE': typeMeasure,
            'TYPE': 'minus',
            'DEFAULT': omniProductCart[cartID]
        });
        sendCalculateBsk(param, cartID);
        e.preventDefault();
    });
    $('.item-cart input[name="QUANTITY"]').on('change', function (e) {
        let cartID = $(this).parents('.item-cart').data('basket');
        let productQuantityPieces = $('#productQuantityDef_'+cartID).val();
        let productQuantityOsn = $('#productQuantityOsn_'+cartID).val();
        let productQuantity = $('#productQuantity_'+cartID).val();
        let typeMeasure = $('#basket_'+cartID+' input[name="unit"]:checked').val();
        let addPodrezka = 'N';
        let param = $.param({
            'PODREZKA': addPodrezka,
            'QUANTITY': productQuantity,
            'QUANTITY_PIECES': productQuantityPieces,
            'QUANTITY_OSN': productQuantityOsn,
            'MEASURE': typeMeasure,
            'TYPE': 'change',
            'DEFAULT': omniProductCart[cartID]
        });
        sendCalculateBsk(param, cartID);
        e.preventDefault();
    });
    $('.item-cart .item-cart__radio input').on('click', function (e) {
        let cartID = $(this).parents('.item-cart').data('basket');
        let productQuantityPieces = $('#productQuantityDef_'+cartID).val();
        let productQuantityOsn = $('#productQuantityOsn_'+cartID).val();
        let productQuantity = $('#productQuantity_'+cartID).val();
        let typeMeasure = $('#basket_'+cartID+' input[name="unit"]:checked').val();
        let lastMeasure = $('#productMeasureLast_'+cartID).val();
        let addPodrezka = 'N';
        let param = $.param({
            'PODREZKA': addPodrezka,
            'QUANTITY': productQuantity,
            'QUANTITY_PIECES': productQuantityPieces,
            'QUANTITY_OSN': productQuantityOsn,
            'MEASURE': typeMeasure,
            'LAST_MEASURE': lastMeasure,
            'TYPE': 'ratio',
            'DEFAULT': omniProductCart[cartID]
        });
        sendCalculateBsk(param, cartID, true);
        $('#productMeasureLast_'+cartID).val(typeMeasure);
    });
    $('.promocode').on('submit', function(e){
        $.ajax({
            type: "POST",
            dataType: "json",
            data: $(this).serializeArray(),
            url: "/local/include/ajax/ajax.php?MODE=addCupon",
            success: function(response){
                if(response.type=="error"){
                    $('.promocode-error').text(response.text).show();
                    $('.promocode input').addClass('errorInput');
                }else{
                    $('.promocode-error').hide();
                    $('.promocode input').removeClass('errorInput');
                    window.location.reload();
                }
            }
        });
        e.preventDefault();
    });
    $('.promocode__delete').on('click', function(e){
        let promocode = $(this).data('promocode');
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/local/include/ajax/ajax.php?MODE=delCupon&COUPON="+promocode,
            success: function(response){
                if(response.type=="error"){
                    $('.promocode-error').text(response.text).show();
                    $('.promocode input').addClass('errorInput');
                }else{
                    $('.promocode-error').hide();
                    $('.promocode input').removeClass('errorInput');
                    window.location.reload();
                }
            }
        });
        e.preventDefault();
    });
    $('.item-cart__del').on('click', function (e) {
        let cartID = $(this).parents('.item-cart').data('basket');
        let countCart = $('.item-cart').length;
        let itemCart = $(this).parents('.item-cart');
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/local/include/ajax/ajax.php?MODE=delCart&cartID="+cartID,
            success: function(response){
                if(countCart==1){
                    window.location.reload();
                }else{
                    $(itemCart).remove();
                    $('.section.cart .title span').text(countCart-1);
                    $('.cart-sum').load('/local/include/ajax/ajax.php?MODE=loadFullTotalCart');
                }
            }
        });
        e.preventDefault();
    });
    /*Оформление заказа*/
    $("#orderForm").on('submit', function(e) {//Оформление заказа
        let error = false;
        let form = $(this);
        let email = $(this).find('input[type="email"]').val();
        $("#orderForm .required").each(function(index, element) {
            let typeInput = $(this).attr('type');

            if(typeInput=="text" || typeInput=="tel"){
                if($(this).val()==""){
                    $(this).parent().addClass('error');
                    error = true;
                }else{
                    $(this).parent().removeClass('error');
                }
            }else if(typeInput=="email"){
                if (!validateEmail(email)) {
                    error = true;
                    $(form).find('input[type="email"]').parent().addClass('error');
                }else{
                    $(form).find('input[type="email"]').parent().removeClass('error');
                }
            }
        });
        if(!error) {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: $(this).serializeArray(),
                url: "/local/include/ajax/ajax.php?MODE=addOrder",
                success: function (response) {
                    if (response.error == "1") {
                        window.location = "/order/?ORDER_ID=" + response.order;
                    } else {
                        if(response.typeError=="phone"){
                            $(form).find('.phone').parent().addClass('error');
                            $('html, body').animate({
                                scrollTop: $("#orderForm").offset().top // класс объекта к которому приезжаем
                            }, 1000); // Скорость прокрутки
                        }else{
                            window.location = "/order/error.php";
                        }
                    }
                }
            });
        }else{
            $('html, body').animate({
                scrollTop: $("#orderForm").offset().top // класс объекта к которому приезжаем
            }, 1000); // Скорость прокрутки
        }
        e.preventDefault();
    });
    /*Дизайнеры*/
    $('#orderProjectForm').on('submit', function (e) {//
        let $that = $(this),
            form = $(this),
            error = false;

        $(this).find('[required]').each(function(){
            if($(this).val()==''){
                $(this).parent().addClass('error');
                error = true;
            }else{
                $(this).parent().removeClass('error');
            }
        });
        if(!error){
            $.ajax({
                url: "/local/include/ajax/ajax.php",
                type: "POST",
                dataType: "json",
                data: $(this).serializeArray(),
                success: function(response){
                    if (response.type == "success") {
                        formOnSuccess(form);
                    } else {
                        $("#js-modal-error").fadeIn(500);
                        $("body").addClass("noscroll");
                    }
                }
            });
        }
        e.preventDefault();
    });
    /*Проекты*/
    $('#contactDesignerForm, #writeUsForm').on('submit', function (e) {// Форма связаться с дизайнером
        let $that = $(this),
            form = $(this),
            error = false;
        $(this).find('.required').each(function(index, element) {
            let typeInput = $(this).attr('type');

            if(typeInput=="text" || typeInput=="tel"){
                if($(this).val()==""){
                    $(this).parent().addClass('error');
                    error = true;
                }else{
                    $(this).parent().removeClass('error');
                }
            }else if(typeInput=="email"){
                if (!validateEmail(email)) {
                    error = true;
                    $(form).find('input[type="email"]').parent().addClass('error');
                }else{
                    $(form).find('input[type="email"]').parent().removeClass('error');
                }
            }
        });
        if(!error){
            $.ajax({
                url: "/local/include/ajax/ajax.php",
                type: "POST",
                dataType: "json",
                data: $(this).serializeArray(),
                success: function(response){
                    if (response.type == "success") {
                        formOnSuccess(form);
                    } else {
                        $("#js-modal-error").fadeIn(500);
                        $("body").addClass("noscroll");
                    }
                }
            });
        }
        e.preventDefault();
    });
    $('.header .dropdown .menu .menu__link').on('click', function(){
        $('.menu-toggle.open').trigger('click');
    })
});
function masonry(){
    let windowWidth = $(window).width();
    $cataloGrid.masonry('destroy');
    /*
   * Masonry
   */

    let gutterMasonry = 0;
    let gutterMasonryColl = 0;
    let colMasonryWidth = 0;

    if (windowWidth > 1859) {
        gutterMasonry = 144;
        gutterMasonryColl = 144;
        colMasonryWidth = 352;
    } else if (windowWidth < 1860 && windowWidth > 1599) {
        gutterMasonry = 122;
        gutterMasonryColl = 122;
        colMasonryWidth = 288;
    } else if (windowWidth < 1600 && windowWidth > 1279) {
        gutterMasonry = 101;
        gutterMasonryColl = 101;
        colMasonryWidth = 224;
    } else if (windowWidth < 1280 && windowWidth > 991) {
        gutterMasonry = 133;
        gutterMasonryColl = 60;
        colMasonryWidth = 224;
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
        } else if (windowWidth < 1860 && windowWidth > 1599) {
            gutterMasonry = 122;
            gutterMasonryColl = 122;
            colMasonryWidth = 288;
        } else if (windowWidth < 1600 && windowWidth > 1279) {
            gutterMasonry = 101;
            gutterMasonryColl = 101;
            colMasonryWidth = 224;
        } else if (windowWidth < 1280 && windowWidth > 991) {
            gutterMasonry = 133;
            gutterMasonryColl = 60;
            colMasonryWidth = 224;
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

        $(".catalog-grid").masonry({
            horizontalOrder: true,
            gutter: gutterMasonry,
            //columnWidth: colMasonryWidth,
            itemSelector: ".catalog-grid__item",
            lazyLoad: true,
        });

        $(".coll-goods").masonry({
            gutter: gutterMasonryColl,
            //columnWidth: colMasonryWidth,
            itemSelector: ".coll-goods__item",
            lazyLoad: true,
        });
    });

    $cataloGrid = $(".catalog-grid").masonry({
        horizontalOrder: true,
        gutter: gutterMasonry,
        //columnWidth: colMasonryWidth,
        itemSelector: ".catalog-grid__item",
        lazyLoad: true,
    });

    $coolGoods = $(".coll-goods").masonry({
        gutter: gutterMasonryColl,
        //columnWidth: colMasonryWidth,
        itemSelector: ".coll-goods__item",
        lazyLoad: true,
    });

    /*$cataloGrid.imagesLoaded().progress( function() {
        $cataloGrid.masonry('layout');
    });*/
    $cataloGrid.on( 'layoutComplete', function( event, items ) {

    });
}
function copyToClipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}
function sendCalculate(param){//Правильно рассчитываем и меняем корзину
    let count = 0;
    $.ajax({
        url: "/local/include/ajax/calc.php",
        type: "POST",
        dataType: "json",
        async: false,
        data: param,
        success: function(data){
            console.log(data);
            if(!data.error){
                $('#productQuantity').val(data.count);
                $('#productQuantityDef').val(data.countCart);
                $('#productQuantityOsn').val(data.countOsn);
                if(data.printOldPrice=="Y"){
                    $('#totalPrice').html(data.printTotalPrice+'<span>'+data.printTotalPriceOld+'</span>');
                }else{
                    $('#totalPrice').html(data.printTotalPrice);
                }
            }
        }
    });
}
function sendCalculateBsk(param, cartID, noCart=false){//Правильно рассчитываем и меняем корзину
    let count = 0;
    $.ajax({
        url: "/local/include/ajax/calc.php",
        type: "POST",
        dataType: "json",
        async: false,
        data: param,
        success: function(data){

            if(!data.error){
                $('#productQuantity_'+cartID).val(data.count);
                $('#productQuantityDef_'+cartID).val(data.countCart);
                $('#productQuantityOsn_'+cartID).val(data.countOsn);
                /*if(data.printOldPrice=="Y"){
                    $('#totalPrice_').html(data.printTotalPrice+'<span>'+data.printTotalPriceOld+'</span>');
                }else{*/
                    $('#totalPrice_'+cartID).html(data.printTotalPrice);
                //}
                if(!noCart){
                    editCart(cartID, data.countCart);
                }
            }
        }
    });
}
function editCart(cartID, quantity){
    $.ajax({
        url: "/local/include/ajax/ajax.php?MODE=editCart&cartID="+cartID+"&QUANTITY="+quantity,
        type: "POST",
        dataType: "json",
        success: function(response){
            $('.cart-sum').load('/local/include/ajax/ajax.php?MODE=loadFullTotalCart');
        }
    });
}
function validateEmail(email) {
    let txt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return txt.test(email);
}