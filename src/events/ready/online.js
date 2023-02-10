const { ActivityType } = require("discord.js");

module.exports = (client) => {
  let status = [
    {
      name: "Não clique no link da live!",
      type: ActivityType.Streaming,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      name: "🔥Cloud 10x",
    },
    {
      name: "Melhor Servidor de Rust💉",
      type: ActivityType.Watching,
    },
    {
      name: "Venha jogar! IP",
      type: ActivityType.Listening,
    },
  ];

    setInterval(() => {
      let random = Math.floor(Math.random() * status.length);
      client.user.setActivity(status[random]);
    }, 10000);

  // client.user.setActivity({
  //   name: "Hello world",
  //   type: ActivityType.Streaming,
  //   url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  // })
  console.log(`🤖✅ ${client.user.tag} esta online.`);
};
