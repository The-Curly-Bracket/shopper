module.exports.run = async (bot, message, args, origin, shop) => { // Runs when command is called
  let products = Object.keys(shop).join("\n");
  let prices = Object.values(shop).join("\n");
  message.channel.send({
    "embed": {
      "url": "https://discordapp.com",
      "color": 7764732,
      "timestamp": "2019-01-30T01:24:35.144Z",
      "footer": {
        "text": "The Curly Bracket",
        "icon_url": "https://avatars3.githubusercontent.com/u/46971424?s=200&v=4"
      },
      "author": {
        "name": `${message.author.username}`,
        "icon_url": `${message.author.avatarURL}`
      },
      "timestamp": `${new Date()}`,
      "fields": [{
          "name": "Product",
          "value": `${products}`,
          "inline": true
        },
        {
          "name": "Price",
          "value": `${prices}`,
          "inline": true
        }
      ]
    }
  });
  return 0; // nonzero value is returned in reply
}

module.exports.config = { // Command info
  name: 'list',
  usage: '$list'
}
