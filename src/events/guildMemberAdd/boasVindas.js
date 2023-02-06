const Discord = require('discord.js')
module.exports =(client, member) => {
    const channel = "1071981293555945543";
    if (!channel) return;
  
    const embed = new Discord.EmbedBuilder()
    .setColor("Green")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle("👋 Seja bem vindo!")
    .setDescription(`> Olá ${member}!\nSeja Bem-Vindo(a) ao nosso servidor <3 \`${member.guild.name}\`!\nAtualmente estamos com \`${member.guild.memberCount}\` membros.`)
    .addFields(
        {
          name: 'Confira nossos pacotes de VIP',
          value: '<#1072239944044654662>',
          inline: true,
        },
        {
          name: 'Confira as datas de WIPE!',
          value: '<#1071981853071921193>', 
          inline: true,
        }
    );
  
    member.guild.channels.cache.get(channel).send({ embeds: [embed], content: `${member}` })
}
