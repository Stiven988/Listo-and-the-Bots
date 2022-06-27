const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { ContextMenuCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new ContextMenuCommandBuilder()
    .setName("🚩 reportar mensaje")
    .setType(3),

    async run (client, interaction) {
        await interaction.deferReply({ ephemeral: true });

        const embed = new MessageEmbed()
        .setTitle("Reportar mensaje")
        .setDescription(
            "🚧 EN OBRAS | Si desea informar este mensaje al personal del servidor, elija el motivo en el menú desplegable a continuación.\n\nSi esto fue un accidente, puede ignorar este mensaje con seguridad"
        );
       
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('report_reason')
            .setPlaceholder('Selecciona una razón')
            .addOptions(
                {
                    label: "Ser grosero con los demás",
                    description: "Ser grosero con los demás",
                    value: "being_rude"
                },
                {
                    label: "Generar drama innecesario",
                    description: "Generar drama innecesario",
                    value: "drama"
                },
                {
                    label: "Spamming de mensajes/imágenes/etc",
                    description: "Spamming de mensajes/imágenes/etc",
                    value: "spam"
                },
                {
                    label: "Insultos, NSFW u otro contenido altamente inapropiado",
                    description: "Insultos, NSFW u otro contenido altamente inapropiado",
                    value: "nsfw"
                }   
            )
        )

        await interaction.editReply({ embeds: [embed], components: [row], ephemeral: true })



    }
}
