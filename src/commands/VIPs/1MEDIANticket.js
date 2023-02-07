const Discord = require("discord.js")

module.exports = {
  name: "medianticket",
  description: "Ative o sistema de ticket no servidor.",
  devOnly: true,
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "canal",
        description: "Mencione um canal de texto.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: false,
    }
],

  callback: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply(`Olá ${interaction.user}, você não possui permissão para utilizar este comando.`)
    } else {
        let canal = interaction.options.getChannel("canal");
        if (!canal) canal = interaction.channel;

        let embedEphemeral = new Discord.EmbedBuilder()
        .setColor("Green")
        .setDescription(`Olá ${interaction.user}, o sistema foi adicionado em ${canal} com sucesso.`);

        let emebedTickets = new Discord.EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: "VIP MEDIAN💣", iconURL: interaction.guild.iconURL({ dynamic: true}) })
        .setDescription(`> Clique no botão abaixo para adquirir seu VIP!`)
        .setThumbnail(`https://abs.twimg.com/emoji/v2/72x72/1f4a3.png`)

        let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("ticket_median")
            .setEmoji("🎫")
            .setStyle(Discord.ButtonStyle.Success)
        );

        interaction.reply({ embeds: [embedEphemeral], ephemeral: true }).then( () => {
            canal.send({ embeds: [emebedTickets], components: [botao] })
        })
    }


    
  }
}