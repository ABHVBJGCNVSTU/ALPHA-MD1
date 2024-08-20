const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0lwQ0pLODB6ZHR3cEcyVWNHdk9Welo5MHVFbXhHcVMzWkMycHZ6bFRWWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSDRERzRvUjRTVmhnT2hjdUhhUGtqaDExeWk5Mnc5MDY3ck5zanRYZjUxcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVSVN6S3VJejMvSXQyemFVcWpicDRKTkFMVllYUzFLVXFiN2ozSlVZQlZrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIra1NZKy85TEpiSGFDNmlNbGR6R0VkOWpKMFBQYWpNM1lZSDQ1dzRERno0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9PZXNocGdrb0FtNy9ZSHdIcmJpWHVoNnRKa1hEVHNDUFcrT2lpT1I5SDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iis5c0RneWxjUERnS1RuL2RKYlFjOUJmM3MvZHoxQnByQXk1THNTVjhOUms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0M1YmlCbElUNDFLYXdtRDRhQytSeUFqYTR4MTZkNk54WStRVDlycjZHST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0t0RHh5THUrdjhQb2hFM3loWHBCcmxyZjBtVWRDdWNBRGRMZ3diK2JTbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxNdjRBZSsrN2lYUldSMGtGOTdUc2VnZCsrTnZXd0VSM1lSaktOL1V2ak1DRk8rNVhpZzZ6TzdIeFI3UXB1R3M2QzIzK1dtYTQrZXZPdUowSFoySWhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUyLCJhZHZTZWNyZXRLZXkiOiJVSXRjejBxT0dKRTF3Y21WL3pJOFl2dUY5NU9nVEpPVWQvUmxNbHdCRHlvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJKRmRxZ29LTlRQbU9keVY4anhrb1pBIiwicGhvbmVJZCI6IjE2YzRjM2QyLWYzYWYtNDEwOS05NzQ2LWU2Yzk5NWVjMWMxNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjWFNRNU9rd3RFWmdsWFdseGIxeG5zMnEzbms9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTGYzQURlR3VZYlp0eUZwaEE0bldwRERxckhjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjJEMjIyVk1XIiwibWUiOnsiaWQiOiI5MjMxMTQzOTcxNDg6NzRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQW1pciJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUHUxd1pnQkVJNytrYllHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiT2d1SktYQlJQYzFpaUU1b25RVjh4dzFvWjNYSnlOWllIMVdVZnc4MGFEbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSXRPdHFuZFE1YmlXOVdWL3QvNjM1TjRBTmtnTk1GQklSQmxCd0dlS0xlaGozM0tIOTVqNStidzBFd09TQTNnb05rWU83N1N2VmFBdUJTRGNWenpkQXc9PSIsImRldmljZVNpZ25hdHVyZSI6Im9IeFNvWmF6YmYxNTFZMUpDS1NyeWhEcE1HMHY4UC9oRnNiV1lzYjFGMkRDYkJxbEJPVm55cHh6Z01xNTVmdlNHNldPTFU1b1NUanB2Y2NrbzhYcGdBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMTE0Mzk3MTQ4Ojc0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRvTGlTbHdVVDNOWW9oT2FKMEZmTWNOYUdkMXljaldXQjlWbEg4UE5HZzYifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQxNTM2MjgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRk4xIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Mian-Amir",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "923114397148",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'AMIR',
    URL : process.env.BOT_MENU_LINKS || 'https://i.imgur.com/XPO3Vt8.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
