import TelegramBot from "node-telegram-bot-api";
import { ENV } from "../config/env";

if (!ENV.BOT_TOKEN) {
  throw new Error("BOT_TOKEN is not defined");
}

export const bot = new TelegramBot(ENV.BOT_TOKEN, { polling: true });

export const initBot = () => {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from?.first_name || "do‘st";

    await bot.sendMessage(
      chatId,
      `Assalomu alaykum, ${firstName}! 👋\n\Tizimiga kirish uchun quyidagi tugmadan foydalaning 👇`,
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "🔐 Tizimga kirish",
                web_app: {
                  url: ENV.WEB_APP_URL!,
                },
              },
            ],
          ],
          resize_keyboard: true,
          one_time_keyboard: false,
        },
      },
    );
  });

  console.log("🤖 Telegram bot ishga tushdi");
};
