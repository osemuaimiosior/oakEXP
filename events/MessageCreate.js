const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	execute(message) {
    if (message.user.bot) return;
        if (message.guild) {
            const key = `${message.user.id}`;
            interaction.client.points.ensure(`${message.user.id}`, {
              user: message.user.id,
              guild: message.guild.id,
              points: 0,
              level: 1
            });
            interaction.client.points.math(key, "+", 2, "points");

                // Calculate the user's current level
            const curLevel = Math.floor(0.1 * Math.sqrt(interaction.client.points.get(key, "points")));

            // Act upon level up by sending a message and updating the user's level in enmap.
            if (interaction.client.points.get(key, "level") < curLevel) {
            interaction.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
            interaction.client.points.set(key, curLevel, "level");
            }
        }
    }
}

