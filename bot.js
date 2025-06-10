const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`✅ Bot financiero activo como ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  try {
    await axios.post('https://brunolipo.app.n8n.cloud/webhook/discord-ingreso', {
      mensaje: message.content,
      usuario: message.author.username,
    });
    console.log('📤 Enviado a n8n:', message.content);
  } catch (err) {
    console.error('❌ Error al enviar a n8n:', err.message);
  }
});

client.login(process.env.MTM4MDAwNzk4MzkyODMxMTk5MQ.GlWjl6.sldL689iFW_qJTt69BMyiUuK7rCdYydIcFPxas);
