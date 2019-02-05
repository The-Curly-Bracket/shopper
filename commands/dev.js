const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {  // Runs when command is called
	if (message.author.username != 'AlexCheese') { return 0 };
	message.delete();
	switch (args[0]) {

		case 'serverinfo':
			if (args[1] == 'all')
				console.log(message.guild);
			else
				console.log(message.guild[args[1]]);
			break;
		case 'botinfo':
			message.channel.send(`
				Bot is in ${bot.guilds.size} servers
				Current server is '${message.guild.name}', id '${message.guild.id}'
				`)
					.then(msg => msg.delete(20000));
			break;


		case 'pininfo':
		let example = await new Discord.RichEmbed({
			"title": "__**Unit Order**__",
			"author": {
				"name": `${message.author.username}`,
				"icon_url": `${message.author.avatarURL}`
			},
			"timestamp": `${new Date()}`,
			"footer": {
				"text": "The Curly Bracket",
				"icon_url": "https://avatars3.githubusercontent.com/u/46971424?s=200&v=4",
			},
			"fields": [
				{
					"name": "40 stormtroopers",
					"value": "$400,000"
				},
				{
					"name": "100 tie/fo fighters",
					"value": "$50,000,000"
				},
				{
					"name": "__Total Cost__",
					"value": "**$50,400,000**"
				},
				{
					"name": "**Copy/paste command**",
					"value": "`.pay @UnbelievaBoat#1046 50400000`"
				}
			]
		}).setColor('BLUE');
		await message.channel.send("- To place an order, please use the '$order' command to initiate the system. Enter each unit in an individual message using this format: \nStormtrooper 20\n- Once you have entered all desired units, you may type 'finish'. An admin will need to confirm the order by clicking the checkmark under the order box, turning it green.\n- After your order is confirmed, you are required to enter the pay command shown on the box. Once this is done, your order will be complete and an admin will add your units to your military for you.\n- An example order box is shown below.");
		message.channel.send(example);
		break;
	}
	return 0;
}

module.exports.config = {  // Command info
	name: 'dev',
	usage: '$dev [command] (args)'

}
