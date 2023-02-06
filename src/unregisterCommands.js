require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { clientId, testServer } = require('../config.json');

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// p/ guild based commands
function delGuildCommands() {
rest
  .put(Routes.applicationGuildCommands(clientId, testServer), { body: [] })
  .then(() => console.log('Guild commands deletados.'))
  .catch(console.error);
}

if (testServer === "") {
  console.log('🆔 GuildCommands não foram apagados: testServer is not defined.')
} else {
  delGuildCommands()
}

// p/ global commands
rest
  .put(Routes.applicationCommands(clientId), { body: [] })
  .then(() => console.log('Global commands deletados.'))
  .catch(console.error);