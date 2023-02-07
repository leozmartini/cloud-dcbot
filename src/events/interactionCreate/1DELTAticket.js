const Discord = require("discord.js");
module.exports = (client, interaction) => {
  const cliente = interaction.user.id;
  if (interaction.isButton()) {
    if (interaction.customId === "ticket_delta") {
      const nome_canal = `🔰${interaction.user.tag}`;
      let canal = interaction.guild.channels.cache.find(
        (c) => c.name === nome_canal
      );
      if (canal) {
        interaction.reply({
          content: `Olá **${interaction.user.username}**, você já possui um ticket em ${canal}.`,
          ephemeral: true,
        });
      } else {
        const ticketRole = "1071982953032323122"; // caso precisar um cargo específico para equipe de resposta
        let categoria = interaction.channel.parent;
        if (!categoria) categoria = null;

        interaction.guild.channels
          .create({
            name: nome_canal,
            parent: categoria,
            type: Discord.ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [Discord.PermissionFlagsBits.ViewChannel],
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.AddReactions,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks,
                ],
              },
            ],
          })
          .then((chat) => {
            interaction.reply({
              content: `Olá **${interaction.user.username}**, seu ticket foi aberto em ${chat}.`,
              ephemeral: true,
            });

            let embedCreate = new Discord.EmbedBuilder()
              .setColor("Green")
              .setDescription(
                `Olá ${interaction.user}, você abriu o seu ticket.\nAguarde um momento para ser atendido.`
              );

            const embedPay = new Discord.EmbedBuilder()
              .setColor("Green")
              .setTitle(`💸PAGAMENTO`)
              .setDescription(
                `Para proceder sua compra, você deve realizar o pagamento (R$ PRICE), aceitamos os seguintes métodos \n
              PIX: {}
              PayPal: {}
              MercadoPago(boleto, pix, cartão): {}

              APÓS O PAGAMENTO, ENVIE O COMPROVANTE NESTE CHAT.
              Assim que for verificada a compra, iremos ativar seu VIP e notificá-lo.
              `
              );

            let botao_close = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setCustomId("close_delta")
                .setEmoji("🔒")
                .setStyle(Discord.ButtonStyle.Danger)
            );

            chat
              .send({ embeds: [embedCreate], components: [botao_close] })
              .then((m) => {
                m.pin();
              });

            chat.send({ content: "@here", embeds: [embedPay] });
          });
      }
    } else if (interaction.customId === "close_delta") {
      const canal = interaction.channel;
      canal.permissionOverwrites
        .edit(cliente, { ViewChannel: false, SendMessages: false })
        .then(() => {
          interaction.reply(`Ticket encerrado.`);
        })
        .then(() => {
          setTimeout(() => {
            canal.send(`@here`);
          }, 5000);
        });
    }
  }
};
