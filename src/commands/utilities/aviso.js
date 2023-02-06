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
  name: "aviso",
  description: "Envie um aviso",
  devOnly: false,
  options: [
    {
      name: "titulo",
      description: "canal que deseja enviar",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "descricao",
      description: "mensagem que quer enviar (precisa sem em json)",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "imagem",
      description: "mensagem que quer enviar (precisa sem em json)",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],

  callback: async (client, interaction) => {
    if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
      interaction.reply({ content: `Você não possui permissão para usar este comando!`, ephemeral: true})
      return;
    }

    const channel = client.channels.cache.get('1071177291129954384') // Canal avisos do code community.
    const title = interaction.options.get("titulo").value;
    const desc = interaction.options.get("descricao").value;
    const img = interaction.options.get("imagem")?.value || "https://www.shuttrstock.com/image-vector/vector-line-icon-img-260nw-2050481222.jpg"; // img vazia

    const avatarBot = client.user.displayAvatarURL({ dynamic: true });
    const author = interaction.user.tag;
    const authorIcon = interaction.user.avatarURL({ dynamic: true });

    const embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: "🚨 NOVO AVISO!",
        iconURL: avatarBot,
      })
      .setColor("BLACK")
      .setTitle(title)
      .setDescription(desc)
      .setThumbnail(img)
      .setFooter({
        text: author,
        iconURL: authorIcon,
      })
      .setTimestamp(new Date());

      channel.send({ embeds: [embed], content: '@here' })
      .then( () => {
        interaction.reply({ content:`✅ Aviso enviada com sucesso! \n${channel}`, ephemeral: true})
      })
      .catch((error) => {
        interaction.reply({ content:`Ocorreu um problema ao enviar a mensagem: ${error}`, ephemeral: true})
      })
  }
}
