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
})