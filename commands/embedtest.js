module.exports.run = async (bot, message, args, origin) => {  // Runs when command is called
	message.delete();
	let prompt = message.channel.send({
  "embed": {
    "title": "__**Unit Order**__",
    "color": 820073,
    "timestamp": "2019-01-28T22:35:09.139Z",
    "footer": {
      "text": "Automatic Order System"
    },
    "author": {
      "name": "buyer",
      "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "fields": [
      {
        "name": "Soldier - 40",
        "value": "$20000"
      },
      {
        "name": "Tank - 14",
        "value": "$560000"
      },
      {
        "name": "**__Total Cost__**",
        "value": "$580000"
      }
    ]
  }
})
		.then(async msg => {
			await msg.react('✅');
			await msg.react('❌');
		}).catch(()=>{});
		// .then(msg => msg.react('❌'));
	return 0;
}

module.exports.config = {  // Command info
	name: 'embedtest',
	usage: '$embedtest'

}
