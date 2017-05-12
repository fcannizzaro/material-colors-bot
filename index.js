var TelegramBot = require('node-telegram-bot-api');
var material = require('material-colors');
var text2png = require('text2png');

var bot = new TelegramBot('<token>', {
  polling: true
});

delete material.darkText;
delete material.lightText;
delete material.darkIcons;
delete material.lightIcons;

var colors = Object.keys(material);

bot.onText(/\/colors/, (msg, match) => {
  bot.sendMessage(msg.chat.id, '<b>Colors</b>\n- ' + colors.join('\n- '), {
    parse_mode: 'Html'
  });
});

bot.onText(/(\w+)\s*((?:\w+)?)/i, async(msg, match) => {

  var primary = match[1].toLowerCase();
  var index = match[2].toLowerCase();
  var color = material[primary];

  if (!color) {
    return;
  }

  var textColor = '#fff';
  var textIndex = '';

  if (index) {

    color = color[index];

    if (index < 300) {
      textColor = '#424242';
    }

    textIndex = '(' + index.toUpperCase() + ')';

    if (!color) {
      return;
    }

  } else {
    textColor = '#424242';
  }

  var img = text2png(`${primary} ${textIndex}`, {
    textColor: textColor,
    output: 'buffer',
    padding: 120,
    font: '40px Consolas',
    bgColor: color
  });

  await bot.sendPhoto(msg.chat.id, img);
  await bot.sendMessage(msg.chat.id, color);

});
