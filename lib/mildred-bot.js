'use strict';
var util = require('util');
var SlackBot = require('slackbots');

var Mildred = function Constructor (settings) {
  this.settings = settings;
  this.settings.name = this.settings.name || 'mildred'
};

// Mildred inherits methods and properties from the SlackBot constructor
util.inherits(Mildred, SlackBot);

Mildred.prototype.run = function (argument) {
  Mildred.super_.call(this, this.settings);

  this.on('start', this._onStart);
  this.on('message', this._onMessage);
};

Mildred.prototype._onStart = function () {
  this._loadBotUser();
};

Mildred.prototype._loadBotUser = function () {
  var self = this;
  this.user = this.users.filter(function (user) {
    return user.name === self.name;
  })[0];
};

Mildred.prototype._isFromMildred = function (message) {
  return message.user === this.user.id;
};

Mildred.prototype._onMessage = function (message) {
  if (!this._isFromMildred(message)) {
    if (message.subtype === 'channel_join' && Boolean(message.subtype)) {
      this.postMessageToChannel('design',
        'Hi '+ message.user_profile.name +', would you like any beverage?\n:cocktail:, :beer:, :whisky: or :wine_glass: ?',
        {as_user: true}
      );
    }
  }

}

module.exports = Mildred;
