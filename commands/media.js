import fs from 'fs'
import { downloadMediaMessage } from 'baileys'

export async function photo(client, message) {
    try {
        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage
        const target = quoted?.stickerMessage
        
        if (!target) {
            return await client.sendMessage(message.key.remoteJid, {
                text: '📸 *Xenon bot*\n\nRépondez à un sticker pour le convertir en image.\n\nUsage: .photo (réponse à un sticker)'
            })
        }

        const buffer = await downloadMediaMessage({ message: quoted }, "buffer")
        const filename = `./temp/sticker-${Date.now()}.png`

        if (!fs.existsSync('./temp')) fs.mkdirSync('./temp')
        fs.writeFileSync(filename, buffer)

        await client.sendMessage(message.key.remoteJid, {
            image: fs.readFileSync(filename),
            caption: '✨ Xenon bot'
        })