const { makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const express = require("express");
const cors = require("cors");
const qrcode = require("qrcode");

const app = express();
app.use(cors());
app.use(express.json());

let sock;
let isConnected = false;
let qrCodeBase64 = null;

async function startWhatsApp() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");

    sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
    });

    sock.ev.on("creds.update", saveCreds);
    sock.ev.on("connection.update", async ({ connection, lastDisconnect, qr }) => {
      try {
        if (connection === "open") {
          console.log("✅ Conectado ao WhatsApp!");
          isConnected = true;
          qrCodeBase64 = null;
        } else if (connection === "close") {
          console.log("❌ Conexão fechada. Tentando reconectar...");
          isConnected = false;
          startWhatsApp();
        } else if (qr) {
          qrCodeBase64 = await qrcode.toDataURL(qr);
        }
      } catch (error) {
        console.error("Erro em connection.update:", error);
      }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
      try {
        const msg = messages[0];
        if (!msg.key.fromMe) {
          const chatId = msg.key.remoteJid;
          const userMessage = msg.message?.conversation || "";

          console.log(`📩 Mensagem recebida de ${chatId}: ${userMessage}`);

          const responseMessage = "Olá! Obrigado por entrar em contato. Para agendar um horário, acesse: https://seusite.com/agenda";

          await sock.sendMessage(chatId, { text: responseMessage });
          console.log(`✅ Resposta enviada para ${chatId}`);
        }
      } catch (error) {
        console.error("Erro em messages.upsert:", error);
      }
    });
  } catch (error) {
    console.error("Erro ao iniciar o WhatsApp:", error);
    isConnected = false;
    setTimeout(startWhatsApp, 5000); // Tentar reconectar após 5 segundos
  }
}

// Rota para iniciar o WhatsApp
app.post("/start", async (req, res) => {
  try {
    if (!isConnected) {
      await startWhatsApp();
      res.json({ success: true, message: "Iniciando WhatsApp...", qr: qrCodeBase64 });
    } else {
      res.json({ success: false, message: "WhatsApp já está conectado." });
    }
  } catch (error) {
    console.error("Erro na rota /start:", error);
    res.status(500).json({ success: false, message: "Erro ao iniciar o WhatsApp." });
  }
});

// Rota para parar o WhatsApp
app.post("/stop", async (req, res) => {
  try {
    if (isConnected && sock) {
      await sock.ws.close();
      isConnected = false;
      res.json({ success: true, message: "WhatsApp desconectado." });
    } else {
      res.json({ success: false, message: "WhatsApp não está conectado." });
    }
  } catch (error) {
    console.error("Erro na rota /stop:", error);
    res.status(500).json({ success: false, message: "Erro ao desconectar o WhatsApp." });
  }
});

// Rota para obter o status do WhatsApp
app.get("/status", (req, res) => {
  try {
    res.json({ isConnected, qr: qrCodeBase64 });
  } catch (error) {
    console.error("Erro na rota /status:", error);
    res.status(500).json({ error: "Erro ao obter o status do WhatsApp." });
  }
});

// Rota para enviar mensagens manualmente
app.post("/send", async (req, res) => {
  const { number, message } = req.body;
  const chatId = number.includes("@s.whatsapp.net") ? number : number + "@s.whatsapp.net";

  try {
    await sock.sendMessage(chatId, { text: message });
    res.json({ success: true, message: "Mensagem enviada!" });
  } catch (error) {
    console.error("Erro na rota /send:", error);
    res.status(500).json({ success: false, message: "Erro ao enviar mensagem." });
  }
});

app.listen(3000, () => console.log("🚀 Servidor rodando na porta 3000"));