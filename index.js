const mineflayer = require('mineflayer')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals
const bot = mineflayer.createBot({ username: 'Player' })

bot.loadPlugin(pathfinder)

bot.once('spawn', () => {

  const mcData = require('minecraft-data')(bot.version)

  const defaultMove = new Movements(bot, mcData)
  
  bot.on('chat', function(username, message) {
  
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