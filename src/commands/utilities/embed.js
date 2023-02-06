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
  name: "embed",
  description:
    "Use o bot pra enviar uma embed ( Necessário enviar em formato json)",
  devOnly: false,
  options: [
    {
      name: "canal",
      description: "canal que deseja enviar",
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
    {
      name: "json",
      description: "mensagem que quer enviar (precisa sem em json)",
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
    const msg = interaction.options.get("json").value;
    
    const date = new Date().toISOString();
    const author = interaction.user.tag
    const authorIcon = interaction.user.avatarURL({ dynamic: true })
    
    const authorJSON = {
      "name": author,
      "icon_url": authorIcon
    }

    function isJson(str) {
      try {
        JSON.parse(str);
      } catch (error) {
          return false;
      }
      return true;
    } 

    if (isJson(msg) == false) {
      interaction.reply({ content: "A mensagem que voce enviou não é um json válido.\n Voce pode criar válido um facilmente em https://zira.bot/embedbuilder/", ephemeral: true})
      return;
    } 

    const json = JSON.parse(msg); 
    // json["timestamp"] = date
    // json["author"] = authorJSON


      channel.send({embeds: [json] })
      .then( () => {
        interaction.reply({ content:`✅Mensagem enviada com sucesso em ${channel}`, ephemeral: true})
      })
      .catch((error) => {
        interaction.reply({ content:`Ocorreu um problema ao enviar a mensagem: ${error}`, ephemeral: true})
      })
  }
}