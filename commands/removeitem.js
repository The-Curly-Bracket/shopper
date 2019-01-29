const fs = require("fs");
const eliapi = require("eliapi");

module.exports.run = async (bot, message, args, origin, shop) => { // Runs when command is called
  if (args.length != 1) return "Invalid command usage";
  if (!shop[args[0]]) return "Item does not exist";
  delete shop[args[0]];
  fs.writeFileSync("shop.json", JSON.stringify(shop, null, 2), "utf8", {
    if (err) {
      return eliapi.log(2, err);
    }
  });
  message.channel.send(`Item "${args[0]}" removed from shop`);
  return 0; // nonzero value is returned in reply
}

module.exports.config = { // Command info
  name: 'removeitem',
  usage: '$removeitem [itemname]'
}
