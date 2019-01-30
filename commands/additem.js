const fs = require("fs");
const eliapi = require("eliapi");

module.exports.run = async (bot, message, args, origin, shop) => { // Runs when command is called
	if (!message.member.permissions.has(`ADMINISTRATOR`)) return `Missing 'Administrator' permission`;
  args = [message.content.split(" ").slice(1).slice(0, -1).join(" "), message.content.split(" ")[message.content.split(" ").length-1]]
  if (args.length != 2) return "Invalid command usage";
  if (args[0] == "finish") return "You cannot name a product \"finish\"";
  if (parseInt(args[1]) < 0) return "Cost must be positive";
  if (Number.isInteger(parseInt(args[0]))) return "Cost must be a whole number";
  shop[args[0]] = parseInt(args[1]);
  fs.writeFileSync("shop.json", JSON.stringify(shop, null, 2), "utf8", {
    if (err) {
      return eliapi.log(2, err);
    }
  });
  message.channel.send(`Item "${args[0]}" with price "${parseInt(args[1])}" added to shop`);
  return 0; // nonzero value is returned in reply
}

module.exports.config = { // Command info
  name: 'additem',
  usage: '$additem [itemname] [cost]'
}
