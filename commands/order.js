module.exports.run = async (bot, message, args, origin, shop) => { // Runs when command is called
	let order = {};
	let itemListener = input => {
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
				for (let j in order)
					i += `${order[j]} ${j}s: \$${shop[j]*order[j]}\n`;
				message.channel.send(i);
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
