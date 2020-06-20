const express = require("express");
const http = require("http");

const app = express();

app.use(express.json());

app.get("/", (_, res) => res.send("hi"));
app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.herokuapp.com/`);
}, 224000);

// End of Glitch 24/7

const mineflayer = require('mineflayer')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals

const config = {
  host: "aqirito.aternos.me", //mc.hypixel.net for example
  port: 25565, //server port (leave it as is unless you know what you're doing!)
  username: "kongming", //username only for cracked/offline mode servers, email for premium
  version: false //version of the server (false = auto detect)
};

const bot = mineflayer.createBot({ //creates a new bot from the config above
  host: config.host, //im ported from config
  port: config.version, //imported from config
  username: config.username, //imported from config
  version: config.version //imported from config
});

console.log("Connecting..."); //logs "Connecting..." into the console


bot.loadPlugin(pathfinder)

bot.once('spawn', () => {

  const mcData = require('minecraft-data')(bot.version)

  const defaultMove = new Movements(bot, mcData)

  bot.on('chat', function (username, message) {

    if (username === bot.username) return

    const target = bot.players[username]?.entity
    if (message === 'come') {
      if (!target) {
        bot.chat('I don\'t see you !')
        return
      }
      const p = target.position

      bot.pathfinder.setMovements(defaultMove)
      bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1))
    }
  })
})

bot.on("error", err => console.log(err)); //triggers when there's an error and logs it into the console

bot.on("login", () => { //triggers when the bot joins the server
  console.log(bot.username + " is online"); //logs the username of the bot when the bot is online
});
bot.on("end", () => { //triggers when the bot leaves/gets kicked
  console.log("The bot disconnected, reconnecting..."); //says "The bot disconnected, reconnecting... in console
  process.exit(0);
});