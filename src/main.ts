import { config } from 'dotenv'
import { Client, GatewayIntentBits } from 'discord.js'
import * as process from 'process'
const express = require('express')
const fs = require('fs')

config({ path: `.env`, override: true })
config({ path: `.env.local`, override: true })

const server = express()

server.get('/webhook', (req, res) => {
  res.send(200)
})

server.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})

if (!process.env.BOT_TOKEN) {
  // Get the current directory
  const currentDirectory = process.cwd()

  // Read the files in the current directory
  fs.readdir(currentDirectory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err)
      return
    }

    console.log('Files in the current directory:')
    files.forEach((file) => {
      console.log(file)
    })
  })
  console.log(process.env)
  throw new Error(`Undefined BOT_TOKEN`)
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
