module.exports.run = async (bot, message, args, origin, shop) => { // Runs when command is called
	let order = {};
	let itemListener = input => {
		if (input.author.username != message.author.username) return;
		let cont = input.content.split(" ");
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
				for (let j in order)
					console.log(`${order[j]} ${j}: \$${shop[j]*order[j]}`);
				bot.off('message', itemListener);
				return;
				break;
			default:
				let itemNo = cont.slice(-1);
				itemNo = isNaN(itemNo) ? 1 : parseInt(itemNo);
				if (shop[cont[0]]) {
					message.channel.send(`Ordering ${itemNo} ${cont[0]}!`);
					order[cont[0]] = isNaN(order[cont[0]]) ? itemNo : itemNo + order[cont[0]];
				}
				break;
		}
	}
	await message.channel.send(`Type the name of the unit you wish to order, then the quantity!`);
	bot.on('message', itemListener);
  return 'event test'; // nonzero value is returned in reply
}

module.exports.config = { // Command info
  name: 'order',
  usage: '$order'
}
