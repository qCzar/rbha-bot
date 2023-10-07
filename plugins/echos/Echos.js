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
            restrict: ["668302298828767251"],
            options: bastion.parsers.split,
            resolve(context, [channelMention, ...msg]) {
                const channelID = channelMention.replace("<#", "").replace(">","")
                bastion.bot.simulateTyping(channelID)
                this.send(channelID, msg.join(" "))
            }
        },
        {
            command: "v",
            resolve: "Code last updated: 10/07/23"
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
        {
            command: "welcome",
            resolve: "If you have any questions, do ask! You can check out <#639612641727217664> for upcoming meetups. We are member driven so we rely on members to create meetups, if you don't see anything please create something! Don't worry if there's anther at the same day or time or a similar meetup exists, not everyone will be intersted in every meetup, or make every meetup."
        },
        {
            command: "resources",
            resolve: "Check out <id:guide> for our server resources, such as bot commands and meetups"
        },
        {
            command: "channels",
            resolve: "Visit <id:browse> to update what roles that are assigned to you, as well as what categories and channels that are visible to you."
        }

        // {
        //     command: "test",
        //     resolve(context) {
        //         console.log('channels', bastion.bot.channels[context.channelID].name)
        //     }
        // }

    ]
}
