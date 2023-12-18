const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('points')
		.setDescription('Replies with number of points a user has'),
	 async execute(interaction) { 
		const key = `${interaction.user.id}`;
		await interaction.reply(`You currently have ${interaction.client.points.get(key, "points")} points, and are on level ${interaction.client.points.get(key, "level")}!`);
	},
};