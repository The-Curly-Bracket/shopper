module.exports.run = async (bot, message, args, origin) => {  // Runs when command is called
	message.channel.send(`ur dum`);
	return 0;
}

module.exports.config = {  // Command info
	name: 'order',
	usage: '$order'

}
