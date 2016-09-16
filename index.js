'use strict';

require('dotenv').config();

var Mildred = require('./lib/mildred-bot');

var mildredBot = new Mildred({
  token: process.env.SLACK_BOT_API_TOKEN,
  name: 'mildred' // user name not real name
});

mildredBot.run();
