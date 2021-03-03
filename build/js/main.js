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

    $('.catalog__head .action input[type="checkbox"]').on('change', function() {

        if ($(this).is(":checked")) {
            $('.catalog__item input[type="checkbox"]').prop('checked', true);
        } else {
            $('.catalog__item input[type="checkbox"]').prop('checked', false);
        }
    })

    function setEndOfContenteditable(contentEditableElement) {
        var range, selection;
        if (document.createRange) //Firefox, Chrome, Opera, Safari, IE 9+
        {
            range = document.createRange(); //Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
            range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection(); //get the selection object (allows you to change selection)
            selection.removeAllRanges(); //remove any selections already made
            selection.addRange(range); //make the range you have just created the visible selection
        } else if (document.selection) //IE 8 and lower
        {
            range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
            range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
            range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
            range.select(); //Select the range (make it the visible selection
        }
    }
    $.fn.selectText = function() {
        var doc = document;
        var element = this[0];
        console.log(this, element);
        if (doc.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };
    $('.addsite__title svg').on('click', function(e) {
        $(this).prev('span').focus()
        $(this).prev('span').selectText();

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

    settingCheck.on('change', function() {
        settingReed()
        settingApruv()
    })
    priceCheck.on('change', function() {
        settingReed()
        settingApruv()
    })

    settingReed()
    settingApruv()

    //шаги
    $('.shag__title').on('click', function() {
        let thisis = $(this)


        if (thisis.hasClass('active')) {

            $('.shag__title').removeClass('active')
            $('.shag__content').slideUp(200);
        } else {
            $('.shag__title').removeClass('active')
            $('.shag__content').slideUp(200);

            thisis.addClass('active')
            setTimeout(function() {
                thisis.next('.shag__content').slideDown(200)
            }, 200)
        }
    })

    // копирование кода
    function selectText(containerid) {
        if (document.selection) { // IE
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select();
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(document.getElementById(containerid));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    }

    $('#copy-code').on('click', function() {
        let copyText = $('#code')
        selectText('code')
        document.execCommand("copy");
        $('.text-copy').fadeIn(400)
        setTimeout(function() {
            $('.text-copy').fadeOut()
        }, 1500)

    })


    // выбор вида
    $('.vibor__content__item.active').show()
    $('.vibor__item').on('click', function() {
        if (!$(this).hasClass('active')) {
            $('.vibor__item').removeClass('active')
            $('.vibor__content__item').removeClass('active')
            $('.vibor__content__item').hide()
            $(this).addClass('active')
            $('.vibor__content__item').eq($(this).index()).addClass('active')
            $('.vibor__content__item.active').fadeIn()
        }
    })

    $('.customer__inline .color input').on('change', function() {
        let colorVal = $(this).val()
        console.log(colorVal)
        if (colorVal == '#ffffff') {
            $(this).addClass('white')
        } else {
            $(this).removeClass('white')
        }
        $(this).closest('.customer__inline').find('.text').val(colorVal)
    })
    $('.customer__inline .text').on('change', function() {
        let colorVal = $(this).val()
        $(this).closest('.customer__inline').find('.color input').val(colorVal)
    })

    $('.input-size span.up').on('click', function() {
        let input = $(this).closest('.input-size').find('input')
        if (input.val() < input.attr('max')) {
            input.val(+input.val() + 1)
        }

    })
    $('.input-size span.down').on('click', function() {
        let input = $(this).closest('.input-size').find('input')
        if (input.val() > input.attr('min')) {
            input.val(+input.val() - 1)
        }

    })


})