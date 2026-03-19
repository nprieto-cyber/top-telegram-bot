const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {
  polling: true,
  allowedUpdates: ["message", "chat_member", "new_chat_members"],
});

// Works in GROUPS
bot.on("new_chat_members", (msg) => {
  const chatId = msg.chat.id;
  msg.new_chat_members.forEach((member) => {
    sendWelcome(chatId, member.first_name);
  });
});

// Works in CHANNELS
bot.on("chat_member", (msg) => {
  const newMember = msg.new_chat_member;
  if (newMember && newMember.status === "member") {
    sendWelcome(msg.chat.id, newMember.user.first_name);
  }
});

function sendWelcome(chatId, firstName) {
  firstName = firstName || "Friend";

  const welcomeMessage = `
🔥 *Welcome to T.O.P. Marketing Group, ${firstName}!* 🔥

You've just joined a *nationwide network of entrepreneurs, leaders, and builders* committed to rewriting what success looks like. 🌎

We're not just another opportunity.
We're a *launchpad.* A platform. A proven system.

In 30+ years, we've helped everyday people from all walks of life break free from average and build businesses, brands, and better futures. And we're scaling fast — city by city, state by state, leader by leader. 🏙️

Whether you're chasing your first six figures, building generational wealth, or simply surrounding yourself with people who are *going somewhere* — you're in the right room. 💡

If you're hungry to grow…
If you've ever felt like you were meant for more…
If you're ready to build something real with real people…

*T.O.P. was made for you.* 👊

Get connected with us everywhere 👇

📲 *Instagram:* [Follow Us](https://www.instagram.com/topmarketinggroup/)
🌐 *Linktree:* [All Our Links](https://linktr.ee/topmarketinggroup)
📝 *Ready to Build?* [Apply Here](https://topmarketinggroup.net/joinus)

Welcome to the movement. Let's get to work. 💼🚀
  `;

  bot.sendMessage(chatId, welcomeMessage, {
    parse_mode: "Markdown",
    disable_web_page_preview: true,
  });
}

console.log("T.O.P. Marketing Group Telegram Bot is running...");
