import { config } from 'dotenv'
import { Client, GatewayIntentBits } from 'discord.js'
const express = require('express')
config()

const server = express()

server.get('/webhook', (req, res) => {
  res.send(200)
})

server.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})

if (!process.env.BOT_TOKEN) {
  throw new Error('Undefined BOT_TOKEN')
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('messageCreate', async (message) => {
  if (!message.author.bot) {
    message.channel.send('coucou')
  }
})

client.login(process.env.BOT_TOKEN)
