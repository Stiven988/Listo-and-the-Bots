const { Client, Intents, MessageAttachment, MessageEmbed } = require("discord.js");
const { secrets, channelsIDs, rolesIDs, youtubeApi } = require("../../../configuration/config.js");

const reisdro = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_WEBHOOKS
    ]
});

reisdro.login(secrets.ReisdroToken);

reisdro.on("ready", async () => {
    console.log(`Logged in as ${reisdro.user?.tag}!`)
});

process.on('unhandledRejection', error => {
    console.error(error);
});

reisdro.on('shardError', error => {
    console.error(error);
});
