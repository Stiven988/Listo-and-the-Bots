const { MessageEmbed, Colors } = require("discord.js");
const { secrets, channelsIDs, rolesIDs } = require("../../../../configuration/config.js");

module.exports = {
    name: "staff",
    description: "comandos de moderacion",
    options: [
        {
            name: "ban",
            description: "Restringe a miembros",
            type: 1, // SUB_COMMAND
            options: [
                {
                    name: "user",
                    description: "El miembro a restringir",
                    type: 6, // USER
                    required: true
                },
                {
                    name: "reason",
                    description: "Razón de la restricción",
                    type: 3, // STRING
                    required: true
                },
                {
                    name: "delete",
                    description: "Borrar o no todos los mensajes del usuario",
                    type: 3, // STRING
                    required: true,
                    choices: [
                        {
                            name: "No eliminar ningun mensaje",
                            value: "0"
                        },
                        {
                            name: "Eliminar los mensajes de los 7 dias previos",
                            value: "7"
                        }
                    ]
                },
                {
                    name: "appeal",
                    description: "Incluir o No el enlace para apelar la prohibición",
                    type: 3, // STRING
                    required: true,
                    choices: [
                        {
                            name: "Si",
                            value: "yes"
                        },
                        {
                            name: "No",
                            value: "no"
                        }
                    ]
                }
            ]
        }
    ],
    run: async (interaction) => {

        const usuario = interaction.options.getUser("user");
        const razon = interaction.options.getString("reason");
        const borrar = interaction.options.getString("delete");
        const apelar = interaction.options.getString("appeal");
        

        const member = await interaction.member.guild.members.fetch(usuario);

        /*if (interaction.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ embeds: [new Embed().setDescription("Tu no tienes permisos par ejecutar esta orden de DEMA")], ephemeral: true })
        }*/

        if (!member) {
            await interaction.reply({ content: "No se ha podido encontrar a este miembro. Es posible que ya haya sido baneado o que se haya marchado", ephemeral: true})
        }

        if (member.roles.cache.has(rolesIDs.staff) || member.user.bot) {
            await interaction.reply({ content: "No se puede restringir a un miembro del personal", ephemeral: true});
        }

        if (member.id === interaction.member.id) {
            return interaction.reply({ embeds: [new MessageEmbed().setDescription("No puedes banearte a ti mismo")], ephemeral: true })
        }

        if (razon.length > 512) {
            return interaction.reply({ embeds: [new MessageEmbeds().setDescription("La razón de este baneo no puede superar la cantidad de 512 caracteres")], ephemeral: true })
        }

        const bannedEmbed = new MessageEmbed()
            .setAuthor({ name: member.displayName, iconURL: member.displayAvatarURL() })
            .setDescription("Has sido expulsado del servidor de Discord de Glowing Skeleton")
            .addFields({ name: "Razón", value: razon || "No se ha proporcionado una razón" })
            .setColor("RED");

        if (apelar == "yes") {
            bannedEmbed.addFields({
                name: "Apelar",
                value: "Puede apelar su prohibición visitando:\nhttps://www.glowingskeleton.com/apelar"
            });
        }

        await member.send({ embeds: [bannedEmbed] });
        await member.ban({ days: borrar, reason: razon });
        await interaction.reply({ embeds: [new MessageEmbed({ description: `${member.toString()} ha sido restringido.` }).toJSON()] });

        async function sendToBanLog(interaction, bannedEmbed) {
            const banLogChannel = (await interaction.guild.channels.fetch(channelsIDs.logs.banChannel));
            await banLogChannel.send({ embeds: [bannedEmbed] });
        }

        sendToBanLog(interaction, bannedEmbed);

    }
}
