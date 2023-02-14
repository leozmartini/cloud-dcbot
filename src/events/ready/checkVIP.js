const discord = require("discord.js");
const vipsDB = require("../../database/vip");

module.exports = (client) => {
  const guild = client.guilds.cache.get('1071981233787129916')
  const logChannel = client.channels.cache.get("1073394752109690970");

  // canal de log

  setInterval(async () => {
    const vipsDBs = await vipsDB.find();

    for (let i = 0; i < vipsDBs.length; i++) {
      async function removeVIP() {
        await vipsDB
          .deleteOne({ userID: vipsDBs[i].userID })
          .then(() => {
            const member = guild.members.cache.get(vipsDBs[i].userID);
            member.roles.remove(vipsDBs[i].VIPRoleID) 
            console.log(`VIP REMOVIDO - ${vipsDBs[i].userTAG} - ${vipsDBs[i].userID}`)
          })
          .catch((error) => {
            logChannel.send({
              content: `@here, ocorreu um problema ao tentar remover o VIP: ${error}`,
            });
          });
      }

      let dateNow = await new Date();

      if (dateNow > vipsDBs[i].Fim) {
        let embed = new discord.EmbedBuilder()
        .setColor("Red")
        .setTitle(`${vipsDBs[i].userTAG} - ${vipsDBs[i].VIP}`)
        .setDescription(
          `userID: ${vipsDBs[i].userID} \n VIPRoleID: ${vipsDBs[i].VIPRoleID}`
        )
        .addFields(
          { name: `Início:`, value: `${vipsDBs[i].Inicio}` },
          { name: `Fim:`, value: `${vipsDBs[i].Fim}` }
        );

        await removeVIP();

        logChannel.send({ content: `@here \n VIP REMOVIDO!`, embeds: [embed] });

      }
      let data = new Date();
      let dataFormatada = data.toLocaleString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
      console.log(`Verificação de VIP concluida. ${dataFormatada}`);
    }
  }, 3600000);
};
