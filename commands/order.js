module.exports.run = async (bot, message, args, origin, shop) => { // Runs when command is called
	let itemListener = input => {
		if (input.author.username != message.author.username) return;
		if (input.content.startsWith('$order')) bot.off('message', itemListener);
		let cont = input.content.split(" ")
		if (cont[0] == 'finish') {
			message.channel.send('okay bye');
			bot.off('message', itemListener);
		}
		if (shop[cont[0]]) {
			if (!cont[1]) cont[1] = 1;
			message.channel.send(`Ordering ${cont[1]} ${cont[0]}!`);
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
