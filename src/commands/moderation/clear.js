const Discord = require("discord.js")

module.exports = {
    name: "clear", // Coloque o nome do comando
    description: "Limpe o canal de texto", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'quantidade',
            description: 'Número de mensagens para serem apagadas.',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        }
    ],

    callback: async (client, interaction) => {

        let numero = interaction.options.getNumber('quantidade')

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {

            if (parseInt(numero) > 99 || parseInt(numero) <= 0) {

                let embed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setDescription(`\`/clear [1 - 99]\``);

                interaction.reply({ embeds: [embed] })

            } else {

                let embed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setDescription(`O canal de texo ${interaction.channel} teve \`${numero}\` mensagens deletadas por \`${interaction.user.username}\`.`);

                interaction.channel.bulkDelete(parseInt(numero))
                .then(() => {
                    interaction.reply({ embeds: [embed] })
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 5000)
                })
                .catch((error) => {
                    interaction.reply({ content:`Ocorreu um problema ao tentar apagar as mensagens: ${error}`, ephemeral: true})
                })
            }

            }

    }

}