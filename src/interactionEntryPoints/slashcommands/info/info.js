 const { MessageEmbed, Colors } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Comprueba el ping del bot",
    run: async (interaction) => {
    
        let ping = 0;
        let time = 0;

        const previousPings = [];

        const PING_TIME = 1000 * 60 * 5; // 5 MINUTES

        await interaction.reply({ content: "Comprobando..." });

        const prior = Date.now();
        const after = interaction.createdAt.getTime();

        const currentPing = Math.abs(after - prior);

        previousPings.push({ ping: currentPing, time: Date.now() });

        let pingSum = 0;
        let pingCount = 0;

        for (let i = previousPings.length - 1; i >= 0; i--) {
            if (previousPings[i].time + PING_TIME >= Date.now()) {
                pingSum += previousPings[i].ping;
                pingCount++;
            } else {
                previousPings.splice(i, 1);
            }
        }

        previousPings[0];

        const average = Math.floor(pingSum / pingCount);

        if (currentPing >= 301) {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle(`Ping ${currentPing}ms`)
                .addFields(
                    { name: "Palpitación", value: `${Math.floor(interaction.client.ws.ping)}ms`},
                    { name: "Palpitación promedio", value: `${average}ms sobre ${pingCount} ping${pingCount === 1 ? "" : "s"}` }
                )
            await interaction.editReply({ embeds: [embed] });
        }

        if (currentPing <= 300) {
            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle(`Ping ${currentPing}ms`)
                .addFields(
                    { name: "Palpitación", value: `${Math.floor(interaction.client.ws.ping)}ms`},
                    { name: "Palpitación promedio", value: `${average}ms sobre ${pingCount} ping${pingCount === 1 ? "" : "s"}` }
                )
            await interaction.editReply({ embeds: [embed] });
        }

    }
}
