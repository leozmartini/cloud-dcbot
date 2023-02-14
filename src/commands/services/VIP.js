const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");
const vipsDB = require("../../database/vip");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  name: "vip",
  description: "Adicionar VIP ao usuário.",
  devOnly: true,
  options: [
    {
      name: "viprole",
      description: "VIP que deseja ativar.",
      type: ApplicationCommandOptionType.Role,
      required: true,
    },
    {
      name: "user",
      description: "Usuário para receber o VIP.",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "time",
      description: "Duração do VIP.(7d, 30d ou valor em MS.)",
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],

  callback: async (client, interaction) => {
    // Este comando irá ativar o VIP e registrar no DB apenas. Verificação e remoção será em ./events/ready

    const vipRole = interaction.options.getRole("viprole");
    const user = interaction.options.getUser("user");
    const member = interaction.options.getMember("user");
    let time = interaction.options?.getString("time") || 2592000000;
    let timeNumber = parseInt(time)

    const logChannel = interaction.guild.channels.cache.find(
        (c) => c.name === "🌠vip-log"
        // NOME DO CANAL.
    );
  

    try {
        const inicio = new Date()
        const fim = new Date(inicio.getTime() + timeNumber);
        
        await vipsDB.create({
            userTAG: user.tag,
            userID: user.id,
            VIP: vipRole.name,
            VIPRoleID: vipRole.id,
            Inicio: inicio,
            Fim: fim,
        });


        member.roles.add(vipRole.id).then(() => { interaction.reply({content: `✅ ${vipRole} Adicionado com sucesso para: ${user} por ${timeNumber / 1000 / 60 / 60 / 24} dias`, ephemeral: true }); })

    } catch (error) {
        interaction.reply({content: `❌ Não foi possível adicionar ${vipRole} para: ${user} \n ❌Erro: ${error}`, ephemeral: true});
    }
  },
};
