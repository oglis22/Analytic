const Chart = require('chart.js');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3005
const loginRouter = require('./login');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const discordBot = require('./discord');


discordBot.startBot();

console.log("Server is starting...")
express()
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use('/', loginRouter)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

console.log("Server is runnung 🛸")



