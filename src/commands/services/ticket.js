const Discord = require("discord.js")

module.exports = {
  name: "ticket",
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
        .setColor("Grey")
        .setDescription(`Olá ${interaction.user}, o sistema foi adicionado em ${canal} com sucesso.`);

        let emebedTickets = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true}) })
        .setDescription(`> Clique no botão abaixo para abrir um ticket!`);

        let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("tickets_basico")
            .setEmoji("🎫")
            .setStyle(Discord.ButtonStyle.Primary)
        );

        interaction.reply({ embeds: [embedEphemeral], ephemeral: true }).then( () => {
            canal.send({ embeds: [emebedTickets], components: [botao] })
        })
    }


    
  }
}