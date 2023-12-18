const { Events } = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

module.exports = {
	name: Events.MessageCreate,
	execute(message) {
    if (message.author.bot) return;
        if (message.guild) {
            const key = `${message.author.id}`;
            client.points.ensure(`${message.author.id}`, {
              user: message.author.id,
              guild: message.guild.id,
              points: 0,
              level: 1
            });
            client.points.math(key, "+", 0.1, "points");

                // Calculate the user's current level
            const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));

            // Act upon level up by sending a message and updating the user's level in enmap.
            if (client.points.get(key, "level") < curLevel) {
            message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
            client.points.set(key, curLevel, "level");
            }
        }
    }
}

