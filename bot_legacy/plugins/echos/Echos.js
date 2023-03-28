/*
    These are the stupid simple echo commands for the server
*/

export default function(bastion, config={}) {

    return [

        {
            command: "pitchforks",
            resolve: "ANGRY AT OP? WANT TO JOIN THE MOB? WE'VE GOT YOU COVERED! THE TRADITIONAL ---E | LEFT HANDED Ǝ--- | FANCY ---{ | CLEARANCE MODELS: ---F ---L ---e . HAPPY LYNCHING!"
        },
        
        {
            command: "help",
            resolve: "Command has been moved to `!meetup` or `!meetup help`"
        },

        {
            command: "mention",
            resolve: "Commands been changed to `!meetup mention`"
        },

        {
            command: "help",
            resolve: "Commands been changed to `!meetup` or `!meetup help`"
        },

        {
            command: "cancel",
            resolve: "Commands been changed to `!meetup cancel`"
        },

        {
            command: "resist",
            resolve: "Commands been changed to `!team resist`"
        },

        {
            command: "edit",
            resolve: "Commands been changed to `!meetup edit`"
        },

        {
            command: "wheres",
            options: bastion.parsers.args(["name"]),
            resolve(context, name) {
                if (name.toLowerCase() === "james") return "<@!115794072735580162>!"
            }
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
            command: "git",
            resolve: "Github: https://github.com/qCzar/rbha-bot"
        },

        {
            command: "github",
            resolve: "Github: https://github.com/qCzar/rbha-bot"
        },

        {
            command: "bug",
            resolve: "Submit the bug here so I can keep track of them: MESSAGE ALEX ^.^"
        }

        // {
        //     command: "test",
        //     resolve(context) {
        //         console.log('channels', bastion.bot.channels[context.channelID].name)
        //     }
        // }

    ]
}
