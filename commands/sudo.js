export async function modifySudoList(client, message, list, action) {
    try {
        const remoteJid = message.key?.remoteJid
        if (!remoteJid) throw new Error("Invalid remote JID.")

        const messageBody = message.message?.extendedTextMessage?.text || message.message?.conversation || ''
        const commandAndArgs = messageBody.slice(1).trim()
        const parts = commandAndArgs.split(/\s+/)
        const args = parts.slice(1)

        let participant

        if (message.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
            participant = message.message.extendedTextMessage.contextInfo.participant || message.key.participant
        } else if (args.length > 0) {
            const jidMatch = args[0].match(/\d+/)
            if (!jidMatch) throw new Error("Invalid participant format.")
            participant = jidMatch[0] + '@s.whatsapp.net'
        } else {
            throw new Error("No participant specified.")
        }