/*
    These are the stupid simple echo commands for the server
*/

export default function(bastion, config={}) {

    return [

        {
            command: "pitchforks",
            resolve: "ANGRY AT OP? WANT TO JOIN THE MOB? WE'VE GOT YOU COVERED! COME ON DOWN TO /r/pitchforkemporium"
        },
        {
            command: "echo",
            restrict: ["admin"],
            options: bastion.parsers.split,
            resolve(context, [channelMention, ...msg]) {
                const channelID = channelMention.replace("<#", "").replace(">","")
                bastion.bot.simulateTyping(channelID)
                this.send(channelID, msg.join(" "))
            }
        },
        {
            command: "v",
            resolve: "Code last updated: 04/19/23"
        },
        {
            command: "git",
            resolve: "Github: https://github.com/qCzar/rbha-bot"
        },

        {
            command: "github",
            resolve: "Github: https://github.com/qCzar/rbha-bot"
        },

        {
            command: "bug",
            resolve: "Submit bugs and feature requests here so I can keep track of them: https://github.com/qCzar/rbha-bot/issues/new"
        },
        {
            command: "survey",
            resolve: "We have a survey to consolidate and organize opinions on the non-sport amenties Rochester offers. Please take and share this survey so your voice can help influence Rochester for years to come. https://rochesterbored.com/survey"
        },
        {
            command: "website",
            resolve: "We can be found online at: https://rochesterbored.com"
        },

        // {
        //     command: "test",
        //     resolve(context) {
        //         console.log('channels', bastion.bot.channels[context.channelID].name)
        //     }
        // }

    ]
}
