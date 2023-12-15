const { Events } = require('discord.js');
const Enmap = require("enmap");

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        interaction.client.points = new Enmap("points");
        if (message.author.bot) return;
        if (message.guild) {
            const key = `${message.guild.id}-${message.author.id}`;
            interaction.client.points.ensure(`${message.guild.id}-${message.author.id}`, {
              user: message.author.id,
              guild: message.guild.id,
              points: 0,
              level: 1
            });
            interaction.client.points.math(key, "+", 2, "points");

                // Calculate the user's current level
            const curLevel = Math.floor(0.1 * Math.sqrt(interaction.client.points.get(key, "points")));

            // Act upon level up by sending a message and updating the user's level in enmap.
            if (interaction.client.points.get(key, "level") < curLevel) {
            message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
            interaction.client.points.set(key, curLevel, "level");
            }
        }
        if (message.content.indexOf(config.prefix) !== 0) return;
    }
}
