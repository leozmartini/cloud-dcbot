const Discord = require("discord.js")
module.exports =(client, interaction) => {
    if (interaction.isButton()) {
      if (interaction.customId === "ticket_bronze") {
        let nome_canal = `🔖-${interaction.user.id}`;
        let canal = interaction.guild.channels.cache.find(c => c.name === nome_canal);
  
        if (canal) {
          interaction.reply({ content: `Olá **${interaction.user.username}**, você já possui um ticket em ${canal}.`, ephemeral: true})
        } else {
          const ticketRole = "1071982953032323122" // caso precisar um cargo específico para equipe de resposta
          let categoria = interaction.channel.parent;
          if (!categoria) categoria = null;
  
          interaction.guild.channels.create({
  
            name: 'VIP BRONZE',
            parent: categoria,
            type: Discord.ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [ Discord.PermissionFlagsBits.ViewChannel ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.AddReactions,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks
                ]
              },
            ]
  
          }).then( (chat) => {
  
            interaction.reply({ content: `Olá **${interaction.user.username}**, seu ticket foi aberto em ${chat}.`, ephemeral: true })
  
            let embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setDescription(`Olá ${interaction.user}, você abriu o seu ticket.\nAguarde um momento para ser atendido.`);
  
            let botao_close = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
              .setCustomId("close_bronze")
              .setEmoji("🔒")
              .setStyle(Discord.ButtonStyle.Danger)
            );
  
            chat.send({ embeds: [embed], components: [botao_close] }).then(m => {
              m.pin()
            })
  
          })
        }
      } else if (interaction.customId === "close_bronze") {
        interaction.reply(`Olá ${interaction.user}, este ticket será excluído em 5 segundos.`)
        try {
          setTimeout( () => {
            interaction.channel.delete().catch( e => { return; } )
          }, 5000)
        } catch (e) {
          return;
        }
        
      }
    }
}