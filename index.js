const express = require('express')
const { Telegraf, Markup } = require('telegraf');
const fetch = require('node-fetch');

const app = express()

const APP_PORT = 3000
const { BOT_TOKEN } = process.env
const apiUrl = process.env.API_URL
const CURRENT_HOST = 'https://pusher-vercel.vercel.app'

const bot = new Telegraf(BOT_TOKEN, {
  telegram: {
    webhookReply: false
  }
})

bot.command('start', (ctx) => {
    ctx.deleteMessage()
    ctx.reply('<b>Get livescore</b> type <i>/livescore</i>\n<b>Get Stream(m3u8)</b> type <i>/stream</i>\n<b>Get rtmp(with vlc)</b> type <i>/rtmp</i>', {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
            Markup.button.callback('Livescore', 'Livescore'),
            Markup.button.callback('Stream', 'stream'),
            Markup.button.callback('RTMP', 'rtmp')
        ])
    })
});

bot.action('Livescore', (ctx) => {
    ctx.reply("livescore")
});
bot.command('Livescore', (ctx) => {
    ctx.reply("livescore")
})
/*
//livescore
bot.action('Livescore', async(ctx) => {
    const jsonStr = await (await fetch(`${apiUrl}/livescore`)).json();
    jsonStr.list.forEach((ele) => {
        let matches = `${ele.home_team} ${ele.home_score} - ${ele.away_score} ${ele.away_team}`;
        ctx.reply(matches, {
            ...Markup.inlineKeyboard([
                Markup.button.callback(" Status ", `details_${ele.match_id}`),
                Markup.button.callback(" Line-up ", "lineup")
            ])
        })
    })
})
bot.command('livescore', async(ctx) => {
    const jsonStr = await (await fetch(`${apiUrl}/livescore`)).json();
    jsonStr.list.forEach((ele) => {
        let matches = `${ele.home_team} ${ele.home_score} - ${ele.away_score} ${ele.away_team}`;
        ctx.reply(matches, {
            ...Markup.inlineKeyboard([
                Markup.button.callback(" Status ", `details_${ele.match_id}`),
                Markup.button.callback(" Line-up ", "lineup")
            ])
        })
    })

})
bot.action(/details_+/, (ctx) => {
    console.log(ctx.match.input);
    ctx.deleteMessage();
    let id = ctx.match.input.split('_')[1]
    ctx.reply('this feature will sonn..  ' + id)
})

//stream
bot.action('stream', async(ctx) => {
    const jsonStr = await (await fetch(`${apiUrl}/stream`)).json();
    jsonStr.forEach((ele) => {
        let matches = `${ele.home_team} ${ele.home_score} - ${ele.away_score} ${ele.away_team}`;
        ctx.reply(
            matches,
            Markup.inlineKeyboard([
                [Markup.button.url(" Stream Link ", ele.live_url[0].url)]
            ])
        )
    })
})

bot.command('stream', async(ctx) => {
    const jsonStr = await (await fetch(`${apiUrl}/stream`)).json();
    jsonStr.forEach((ele) => {
        let matches = `${ele.home_team} ${ele.home_score} - ${ele.away_score} ${ele.away_team}`;
        ctx.reply(
            matches,
            Markup.inlineKeyboard([
                [Markup.button.url(" Stream Link ", ele.live_url[0].url)]
            ])
        )
    })
})

//rtmp
bot.action('rtmp', async(ctx) => {
    const jsonStr = await (await fetch(`${apiUrl}/bobotv`)).json();
    const lists = jsonStr.lives;
    lists.forEach((ele) => {
        let matches = `${ele.home_team_name} ${ele.match.home_score} - ${ele.match.away_score} ${ele.away_team_name}\n<code> ${ele.rtmp_url} </code>`;

        ctx.reply(matches, { parse_mode: 'HTML' })
    })
})

bot.command('rtmp', async(ctx) => {
    const jsonStr = await (await fetch(`${apiUrl}/bobotv`)).json();
    const lists = jsonStr.lives;
    lists.forEach((ele) => {
        let matches = `${ele.home_team_name} ${ele.match.home_score} - ${ele.match.away_score} ${ele.away_team_name}\n<code> ${ele.rtmp_url} </code>`;

        ctx.reply(matches, { parse_mode: 'HTML' })
    })
})

*/
app.use(bot.webhookCallback('/callback'))

app.get('/', async (_req, res) => {
  const url = `${CURRENT_HOST}/callback`
  await bot.telegram.setWebhook(url)
  res.send(`listening on ${CURRENT_HOST}`)
})

app.listen(APP_PORT, () => {
  console.log(`listening on ${APP_PORT}`)
})
