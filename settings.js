const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('settings.env'))
    require('dotenv').config({ path: __dirname + '/settings.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'B.M.B-TECH;;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0U5dDhieDQxV1pwWm5lRUd3Y3F4eTRXY203S1RET0dQOHZFT2Vud1gyWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWGFObkdqQWRzM3NCNlVuNmFTbjlaTC9UQzYwdW5vMFc1ZUVFUURsOVFtWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhQ3NTNmFZVUdrOHJxM0VEUDI0ZzlhYjBpK05mQm9XM29rcFg2RVY5WG5RPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxaWVXWGJBMU5qeTFLdDhqNE9waUxydzNRazdXRW1WS3gxeGdhVHpOT1RnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllOTDg2OUJ1YjNCYkxiT0RkYWdndnhGSldKcUJhaVBBREkrRmdCeWVsMDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitJejVMV25sRE1CWmJaYnljU1A0N0FZZTNDdnNydmVCVVp5amdYLy9GbHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUZhSzlINHYxeHE4dUFicEpjdElQbGlEcWdiRkJpU1NoVDd2VTVSTFlFVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOTNCbHp2MXE2TWZoMXBhQlBLaE9NOGprdkhEbWQ4cmtuSWRlZnFMa1hHcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklyRHVLKzZTZzVGRnhtZWZXeHdxcEpyMWttN0JqQVY1cDhkZmpHaFdHN1VZVjMveFhGSTBiNTVkUUdrSTNCTzB4TDNCdkhBVFdmVTF3R1Z1TVJxd0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM5LCJhZHZTZWNyZXRLZXkiOiJ4OW5ta1AyZzlPc3NrclFrTytMNXBENkpqU2tDTE9Db0ZXeHBTbThrRkxFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3ODE4MjMyMjY5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjI1MjMyOEY3MkExMDQwNzM1OTAyQzEyNkNCNjVDMEU3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ3Mjc1NzJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3ODE4MjMyMjY5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjI5RkM5MDU1MUYxMjM1MEFGMzdGN0ZGN0ZFNjZEQjNCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ3Mjc1NzN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3ODE4MjMyMjY5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjEwMUU3Rjc5QjUxMjY0RkQzNzYwNTg2QjEyOUMxNjlDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ3Mjc2MTR9XSwibmV4dFByZUtleUlkIjo2MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjYxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjIzV1NNNVNWIiwibWUiOnsiaWQiOiIyNzgxODIzMjI2OTo4OEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJCYWxsYXMiLCJsaWQiOiIxNzQ1OTEwOTE2NzUzMjg6ODhAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJK2Q4MEVRL1lqY3hBWVlGQ0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJqdGhXZzZkWjVzT1diTTFiTVBFN2ZCZVZZemp1Q2xsL0VDRDhTbzBLamhvPSIsImFjY291bnRTaWduYXR1cmUiOiJyOUdwRUFFZ3ZmL3kwdzhBcmREbU5PL2JNV1k2OEhtTDdPZGNwTDRIcWg5L2t5NU16MnNxREpmS0xoZTJHZ0tJN1JIK0MyUytxeFB0MnFwQitzUmxBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSjRyQVpLYVhTd1RjOHgveHlyb0RQVGI2by9DTEpia2poUFlXRkhYbjl6ZDdBRWpMZkE5ZW5SNno5eUNRNTVReTAvSUZTdWhkY1lKZ2EvWUxOajRYQnc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzgxODIzMjI2OTo4OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZN1lWb09uV2ViRGxtek5XekR4TzN3WGxXTTQ3Z3BaZnhBZy9FcU5DbzRhIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTQ3Mjc1NjMsImxhc3RQcm9wSGFzaCI6IlBXazVCIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJaUcifQ==',
    PREFIXE: process.env.PREFIX || ";",
    OWNER_NAME: process.env.OWNER_NAME || "♤𝗑ᴾᴿᴼ♧",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27767494368",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '27818232269',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/x167jb.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY, // ✅
    WARN_COUNT : process.env.WARN_COUNT || '3',
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    CHAT_BOT: process.env.CHAT_BOT || 'no', // ✅
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway"
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
