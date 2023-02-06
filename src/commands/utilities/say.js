const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

const Discord = require("discord.js");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  name: "say",
  description:
    "Envie uma mensagem em nome do BOT.",
  devOnly: false,
  options: [
    {
      name: "canal",
      description: "canal que deseja enviar",
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
    {
      name: "msg",
      description: "mensagem que quer enviar",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  permissionsRequired: [
    PermissionFlagsBits.ManageChannels,
    PermissionFlagsBits.ManageMessages,
  ],
  botPermissions: [
    PermissionFlagsBits.ManageChannels,
    PermissionFlagsBits.ManageMessages,
  ],

  callback: async (client, interaction) => {
    const channel = interaction.options.getChannel("canal");
    const msg = interaction.options.get("msg").value;

    channel.send(msg)
    .then(() => interaction.reply({ content:`✅Mensagem enviada com sucesso em ${channel}`, ephemeral: true} ))
    .catch((error) => interaction.reply({ content:`❌Erro ao enviar mensagem: ${error}`, ephemeral: true} ))
}
}