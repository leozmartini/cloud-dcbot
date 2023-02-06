module.exports = {
  name: 'ping',
  description: 'Veja a latência do bot.',
  devOnly: false,

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(
      `Client ${ping}ms\nWS: ${client.ws.ping}ms`
    );
  },
};
