const tokenFile = require('./token.json');
const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ]
});

const token = tokenFile.token;

const {
  setAllCount,
  setUserMessageCount,
  getUserMessageCount,
  getUserVCallJoins,
  setVCallJoins,
  updateMessageCount,
  updateUserCount,
  updateUserJoins,
  updateUserLeaves,
  getJoinValueAtIndex,
  getLeaveValueIndex
} = require('./datahandler');

function startBot() {

  console.log("Discord Bot is starting...");

  client.on('ready', () => {
    console.log(`Discord Bot logged in as: ${client.user.tag}!`);
    client.user.setActivity("🛸Analyzes the server..");
  });

  client.on('guildMemberAdd', async (member) => {

    const month = new Date().getMonth();
    let guild = await client.guilds.fetch(member.guild.id);
    updateUserCount(month, guild.memberCount);
    setAllCount(guild.memberCount);
    getJoinValueAtIndex(month)
    .then(value => {
      console.log('getJoinValueAtIndex returned:', value);
      return updateUserJoins(month, value + 1);
    })
    .then(() => console.log('Update successful'))
    .catch(console.error);

  });
  client.on('guildMemberRemove', async (member) => {
    const month = new Date().getMonth();
    let guild = await client.guilds.fetch(member.guild.id);
    updateUserCount(month, guild.memberCount);
    setAllCount(guild.memberCount);
    getLeaveValueIndex(month)
    .then(value => {
      console.log('getLeaveValueIndex returned:', value);
      return updateUserLeaves(month, value - 1);
    })
    .then(() => console.log('Update successful'))
    .catch(console.error);
  });
  client.on('messageCreate', (message) => {
    const month = new Date().getMonth();
    var msgc = getUserMessageCount();
    setUserMessageCount(msgc + 1);
    updateMessageCount(month, msgc + 1);
  });

  client.on('threadCreate', (thread) => {
    const x = getUserVCallJoins();
    setVCallJoins(x + 1);
  });

  if(client.login(token)) console.log("Bot succesfull logged in!");
  else console.log("Failed to login!");

}


module.exports = { startBot }