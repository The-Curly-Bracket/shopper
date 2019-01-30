const Discord = require('discord.js')
module.exports.run = async (bot, message, args, origin, shop) => { // Runs when command is called
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
				message.channel.send('finished order');
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
				});
				let total = 0;
				for (let k in order) {
					await prompt.addField(`${order[k]} ${k}s`, `\$${shop[k]*order[k]}`, false);
					total += shop[k]*order[k];
				}
				await prompt.addField(`__Total Cost__`, `**$${total}**`);
				await message.channel.send(prompt)
					.then(async msg => {
						await msg.react('✅');
						await msg.react('❌');
					});
				bot.off('message', itemListener);
				return;
				break;
			default:
				let itemNo = cont.slice(-1);
				itemNo = isNaN(itemNo) ? 1 : parseInt(itemNo);
				if (shop[cont[0]]) {
					message.channel.send(`Ordering ${itemNo} ${cont[0]}s!`);
					order[cont[0]] = isNaN(order[cont[0]]) ? itemNo : itemNo + order[cont[0]];
				}
				break;
		}
	}
	await message.channel.send(`Type the name of the unit you wish to order, then the quantity!`);
	bot.on('message', itemListener);
  return 0; // nonzero value is returned in reply
}

module.exports.config = { // Command info
  name: 'order',
  usage: '$order'
}
