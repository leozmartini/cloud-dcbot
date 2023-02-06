module.exports = (client, message) => {
    if(message.mentions.users.has(client.user.id)) {
        message.reply('Olá! uso slash commands\nPara usar meus comandos use ``/``');
    }
}