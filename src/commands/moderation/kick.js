const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require('discord.js');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  
  name: 'kick',
  description: 'Kickar membro do servidor.',
  options: [
    {
      name: 'target-user',
      description: 'Usuário que deseja kickar.',
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: 'reason',
      description: 'Motivo do kick.',
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.KickMembers],
  botPermissions: [PermissionFlagsBits.KickMembers],

  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get('target-user').value;
    const reason =
      interaction.options.get('reason')?.value || 'Motivo não especificado.';

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
      await interaction.editReply("Não encontrei esse usuário.");
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply(
        "Não é possível kickar o dono do servidor."
      );
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
    const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd
    const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "Eu não posso banir este usuário, pois ele tem um cargo igual/maior que o seu "
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "Eu não posso banir este usuário, pois ele tem um cargo igual/maior que o meu"
      );
      return;
    }

    // Kick the targetUser
    try {
      await targetUser.kick(reason);
      await interaction.editReply(
        `Usuário ${targetUser} foi kickado!\nMotivo: ${reason}`
      );
    } catch (error) {
      console.log(`Ocorreu um erro ao tentar kickar: ${error}`);
    }
  },
};
