const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('points')
		.setDescription('Replies with number of points a user has'),
	 async execute(interaction) { 
		const key = `${interaction.user.id}`;
		if(!interaction.client.points.get(key, "points")){
			interaction.reply('To start earing some points, send messages by engagaing in conversations with your peers.');
		} else {
			await interaction.reply(`You currently have ${interaction.client.points.get(key, "points")} points, and are on level ${interaction.client.points.get(key, "level")}!`);
		}	
	},
};