const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv').config();

const command = require('./commands/command');
const logo = 'https://avatars0.githubusercontent.com/u/12706692?s=200&v=4';

client.on('ready', () => {

	command(client, 'embed', 'admin',(message) => {
		const content = JSON.parse(message.content.replace('$embed ', ''));
		const embed = new Discord.MessageEmbed()
		.setColor('#d50c15')
		.setTitle(message.channel.name)
		.setAuthor(message.author.username)
		.addFields(content)
		.setFooter('TheNewBoston', logo);

		message.channel.send(embed);
	});

	//test command
	command(client, ['help'], 'admin',(message) => {
			const helpEmbed = new Discord.MessageEmbed()
				.setColor('#d50c15')
				.setTitle('Help Menu')
				.setAuthor('TheNewBoston', logo, 'https://thenewboston.com/')
				.setThumbnail(logo)
				.addFields(
					{ name: 'Commands', value: '________' }
				)
				.addField('$clear', 'clears all messages in a channel', false)
				.addField('$clear [number]', 'clears all a certain amount of messages in a channel (should be less than 100)', false)
				.addField('$status [coding]', 'This sets the bots status to the specified text', false)
				.addField('$embed [{"name":"name", "value": "value"}]', 'This creates a embed, you can seperate fields with a comma(,)', false)
				.addField('$ban [@member]', 'This bans the member mentioned in the command', false)
				.addField('$kick [@member]', 'This kicks the member mentioned in the command', false)
				.addField('\u200B', '\u200B')
				.setTimestamp()
				.setFooter('TheNewBoston', logo);

			message.channel.send(helpEmbed);
		
	});

	//clears all messages or a specified amount in a channel
	command(client, 'clear', 'admin',(message) => {
			const content = message.content.replace('$clear ', '');
			if(Number.isInteger(parseInt(content))){
				message.channel.messages.fetch({limit: parseInt(content)+1}).then(results => {
					message.channel.bulkDelete(results);
				}).catch(console.error());
			}else{
				message.channel.messages.fetch().then(results => {
					message.channel.bulkDelete(results);
				}).catch(console.error());
			}
	});

	//Sets the bots status
	command(client, 'status', 'admin',(message) => {
			const content = message.content.replace('$status ', '');
			client.user.setPresence(
				{
					activity: {
						name: content,
						type: 0
					}
				}
			);
	});

	//bans members
    command(client, 'ban', 'mods', (message) => {
        var member = message.mentions.members.first();
        // ban
        member.ban().then((member) => {
            // Successmessage
            message.channel.send(":wave: " + member.displayName + " has been successfully banned https://tenor.com/view/bye-forever-leave-me-alone-gif-9357584 :point_right: ");
        }).catch(() => {
            // Failmessage
            message.channel.send("Access Denied");
        });
    });

    //bans members
    command(client, 'kick', 'mods', (message) => {
        // Easy way to get member object though mentions.
        var member = message.mentions.members.first();
        // ban
        member.kick().then((member) => {
            // Successmessage
            message.channel.send(":wave: " + member.displayName + " has been successfully kicked https://tenor.com/view/angry-birds-movie-kick-gif-5231324 :point_right: ");
        }).catch(() => {
            // Failmessage
            message.channel.send("Access Denied");
        });
    });
});

client.login(dotenv.parsed.TOKEN);