const discord = require('discord.js');
const vipsDB = require('../../database/vip');

module.exports = {
    /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  name: "getvips",
  description: "Lista as VIPs ativos do DB",
  devOnly: false,

    callback: async (client, interaction) => {
        const channel = interaction.channel
        try {
            const vipsDBs = await vipsDB.find();
            for (let i = 0; i < vipsDBs.length; i++) {
                let embed = new discord.EmbedBuilder()
                .setColor('Green')
                .setTitle(`${vipsDBs[i].userTAG} - ${vipsDBs[i].VIP}`)
                .setDescription(`userID: ${vipsDBs[i].userID} \n VIPRoleID: ${vipsDBs[i].VIPRoleID}`)
                .addFields(
                    { name: `Início:`, value: `${vipsDBs[i].Inicio}`},
                    { name: `Fim:`, value: `${vipsDBs[i].Fim}`},
                    )



                channel.send({content: `<@${vipsDBs[i].userID}>`, embeds: [embed]})
            }

            interaction.reply({content: `Lista de VIPs exibida com sucesso!`, ephemeral: true})
            
        } catch (err) {
            console.error(err);
        }
    }
}