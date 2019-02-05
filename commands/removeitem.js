const fs = require("fs");
const eliapi = require("eliapi");

module.exports.run = async (bot, message, args) => { // Runs when command is called
	let shop = JSON.parse(fs.readFileSync('shop.json'));
	if (!message.member.permissions.has(`ADMINISTRATOR`)) return `Missing 'Administrator' permission`;
	args = [message.content.split(" ").slice(1).join(" ")]
	if (args[0].length < 2) return "Please provide a valid item name";
  // if (args.length != 1) return "Invalid command usage";
  // if (!shop[args[0]]) return "Item does not exist";
	let shoplist = Object.keys(shop);
	for (let i in shoplist) {
		if (shoplist[i].toLowerCase().startsWith(args[0])) {
			delete shop[shoplist[i]];
			fs.writeFileSync("shop.json", JSON.stringify(shop, null, 2), "utf8", {
				if (err) {
					return eliapi.log(2, err);
				}
			});
			message.channel.send(`Item "${shoplist[i]}" removed from shop`);
			return 0;
		}
	}
	return 'Item not found';
}
module.exports.config = { // Command info
  name: 'removeitem',
  usage: '$removeitem [itemname]'
}
