const Discord = require("discord.js")

module.exports = {
  name: "lock", // Coloque o nome do comando
  description: "Bloqueie um canal.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "canal",
        description: "Mencione um canal para o bloquear o chat.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    }
],

  callback: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        const canal = interaction.options.getChannel("canal")

        canal.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false }).then( () => {
            interaction.reply({ content: `🔒 O canal de texto ${canal} foi bloqueado!` })
            if (canal.id !== interaction.channel.id) return canal.send({ content: `🔒 Este canal foi bloqueado!` })
            setTimeout(() => {
                interaction.deleteReply()
            }, 5000)
        }).catch(e => {
            interaction.reply({ content: `❌ Ops, algo deu errado.` })
        })
    }
    
  }
}