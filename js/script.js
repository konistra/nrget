"use strict";

function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});
$(document).ready(function () {
  $(".form, .form__slider_point").on("change keyup input click", calc);

  function calc() {
    var num_shares = $("input[name='num_shares']").val() || 1,
        summ = $("input[name='summ']").val(),
        years = $(".form__slider_point").slider("value"),
        buy = $("input[name='buy']"),
        income = $("input[name='income']"),
        net_income = $("input[name='net_income']");
    +years < 3 ? $(buy).attr("disabled", true) : $(buy).attr("disabled", false);

    switch (+years) {
      case 1:
        years = 0.36;
        break;

      case 2:
        years = 1.08;
        break;

      case 3:
        buy.is(":checked") ? years = 2.5 : years = 1.8;
        break;

      case 4:
        buy.is(":checked") ? years = 3.5 : years = 2.8;
        break;

      case 5:
        buy.is(":checked") ? years = 4.5 : years = 3.8;
        break;

      default:
        alert("Ошибка");
    }

    var calc = +num_shares * +summ + +summ * +years;
    var calc2 = +num_shares * +summ + +summ * +years - +num_shares * +summ;
    income.val(calc.toFixed() + ' ₽');
    net_income.val(calc2.toFixed() + ' ₽');
  }

  $(".form__slider_point").slider({
    min: 1,
    max: 5,
    value: 1,
    range: "min",
    animate: "fast"
  });
  var opt = $(".form__slider_point").data().uiSlider.options,
      min = opt.min,
      raz = opt.max - min;

  for (var i = 0; i <= raz; i++) {
    $(".form__slider_point").append($("<b></b>").css("left", i / raz * 100 + "%"));
  }
});