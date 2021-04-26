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

    let settLength = settingCheck.length
    console.log(settLength)

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
        console.log(arrSetting)
    }


    function settingApruv() {
        let j = 0;

        $.each(priceItem, function(i, val) {
            if (j >= settLength) j = 0

            if (arrSetting[j]) {
                $(val).show()
            } else {
                $(val).hide()
            }
            j++
        })

        $.each(bodyItem, function(i, val) {
            if (j >= settLength) j = 0

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
            $('.shag__content').slideUp(400);
        } else {
            $('.shag__title').removeClass('active')
            $('.shag__content').slideUp(400);

            thisis.addClass('active')

            thisis.next('.shag__content').slideDown(400)

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

    $('#copy-code2').on('click', function() {
        let copyText = $('#code2')
        selectText('code2')
        document.execCommand("copy");
        $('.text-copy').fadeIn(400)
        setTimeout(function() {
            $('.text-copy').fadeOut()
        }, 1500)

    })

    $('#copy-code3').on('click', function() {
        let copyText = $('#code3')
        selectText('code2')
        document.execCommand("copy");
        $('.text-copy').fadeIn(400)
        setTimeout(function() {
            $('.text-copy').fadeOut()
        }, 1500)

    })

    $('#copy-code4').on('click', function() {
        let copyText = $('#code4')
        selectText('code4')
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

    $('.customer__inline .color input').on('change input', function() {
        let colorVal = $(this).val()
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



    // стилизация виджета

    //цвет стрелок и кнопок
    let v1BtnColor1 = $('#v-1-btn-color-1'),
        v1ArrColor1 = $('#v-1-arr-color-1'),
        v1BtnColor2 = $('#v-1-btn-color-2'),
        v1ArrColor2 = $('#v-1-arr-color-2');

    let v1EditBtnColor1 = $('.v-1-edit-btn-color-1'),
        v1EditArrColor1 = $('.v-1-edit-arr-color-1'),
        v1EditBtnColor2 = $('.v-1-edit-btn-color-2'),
        v1EditArrColor2 = $('.v-1-edit-arr-color-2');

    let v1ugl = $('#v1ugl'),
        v1shadow = $('#v1shadow')

    function editVidget1() {
        v1EditBtnColor1.css('background', v1BtnColor1.val())
        v1EditArrColor1.css('fill', v1ArrColor1.val())
        v1EditBtnColor2.css('background', v1BtnColor2.val())
        v1EditArrColor2.css('fill', v1ArrColor2.val())

        if (v1ugl.is(':checked')) {
            $('#vidget1').addClass('ugli')
        } else {
            $('#vidget1').removeClass('ugli')
        }

        if (v1shadow.is(':checked')) {
            $('#vidget1').addClass('shadow')
        } else {
            $('#vidget1').removeClass('shadow')
        }
    }
    editVidget1()

    $('#v1 .customer__inline input').on('change input', function() {
        editVidget1()
    })
    $('#v1 .custom__checkbox input').on('change input', function() {
        editVidget1()
    })

    //цвет вид кнопки первого виджета
    let v1BtnText = $('#v1-btn-text'),
        v1BtnFontsize = $('#v1-btn-font-size'),
        v1BtnFon = $('#v1-btn-fon'),
        v1BtnColor = $('#v1-btn-color')

    let richbtn = $('#richbtn')

    function editVidget1Btn() {
        richbtn.css('font-size', v1BtnFontsize.val() + 'px')
        richbtn.css('background-color', v1BtnFon.val())
        richbtn.css('color', v1BtnColor.val())
        richbtn.text(v1BtnText.val())
    }
    editVidget1Btn()

    $('#v-custom-btn input').on('change', function() {
        editVidget1Btn()
    })
    $('#v-custom-btn .input-size span').on('click', function() {
        editVidget1Btn()
    })
    v1BtnText.on('keydown', function() {
        editVidget1Btn()
    })


    //второй виджет
    //цвет стрелок и кнопок
    let v2BtnColor1 = $('#v-2-btn-color-1'),
        v2ArrColor1 = $('#v-2-arr-color-1'),
        v2BtnColor2 = $('#v-2-btn-color-2'),
        v2ArrColor2 = $('#v-2-arr-color-2'),
        v2btnText = $('#v2-btn-text')

    let v2EditBtnColor1 = $('.v-2-edit-btn-color-1'),
        v2EditArrColor1 = $('.v-2-edit-arr-color-1'),
        v2EditBtnColor2 = $('.v-2-edit-btn-color-2'),
        v2EditArrColor2 = $('.v-2-edit-arr-color-2'),
        v2btnbotText = $('#v2-btn-bot-text')

    let v2ugl = $('#v2ugl'),
        v2shadow = $('#v2shadow')

    function editVidget2() {
        v2EditBtnColor1.css('background', v2BtnColor1.val())
        v2EditArrColor1.css('fill', v2ArrColor1.val())
        v2EditArrColor1.css('color', v2ArrColor1.val())
        v2EditBtnColor2.css('background', v2BtnColor2.val())
        v2EditArrColor2.css('fill', v2ArrColor2.val())

        v2btnbotText.text(v2btnText.val())

        if (v2ugl.is(':checked')) {
            $('#vidget2').addClass('ugli')
        } else {
            $('#vidget2').removeClass('ugli')
        }

        if (v2shadow.is(':checked')) {
            $('#vidget2').addClass('shadow')
        } else {
            $('#vidget2').removeClass('shadow')
        }
    }
    editVidget2()

    $('#v2 .customer__inline input').on('change input', function() {
        editVidget2()
    })

    $('#v2 .custom__checkbox input').on('change', function() {
        editVidget2()
    })

    v2btnText.on('keydown', function() {
        editVidget2()
    })

    //третий виджет
    //цвет стрелок и кнопок
    let v3BtnColor1 = $('#v-3-btn-color-1'),
        v3ArrColor1 = $('#v-3-arr-color-1'),
        v3BtnColor2 = $('#v-3-btn-color-2'),
        v3ArrColor2 = $('#v-3-arr-color-2'),
        v3btnText = $('#v3-btn-text')
    v3btnfontsize = $('#v3-btn-font-size')

    let v3EditBtnColor1 = $('.v-3-edit-btn-color-1'),
        v3EditArrColor1 = $('.v-3-edit-arr-color-1'),
        v3EditBtnColor2 = $('.v-3-edit-btn-color-2'),
        v3EditArrColor2 = $('.v-3-edit-arr-color-2'),
        v3EditText = $('#v3-edit-text')

    let v3ugl = $('#v3ugl'),
        v3shadow = $('#v3shadow')

    function editVidget3() {
        v3EditBtnColor1.css('background', v3BtnColor1.val())
        v3EditArrColor1.css('fill', v3ArrColor1.val())
        v3EditBtnColor2.css('background', v3BtnColor2.val())
        v3EditArrColor2.css('fill', v3ArrColor2.val())

        v3EditText.text(v3btnText.val())
        v3EditText.css('font-size', v3btnfontsize.val() + 'px')

        if (v3ugl.is(':checked')) {
            $('#vidget3').addClass('ugli')
        } else {
            $('#vidget3').removeClass('ugli')
        }

        if (v3shadow.is(':checked')) {
            $('#vidget3').addClass('shadow')
        } else {
            $('#vidget3').removeClass('shadow')
        }
    }
    editVidget3()

    $('#v3 .customer__inline input').on('change input', function() {
        editVidget3()
    })

    v3btnText.on('keydown', function() {
        editVidget3()
    })

    $('#v3 .custom__checkbox input').on('change', function() {
        editVidget3()
    })

    $('#v3 .input-size span').on('click', function() {
        editVidget3()
    })

    if ($('.datapicker').length) {
        $.fn.datepicker.language['ru'] = {
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            today: 'Сегодня',
            clear: 'Очистить',
            dateFormat: 'dd.mm.yyyy',
            timeFormat: 'hh:ii',
            firstDay: 1
        };
        $('.datapicker').datepicker();
    }

    $('.name-mark').on('click', function() {
        $('.name-mark').not(this).removeClass('active')
        $(this).toggleClass('active')
    })

})