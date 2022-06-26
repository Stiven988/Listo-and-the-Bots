const { Client, Intents, MessageAttachment, MessageEmbed } = require("discord.js");
const { secrets, channelsIDs, rolesIDs } = require("../../configuration/config");
const { createCanvas, loadImage } = require("canvas");
const welcome = require("../Schema/welcome.js");

const ANNOUNCEMENTS_ID = "?announcements";

const vetomo = new Client({
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

vetomo.on("ready", async () => {
    console.log(`Logged in as ${vetomo.user?.tag}!`)
});

vetomo.login(secrets.VetomoToken);

vetomo.on("guildMemberAdd", async (member) => {
    const canvas = createCanvas(1000, 500);
    const ctx = canvas.getContext("2d");

    const bg = await loadImage("./src/Assets/images/welcome-card.png");

    ctx.drawImage(bg, 0, 0, 1000, 500);

    // Avatar
    ctx.translate(0, 88);
    const avatar = await loadImage(member.user.displayAvatarURL({ format: "png" }));
    ctx.drawImage(avatar, 104, 0, 144, 146);

    // Member name
    ctx.translate(0, 197);

    ctx.fillStyle = "white";
    ctx.shadowColor = "#33DAFF";
    ctx.shadowBlur = 1;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;

    const name = member.displayName.normalize("NFKC");
    const fontSize = 62;
    ctx.font = `${fontSize}px Futura-Normal`;
    ctx.fillText(name, 360, 0);

    // Current member number
    ctx.translate(0, 130);
    ctx.shadowColor = "#E34FB6";
    ctx.font = "42px Futura-Normal";
    ctx.textAlign = "end";
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillText(`Miembro #${member.guild.memberCount}`, 925, 0);

    const attachment = new MessageAttachment(canvas.toBuffer(), "welcome.png");

    const noteworthyChannels  = [
        {
            emoji: "📚",
            title: "Reglas & Anuncios",
            text: "Asegurate de haber leido las reglas de nuestro servidor antes de entrar en cualquier cosa. Tambien puedes consultar los anuncios relacionados con la banda y el servidor."
        },
        {
            emoji: "🤖",
            title: "Bots",
            text: "Utilizar nuestros bots personalizados en los <#865036166004342789>"
        },
        {
            emoji: "🎶",
            title: "Canales de Voz & Música",
            text: "Puedes hacer amistades mucho mas estrechas mediante los chats de voz o tambien si no tienes amigos :( puedes escuchar m?sica mediante el obispo Andre"
        },
        {
            emoji: "🏬",
            title: "Tienda",
            text: "Echa un vistazo a nuestros articulos actualmente en venta los cuales pueden traer beneficios a largo o corto plazo."
        },
        {
            emoji: "📰",
            title: "Actualizaciones",
            text: "Mantente al día con las publicaciones de la banda en <#865036165403770883>, y recibe notificaciones si dmaorg.info se actualiza en <#865036165403770884>. Puedes inscribirte para recibir notificaciones utilizando el comando `/roles notificaciones` en el canal de <#865036166004342789>."
        }
    ]

    const embed = new MessageEmbed()
    .setTitle("Bienvenido al servidor de Discord Glowing Skeleton!")
    .setAuthor({ name: member.displayName, iconURL: member.user.displayAvatarURL() })
    .setDescription(
        "Tienes curiosidad por explorar el servidor? A continuación te mostramos algunos de los canales más populares para que los veas."
    )
    .setImage("attachment://welcome.png");

    embed.addFields({ name: "\u200b", value: "\u200b" });
    for (const { emoji, title, text } of noteworthyChannels) {
        embed.addFields({ name: `${emoji} ${title}`, value: text });
    }

    member.guild.channels.cache.find(c => c.id === channelsIDs.bienvenida).send({ content: `<@${member.id}>`, embeds: [embed], files: [attachment] });

    member.roles.add(rolesIDs.bandito);
    member.roles.add(rolesIDs.nuevo);

    console.log(`Member #${member.guild.memberCount} joined`);

    welcome.findOne({ guildID: member.guild.id }, async (err, data) => {
        if (data) {
            data.guildID = member.guild.id;
            data.userID = member.user.id;
            data.save();
        } else {
            new welcome({
                guildID: member.guild.id,
                userID: member.user.id
            })
            welcome.save();
        }
    })

    console.log(`Se ha registrado un nuevo usuario en MongoDB ${member.user.username}`)
})

process.on('unhandledRejection', error => {
    console.error(error);
});

vetomo.on('shardError', error => {
    console.error(error);
});
