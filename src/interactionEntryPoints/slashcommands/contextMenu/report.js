const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { ContextMenuCommandBuilder } = require("@discordjs/builders");

module.exports = {
    name: "🚩 reportar mensaje",
    type: 3,

    run: async (interaction) => {

        await interaction.deferReply({ ephemeral: true })

        const embed = new MessageEmbed()
        .setTitle("🚩 Reportar mensaje")
        .setDescription("🚧 EN OBRAS | Si desea informar este mensaje al personal del servidor, elija el motivo en el menú desplegable a continuación.\n\nSi esto fue un accidente, puede ignorar este mensaje con seguridad"
        );
       
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('report_reason')
            .setPlaceholder('Selecciona una razón')
            .addOptions(
                {
                    label: "Mal comportamiento",
                    description: "Ser grosero con los demás",
                    value: "being_rude"
                },
                {
                    label: "Drama",
                    description: "Generar drama innecesario",
                    value: "drama"
                },
                {
                    label: "Spam",
                    description: "Spamming de mensajes/imágenes/etc",
                    value: "spam"
                },
                {
                    label: "NSFW",
                    description: "Insultos, NSFW u otro contenido altamente inapropiado",
                    value: "nsfw"
                }   
            )
        )

        await interaction.editReply({ embeds: [embed], components: [row] })

    }
}
    
