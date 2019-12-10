const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    config: {
    name: "kick",
    category: "moderation",
    description: "Kicks the user",
    accessableby: "Administrator",
    usage: "[id | mention]",
    const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    config: {
        name: "kick",
        category: "moderation",
        description: "Kicks the user",
        accessableby: "Administrator",
        usage: "[id | mention]",
        aliases: ["k"],
    },
    run: async (bot, message, args) => {

        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("❌ You do not have permissions to kick members!");

        var kickMember = message.mentions.members.first() || bot.users.get(args[0]);
        if (!kickMember) return message.reply("Please provide a name to kick");

        var reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given!"

        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("❌ I do not have permissions to kick members!");

        kickMember.send(`Hello, you have been kicked from ${message.guild.name} for ${reason}`).then(() =>
            kickMember.kick()).catch(err => console.error(err));
        var sembed = new RichEmbed()
            .setColor("GREEN")
            .setDescription(`**${kickMember.user.username}** has been kicked`)
        message.channel.send(sembed);

        const embed = new RichEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
            .setColor("#ff0000")
            .setThumbnail(kickMember.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .addField("Moderation:", "addrole")
            .addField("Added Role to:", kickMember.user.username)
            .addField("Added By:", message.author.username)
            .addField("Date:", message.createdAt.toLocaleString());

        var sChannel = message.guild.channels.find(c => c.name === "modlogs")
        sChannel.send(embed)

    }
}
