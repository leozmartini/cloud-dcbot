const { ActivityType  } = require('discord.js');

module.exports = (client) => {
    client.user.setActivity({
      name: "Hello world",
      type: ActivityType.Streaming,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    })
    console.log(`🤖✅ ${client.user.tag} esta online.`);
};
