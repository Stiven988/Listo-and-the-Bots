const dotenv = require("dotenv");
dotenv.config();

/** CONFIG.JS
* Contiene constantes y valores que se pueden cambiar
*/

module.exports = {
    prefixBot: "!",
    color: "0x00adff",
    guildID: process.env.guildID,
    secrets: {
        ListoToken: process.env.listo,
        VetomoToken: process.env.vetomo,
        ReisdroToken: process.env.reisdro,
        AndreToken: process.env.andre,
        MongoDB: process.env.mongodb
    },
    channelsIDs: {
        internationalNews: "880601500517294120",
        recursosApoyo: "880614989914853416",
        reglas: "868585310169235476",
        anuncios: "880646290105589800",
        houseOsGold: "881280758017314856",
        bienvenida: "880655573966802944",
        albumDeLaSemana: "890297046622412810",
        albumDiscusion: "865036165403770887",
        hometown: "865036165677318153",
        slowtown: "890299426088812544",
        international: "865036165403770889",
        guardianesDeDragon: "865036165677318154",
        takeOverTour: "894381794508554260",
        musica: "865036165677318156",
        positividad: "865036165677318157",
        tvCineLiteratura: "865036165677318159",
        juegosTecnologia: "865036165677318160",
        actualizacionesSai: "894387860986282006",
        personalFalso: "865036165845352459",
        listaTeorias: "865036165845352460",
        teoriasVerificadas: "865036165845352462",
        lvlcnrn: "865036165845352461",
        creacionesDestacadas: "865036165845352465",
        creaciones: "865036165845352464",
        cliqueArtFriday: "865036166004342784",
        creacionesMusicales: "865036165845352467",
        memes: "865036166004342786",
        solicitarRoles: "894392639686852629",
        tienda: "894393083272245268",
        botChangeLog: "865036166004342792",
        demaCouncil: "894393728368787527",
        commands: "865036166004342789",
        sugerencias: "865036166004342790",
        topfeed: {
            tyler: "865036165403770881",
            josh: "865036165403770882",
            band: "865036165403770883",
            dmaorg: "865036165403770884", 
            otros: "924673539787882496"
        },
        logs: {
            banChannel: "967598463330168882",
            staffCommand: "967598524864798740",
            deleteEdit: "967598570846961734"
        }
    },
    categoriasIDs: {
        importante: "865036165011079179",
        topfeed: "865036165403770880",
        albumDeLaSemana: "865036165403770885",
        campamento: "865036165403770888",
        afuerasDeDema: "865036165677318155",
        teorias: "865036165845352458",
        creaciones: "865036165845352463",
        botForHands: "865036166004342787",
        voiceChannels: "865036166004342793"
    },
    usersIDs: {
        me: "821497484136284281",
        bots: {
            listo: "923676673226965052",
            reisdro: "864952099422339103",
            vetomo: "864952012852690965",
            andre: "864952056435048458"
        }
    },
    rolesIDs: {
        staff: "865036164977393672",
        bandito: "865036164947771425",
        nuevo: "865036164837408798",
        banda: "865036165403770883"
    },
    youtubeApi: {
        channel: "880646290105589800",
        youtubers: [
            "https://www.youtube.com/user/twentyonepilots",
            "https://www.youtube.com/user/slushieguys",
            "https://www.youtube.com/channel/UCgv9JTMMLnOVy_X0saEv_Gw"
        ],
        youtubeKey: "AIzaSyAI7VyavnNb69K6vAaAH9xgUPVHRvZ-3B0"
    }
};
