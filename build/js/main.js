$(function() {

    $('.avatar .avatar__img').on('click', function() {
        $('.menu').fadeToggle(200)
    })
    $('.menu .close').on('click', function() {
        $('.menu').fadeOut(200)
    })
    $(document).mouseup(function(e) { // событие клика по веб-документу
        var div = $(".avatar"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            &&
            div.has(e.target).length === 0) { // и не по его дочерним элементам
            $('.menu').fadeOut(200)
        }
    });

    $('.burger').on('click', function() {

        $('.sidebar').toggleClass('active')
    })



    $(document).mouseup(function(e) { // событие клика по веб-документу
        var div = $(".sidebar"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            &&
            div.has(e.target).length === 0) { // и не по его дочерним элементам

            $('.sidebar').removeClass('active')
        }
    });

    $(".sidebar .close").on('click', function() {
        $('.sidebar').removeClass('active')
    })

    $('.nise-select').niceSelect()

    // маркет
    $('.market__right .btn-api').on('click', function() {
        $('.market__item').removeClass('active')
        $(this).closest('.market__item').addClass('active')
    })

    $('.market__right .btn-save').on('click', function() {
        $('.market__item').removeClass('active')
    })

    $('.market__item .checkbox-inline input').on('change', function() {
        if (!$(this).is(":checked")) {
            $(this).closest('.market__item').addClass('not-active')
        } else {
            $(this).closest('.market__item').removeClass('not-active')
        }
    })

    // каталог
    $('.action__wrap').on('click', function() {
        $('.action__toggle').fadeToggle(200)
    })

    $('.action__toggle__item').on('click', function() {

        $('.action__item').removeClass('active')
        $('.action__item').eq($(this).index()).addClass('active')
    })

    $(document).mouseup(function(e) { // событие клика по веб-документу
        var div = $('.action__wrap'); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            &&
            div.has(e.target).length === 0) { // и не по его дочерним элементам
            $('.action__toggle').fadeOut(200)
        }
    });



    $('.catalog__setting__btn').on('click', function() {
        $(this).closest('.catalog__settign').find('.catalog__setting__wrap').fadeToggle(200)
    })
    $(document).mouseup(function(e) { // событие клика по веб-документу
        var div = $('.catalog__settign'); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            &&
            div.has(e.target).length === 0) { // и не по его дочерним элементам
            $('.catalog__setting__wrap').fadeOut(200)
        }
    });
    console.log($('.catalog__head .action input[type="checkbox"]'))
    $('.catalog__head .action input[type="checkbox"]').on('change', function() {

        if ($(this).is(":checked")) {
            $('.catalog__item input[type="checkbox"]').prop('checked', true);
        } else {
            $('.catalog__item input[type="checkbox"]').prop('checked', false);
        }
    })

    // логика фильтра каталога
    let priceItem = $('.catalog__price .b-item')

    let bodyItem = $('.catalog__body__row1 .b-item')

    let headItem = $('.catalog__head .b-item')

    let priceRow = $('.catalog__price')

    let settingCheck = $('.catalog__settign ul input[type="checkbox"]')

    let priceCheck = $('.catalog__settign .catalog__setting__price input[type="checkbox"]')

    let arrSetting = [];

    function settingReed() {
        let count = 0;
        $.each(settingCheck, function(i, val) {
            if ($(val).is(":checked")) {
                arrSetting[i] = 1;
                count++
            } else {
                arrSetting[i] = 0;
            }
        })
        if (count > 2) {
            $('.catalog__table').addClass('big')
        } else {
            $('.catalog__table').removeClass('big')
        }
    }

    function settingApruv() {
        let j = 0;
        $.each(priceItem, function(i, val) {
            if (j > 3) j = 0
            if (arrSetting[j]) {
                $(val).show()
            } else {
                $(val).hide()
            }
            j++
        })

        $.each(bodyItem, function(i, val) {
            if (j > 3) j = 0
            if (arrSetting[j]) {
                $(val).show()
            } else {
                $(val).hide()
            }
            j++
        })
        $.each(headItem, function(i, val) {
            if (arrSetting[i]) {
                $(val).show()
            } else {
                $(val).hide()
            }
        })

        if (priceCheck.is(":checked")) {
            priceRow.show()
        } else {
            priceRow.hide()
        }
    }

    settingCheck.on('change', () => {
        settingReed()
        settingApruv()
    })
    priceCheck.on('change', () => {
        settingReed()
        settingApruv()
    })

    settingReed()
    settingApruv()
})