console.log(`🤖 Iniciando BOT...`)
require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const mongoose = require('mongoose')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

(async () => {
  try {
    console.log('💾🔱 Iniciando conexão com banco de dados.')
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URL, { keepAlive: true })
    console.log('💾✅ Conectado com banco de dados.')

    eventHandler(client);
  } catch (error) {
    console.log(`💾❌ Erro ao conectar com banco de dados: ${error}`)
  }
})()

client.login(process.env.TOKEN);