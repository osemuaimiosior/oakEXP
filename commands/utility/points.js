const { SlashCommandBuilder } = require('discord.js');
const {key} = require('../../events/message.js');
const Enmap = require("enmap");
  
module.exports = {
	data: new SlashCommandBuilder()
		.setName('points')
		.setDescription('Replies with number of points a user has'),
	 async execute(interaction) { 
		interaction.client.points = new Enmap("points");
		await interaction.reply(`You currently have ${interaction.client.points.get(key, "points")} points, and are level ${interaction.client.points.get(key, "level")}!`);
	},
};