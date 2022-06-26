const { Client, Intents, MessageEmbed, Collection, WelcomeChannel } = require("discord.js");
const { secrets, guildID, channelsIDs, color, prefixBot } = require("./configuration/config.js");
const fs = require("fs");
const path = require("path");

require("./src/Altbots/welcome.js");
require("./src/Altbots/topfeed/topfeed.js");
require("./MongoDB");

const client = new Client({
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

client.slashCommands = new Collection();

const slshCommands = fs.readdirSync(path.join(__dirname, "./src/interactionEntryPoints/slashcommands"));
for (const folders of slshCommands) {
    const folder = fs.readdirSync(path.join(__dirname, "./src/interactionEntryPoints/slashcommands", folders));
    for (const file of folder) {
        const slash = require(path.join(__dirname, "./src/interactionEntryPoints/slashcommands", folders, file))
        client.slashCommands.set(slash.name, slash);
    }
}

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand) {
        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return;
        command.run (interaction);
    }
})

client.on("messageCreate", async (message) => {
    const prefix = prefixBot;
    if (!message.guild || message.author.bot) return;
    if (message.channel.type === "dm") return;
});


console.log("Script Started");

client.login(secrets.ListoToken);

client.once("ready", async () => {
    console.log(`Logged in as ${client.user?.tag}!`)
    
    guild = await client.guilds.fetch({ force: true, guild: guildID });

    const botchan = (await guild.channels.fetch(channelsIDs.logs.staffCommand));
    await guild.members.fetch();
    await botchan.send({ 
        embeds: [new MessageEmbed({ color: color, title: "El bot se esta ejecutado", description: `El total de miembros de ${guild.name} es de ${guild.members.cache.size}`})]
    });
    const slashCommands = client.slashCommands.map(x => x)
    client.guilds.cache.get(guildID).commands.set(slashCommands)
});

process.on('unhandledRejection', error => {
    console.error(error);
});

client.on('shardError', error => {
    console.error(error);
    });
