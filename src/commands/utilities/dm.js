const Discord = require("discord.js")

module.exports = {
    name: "dm", 
    description: "Envie uma mensagem no privado de um usuario",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuario",
            description: "selecione um usuario",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "mensagem",
            description: "escreva a mensagem",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,         
        }
    ],

    callback: async (client, interaction) => {

        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `Você não possui permissão para usar este comando!` })
        } else {
            let msg = interaction.options.getString("mensagem")
            let user = interaction.options.getUser("usuario")

            const embed = new Discord.EmbedBuilder()
            .setTitle('Mensagem;')
            .setColor("Random")
            .setDescription(`${msg}`)

            user.send({ embeds: [embed] })
            .then(() => {interaction.reply({ content: `Mensagem enviada com sucesso!`, ephemeral: true })})
            .catch (e => {
                interaction.reply({ content: `O usuario tem a dm fechada!`, ephemeral: true })
            })       
            
        }


    }
}