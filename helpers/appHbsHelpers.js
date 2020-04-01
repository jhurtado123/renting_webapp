const path = require('path');


module.exports = function (hbs) {
//register partials
  hbs.registerHelper('ifEq', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });
  hbs.registerHelper("formatDate", function (datetime) {
    return `${datetime.getUTCDate()}/${datetime.getUTCMonth() + 1}/${datetime.getFullYear()}`;
  });
  hbs.registerHelper("formatHours", function (datetime) {

    return `${datetime.getUTCHours()}:${datetime.getMinutes()<10?'0' + datetime.getMinutes(): datetime.getMinutes()}`;
  });
  hbs.registerHelper('switch', function (value, options) {
    this.switch_value = value;
    return options.fn(this);
  });
  hbs.registerHelper('case', function (value, options) {
    if (value == this.switch_value) {
      return options.fn(this);
    }
  });
  hbs.registerHelper('ifIn', function (elem, list, options) {
    if (list.indexOf(elem + '') !== -1) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  hbs.registerHelper("getUnreadedNotifications", function (notifications) {
    let count = 0;
    notifications.forEach(notification => {
      if (!notification.isReaded) count++;
    });
    return count;
  });
  hbs.registerHelper("fairPricePercent", function (fairPrice, price) {
    if (!fairPrice || !price) return;
    let percentDifference, result;
    if (fairPrice > price) {
      percentDifference = -(Math.round(((price - fairPrice) / price * 100)));
    } else {
      percentDifference = Math.round(((price - fairPrice) / price * 100));
    }
    if (fairPrice < price && percentDifference >= 5) {
      result = `<div class="fairPrice expensive"><i class="fa fa-arrow-up"></i>El piso es un ${percentDifference}% mas caro de lo recomendado</div>`;
    } else if (fairPrice > price && percentDifference >= 5) {
      result = `<div class="fairPrice cheap"><i class="fa fa-arrow-down"></i>El piso es un ${percentDifference}% más barato de lo recomendado</div>`;
    } else {
      result = `<div class="fairPrice ok">El precio del piso está dentro la cantidad recomendada</div>`;
    }
    return result;
  });
}