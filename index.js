const express = require('express')
const Telegraf = require('telegraf')

const app = express()

const APP_PORT = 3000
const { BOT_TOKEN } = process.env
const CURRENT_HOST = ''

const bot = new Telegraf(BOT_TOKEN, {
  telegram: {
    webhookReply: false
  }
})

bot.on('text', ctx => {
  return ctx.reply(
    `msg recebida de: ${ctx.message.from.username}`
  )
})

app.use(bot.webhookCallback('/callback'))

app.get('/', async (_req, res) => {
  const url = `${CURRENT_HOST}/callback`
  await bot.telegram.setWebhook(url)
  res.send(`listening on ${CURRENT_HOST}`)
})

app.listen(APP_PORT, () => {
  console.log(`listening on ${APP_PORT}`)
})
