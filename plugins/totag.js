const { System } = require("../lib/");

System({
    pattern: "test",
    fromMe: true,
    type: "group",
    adminAccess: true,
    desc: "mention all users in the group"
}, async (message, match) => {
    if (!message.isGroup) {
        return await message.reply(`@${message.sender.split("@")[0]}`, { mentions: [message.sender] });
    }
    
    const { subject, size, participants } = await message.client.groupMetadata(message.from).catch(e => {});
    if (!participants) return;

    let admins = participants.filter(v => v.admin !== null).map(v => v.id);
    let msg = `〄TAGALL BY RIJU<☠️_么・〄\n▢ GROUP : ${subject}\n▢ MEMBERS : ${size}\n\n〄𝐌𝐞𝐧𝐭𝐢𝐨𝐧𝐬 :\n\n`;

    for (let i = 0; i < participants.length; i++) {
        msg += `▢ @${participants[i].id.split('@')[0]}\n`;
    }
    msg += "\n𖤍POWER RIJU<3🧿_么 𖤍";

    await message.client.sendMessage(message.jid, { image:{ url: "https://www.zeta-ser.xyz/url/qMcGaRO.jpeg" }, caption: msg, mentions: participants.map(a => a.id)});
});
