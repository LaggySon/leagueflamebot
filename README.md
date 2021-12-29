# League of Legends TTS Bot

Inspired by Arshia's [Toxic Discord Bot](https://github.com/arshiuh/toxic-discord-bot-league). Here's a [link](https://www.youtube.com/watch?v=WZdV5f7fPJs) to the video they made about it.

I made this project because I loved the idea and wanted to modify it to use the nodejs discord-tts package.

To use:

- Create `secret.json` file to contain your Discord bot token.

```json
{
  "token": "YOUR-BOT-TOKEN-HERE"
}
```

- Run `npm install` to install dependencies.
- Run `node .` to start the bot
- In Discord, type `/tts start` to have the bot join your voice channel.
  - This will also start checking the client API.
