const Discord = require('discord.js')
module.exports =(client, member) => {
    const channel = "1074497571805995008";
    if (!channel) return;
  
    const embed = new Discord.EmbedBuilder()
    .setColor("Red")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`💨 ${member} acabou de sair do servidor. :(`)
  
    console.log('saiu')
    member.guild.channels.cache.get(channel).send({ embeds: [embed], content: `${member}` })
}
