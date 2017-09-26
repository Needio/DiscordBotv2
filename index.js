/* eslint consistent-return:0 */
/* eslint prefer-const:0 */
const Discord = require('discord.js');

const config = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var servers = {};

client.on('message', (msg) => {
  if (msg.author.bot) return;

  const args = msg.content.split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    let modRole = msg.guild.roles.find('name', 'Bot Commander');
    if (msg.member.roles.has(modRole.id)) {
      msg.reply(`Pong! Latency is: ${Math.round(client.ping)}ms`);
      msg.channel.send('Pong...').then((message) => {
        message.edit(`Pong! Latency is ${message.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
      });
    } else msg.reply('Improper permssions!');
  }

  if (msg.content === 'doot doot doot') {
    msg.channel.send('please end my suffering');
  }

  if (msg.content === '361546916087201802') {
    msg.channel.send(':gaspras:');
  }

  if (command === 'speak') {
    let modRole = msg.guild.roles.find('name', 'Bot Commander');
    if (msg.member.hasPermission('MANAGE_MESSAGES') || msg.author.id !== config.ownerID || msg.member.roles.has(modRole.id)) {
      msg.channel.send(args.join(' '));
      msg.delete();
    } else return msg.reply('No permissions!');
  }
});

client.login(config.token);
