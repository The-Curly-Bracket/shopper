module.exports.run = async (bot, message, args, origin, shop) => { // Runs when command is called
  message.channel.send(`Type the name of the unit you wish to order, then the quantity!`);
	message.channel.awaitMessages(msg => {

	});
  return 0; // nonzero value is returned in reply
}

module.exports.config = { // Command info
  name: 'order',
  usage: '$order'
}
