/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ______     ______     ______   __  __     __     ______
 /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
 \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
 \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
 \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


 This is a sample Slack bot built with Botkit.

 This bot demonstrates many of the core features of Botkit:

 * Connect to Slack using the real time API
 * Receive messages based on "spoken" patterns
 * Reply to messages
 * Use the conversation system to ask questions
 * Use the built in storage system to store and retrieve information
 for a user.

 # RUN THE BOT:

 Get a Bot token from Slack:

 -> http://my.slack.com/services/new/bot

 Run your bot from the command line:

 token=<MY TOKEN> node slack_bot.js

 # USE THE BOT:

 Find your bot inside Slack to send it a direct message.

 Say: "Hello"

 The bot will reply "Hello!"

 Say: "who are you?"

 The bot will tell you its name, where it running, and for how long.

 Say: "Call me <nickname>"

 Tell the bot your nickname. Now you are friends.

 Say: "who am I?"

 The bot will tell you your nickname, if it knows one for you.

 Say: "shutdown"

 The bot will ask if you are sure, and then shut itself down.

 Make sure to invite your bot into other channels using /invite @<my bot>!

 # EXTEND THE BOT:

 Botkit has many features for building cool and useful bots!

 Read all about it here:

 -> http://howdy.ai/botkit

 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');
var importantDates = require('./importantDates.json');
var staringDate = new Date();
var os = require('os');

var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();


//Checking next events
function nextEvents(){
}

function(setTimeout(
    function(){
        //set current date 
        var now = new Date();

        //if new date and it's friday  check new events once again
        if(staringDate.getDay() != now.getDay() && now.getDay() === 5){ 
            nextEvents()
        }
        
},86400000);

controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function (bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    }, function (err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });


    controller.storage.users.get(message.user, function (err, user) {
        if (user && user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!');
        } else {
            bot.reply(message, 'Hello.');
        }
    });
});

controller.hears(['codigos de convivencia puntaje'], 'ambient', function (bot, message) {

    var messageReply = "No tengo el agrado de comunicarles que hay 3 personas en falta  " +
        "\n 1 - Martin Valdes de Leon -2" +
        "\n 2 - Samuel -1" +
        "\n 3 - Cristuli -1";

    controller.storage.users.get(message.user, function (err, user) {
        bot.reply(message, messageReply);
    });

});


controller.hears(['como se pronuncia git'], 'message_received', function(bot, message) {

    controller.storage.users.get(message.user, function (err, user) {
        bot.reply(message, 'Vo fuma! Y Pronuncialo como quieras');
    });
});


controller.hears(['nuevo codigo'], 'ambient', function (bot, message) {

    var messageReply = "Cualquier persona que se vaya durante un finde largo a una distancia > 100km, " +
        "deberá traer un presente para el equipo" +
        "\n :thumbsup: voto positivo" +
        "\n :thumbsdown: voto negativo" +
        "\n :notsure: abstencion";

    controller.storage.users.get(message.user, function (err, user) {
        bot.reply(message, messageReply);
    });

});


controller.hears(['codigos de convivencia'], 'direct_message,direct_mention,mention', function (bot, message) {

    var messageReply = "Para los nuevos integrantes, estos son los códigos de convivencia que se DEBEN respetar  " +
        "\n 1 - Toda persona que cumpla años deberá traer un presente para el equipo" +
        "\n 2 - Cualquier persona que se tome al menos un dia de vacaciones y viaje a una distancia > 100km, deberá traer presentes para el equipo" +
        "\n 3 - Toda persona que cumpla aniversario de ingreso, deberá traer un presente para el equipo" +
        "\n 4 - A la vuelta de Alemania se deberá traer un presente para el equipo" +
        "\n (presente = algo comestible/bebible) Cada vez que no se cumpla con los códigos se obtendrá un -1. Las penas serán discutidas " +
        "por el comité oficial encargado de proteger ";

    controller.storage.users.get(message.user, function (err, user) {
        bot.reply(message, messageReply);
    });

});

controller.hears(['caracteristicas de mar'], 'ambient', function (bot, message) {

    var messageReply = " a mar le gusta mucho el vino y spoilear series";

    controller.storage.users.get(message.user, function (err, user) {
        if (user && user.name) {
            bot.reply(message, 'Querid@ ' + user.name + messageReply);
        } else {
            bot.reply(message, messageReply);
        }
    });

});


controller.hears(['que onda con martin?'], 'direct_message,direct_mention,mention', function (bot, message) {

    var messageReply = "Martín Valdés de León es un claro ejemplo de como infligir los códigos. En lo posible mantéganse alejados de él.";

    controller.storage.users.get(message.user, function (err, user) {
        bot.reply(message, messageReply);
    });

});
controller.hears(['fifazo'], 'ambient', function (bot, message) {

    var messageReply = "Lista de semi-pros en Sovanta  " +
        "\n 1 - Cristuli @cristian_tempone";

    controller.storage.users.get(message.user, function (err, user) {
        bot.reply(message, messageReply);
    });

});

controller.hears(['mundial'], 'ambient', function (bot, message) {

    var messageReply = "Messi, hace un gol en el mundial amarguuuuu";

    controller.storage.users.get(message.user, function (err, user) {
        bot.reply(message, messageReply);
    });

});
controller.hears(['webmail'], 'direct_message,direct_mention,mention', function (bot, message) {

    var messageReply = "El webmail es: outlook.office365.com/owa/";

    controller.storage.users.get(message.user, function (err, user) {
        bot.reply(message, messageReply);
    });

});


controller.hears(['call me (.*)', 'my name is (.*)'], 'direct_message,direct_mention,mention', function (bot, message) {
    var name = message.match[1];
    controller.storage.users.get(message.user, function (err, user) {
        if (!user) {
            user = {
                id: message.user,
            };
        }
        user.name = name;
        controller.storage.users.save(user, function (err, id) {
            bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
        });
    });
});

controller.hears(['what is my name', 'who am i'], 'direct_message,direct_mention,mention', function (bot, message) {

    controller.storage.users.get(message.user, function (err, user) {
        if (user && user.name) {
            bot.reply(message, 'Your name is ' + user.name);
        } else {
            bot.startConversation(message, function (err, convo) {
                if (!err) {
                    convo.say('I do not know your name yet!');
                    convo.ask('What should I call you?', function (response, convo) {
                        convo.ask('You want me to call you `' + response.text + '`?', [
                            {
                                pattern: 'yes',
                                callback: function (response, convo) {
                                    // since no further messages are queued after this,
                                    // the conversation will end naturally with status == 'completed'
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'no',
                                callback: function (response, convo) {
                                    // stop the conversation. this will cause it to end with status == 'stopped'
                                    convo.stop();
                                }
                            },
                            {
                                default: true,
                                callback: function (response, convo) {
                                    convo.repeat();
                                    convo.next();
                                }
                            }
                        ]);

                        convo.next();

                    }, {'key': 'nickname'}); // store the results in a field called nickname

                    convo.on('end', function (convo) {
                        if (convo.status == 'completed') {
                            bot.reply(message, 'OK! I will update my dossier...');

                            controller.storage.users.get(message.user, function (err, user) {
                                if (!user) {
                                    user = {
                                        id: message.user,
                                    };
                                }
                                user.name = convo.extractResponse('nickname');
                                controller.storage.users.save(user, function (err, id) {
                                    bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
                                });
                            });


                        } else {
                            // this happens if the conversation ended prematurely for some reason
                            bot.reply(message, 'OK, nevermind!');
                        }
                    });
                }
            });
        }
    });
});


controller.hears(['shutdown'], 'direct_message,direct_mention,mention', function (bot, message) {

    bot.startConversation(message, function (err, convo) {

        convo.ask('Are you sure you want me to shutdown?', [
            {
                pattern: bot.utterances.yes,
                callback: function (response, convo) {
                    convo.say('Bye!');
                    convo.next();
                    setTimeout(function () {
                        process.exit();
                    }, 3000);
                }
            },
            {
                pattern: bot.utterances.no,
                default: true,
                callback: function (response, convo) {
                    convo.say('*Phew!*');
                    convo.next();
                }
            }
        ]);
    });
});


controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
    'direct_message,direct_mention,mention', function (bot, message) {

        var hostname = os.hostname();
        var uptime = formatUptime(process.uptime());

        bot.reply(message,
            ':robot_face: I am a bot named <@' + bot.identity.name +
            '>. I have been running for ' + uptime + ' on ' + hostname + '.');

    });

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}
