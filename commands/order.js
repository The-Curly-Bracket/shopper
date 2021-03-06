const Discord = require('discord.js');
const fs = require('fs');
const chrisId = '365986087157366785';
module.exports.run = async (bot, message, args) => { // Runs when command is called
	let shop = JSON.parse(fs.readFileSync('shop.json'));
	let addCommas = x => { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
	let order = {};
	let itemListener = async input => {
		if (input.author.username != message.author.username) return;
		let msg = input.content.toLowerCase();
		let cont = msg.split(" ");
		cont = (!isNaN(cont[cont.length-1]) && cont.length > 1)
			? [input.content.split(" ").slice(0, -1).join(" "), input.content.split(" ")[input.content.split(" ").length-1]]
			: [msg];
		switch (cont[0]) {
			case '$order':
				bot.off('message', itemListener);
				return;
				break;
			case 'cancel':
				message.channel.send('okay bye');
				bot.off('message', itemListener);
				return;
				break;
			case 'finish':
				let i = '';
				let prompt = await new Discord.RichEmbed({
					"title": "__**Unit Order**__",
					"author": {
						"name": `${message.author.username}`,
						"icon_url": `${message.author.avatarURL}`
					},
					"timestamp": `${new Date()}`,
					"footer": {
						"text": "The Curly Bracket",
						"icon_url": "https://avatars3.githubusercontent.com/u/46971424?s=200&v=4",
					}
				}).setColor('BLUE');
				let total = 0;
				for (let k in order) {
					await prompt.addField(`${order[k]} ${k}${(order[k] > 1) ? 's' : ''}`, `\$${addCommas(shop[k]*order[k])}`, false);
					total += shop[k]*order[k];
				}
				await prompt.addField(`__Total Cost__`, `**$${addCommas(total)}**`);
				let confirmation = reaction => {
					if (reaction.emoji == '✅') {
						msg.edit(prompt.setColor('GREEN').addField(`**Copy/paste command**`, `\`.pay @UnbelievaBoat#1046 ${total}\``, false));
						dm.edit(prompt);
						channelchecker.stop();
						dmchecker.stop()
					}
					else if (reaction.emoji == '❌') {
						msg.edit(prompt.setColor('RED'));
						dm.edit(prompt);
						channelchecker.stop();
						dmchecker.stop()
					}
				}
				let msg = await message.channel.send(prompt);
				let dm = await bot.users.get(chrisId).send(prompt);
				let channelchecker = new Discord.ReactionCollector(msg, reaction => reaction.users.some(usr => !usr.bot && message.guild.member(usr).hasPermission(`ADMINISTRATOR`)));
				let dmchecker = new Discord.ReactionCollector(dm, reaction => reaction.users.some(usr => !usr.bot));
				await msg.react('✅');
				await msg.react('❌');
				await dm.react('✅');
				await dm.react('❌');
				channelchecker.on('collect', reaction => confirmation(reaction));
				dmchecker.on('collect', reaction => confirmation(reaction));
				bot.off('message', itemListener);
				return;
				break;
			default:
				let itemNo = cont.slice(-1);
				itemNo = isNaN(itemNo) ? 1 : parseInt(itemNo);
				if (itemNo < 1) return;
				let shoplist = Object.keys(shop);
				for (let j in shoplist) {
					if (shoplist[j].toLowerCase().startsWith(cont[0].toLowerCase())) {
						message.channel.send(`Ordering ${itemNo} ${shoplist[j]}${(itemNo > 1) ? 's!' : '!'}`);
						order[shoplist[j]] = isNaN(order[shoplist[j]]) ? itemNo : itemNo + order[shoplist[j]];
						break;
					}
				}
				break;
		}
	}
	await message.channel.send(`Type the name of the unit you wish to order, then the quantity! When you're done, type 'finish'. To cancel your order, type 'cancel'. \nFor more info please check pins.`);
	bot.on('message', itemListener);
  return 0; // nonzero value is returned in reply
}

module.exports.config = { // Command info
  name: 'order',
  usage: '$order'
}
