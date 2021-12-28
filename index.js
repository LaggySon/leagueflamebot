const secret = require("./secret.json"); //file with your bot credentials/token/etc
const discordTTS = require("discord-tts");
const { Client, Intents } = require("discord.js");
const {
  AudioPlayer,
  createAudioResource,
  StreamType,
  entersState,
  VoiceConnectionStatus,
  joinVoiceChannel,
  getVoiceConnection,
} = require("@discordjs/voice");

const intents = [
  Intents.FLAGS.GUILD_VOICE_STATES,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILDS,
];

const getapi = require("./getapi.js");

const client = new Client({ intents: intents });
client.login(secret.token);

client.on("ready", () => console.log("Started Successfully."));

let voiceConnection;
let audioPlayer = new AudioPlayer();

client.on("messageCreate", async (msg) => {
  if (msg.content == "/join") {
    getapi.getData();
    const stream = discordTTS.getVoiceStream("Test Message");
    const audioResource = createAudioResource(stream, {
      inputType: StreamType.Arbitrary,
      inlineVolume: true,
    });
    if (
      !voiceConnection ||
      voiceConnection?.status === VoiceConnectionStatus.Disconnected
    ) {
      voiceConnection = joinVoiceChannel({
        channelId: msg.member.voice.channelId,
        guildId: msg.guildId,
        adapterCreator: msg.guild.voiceAdapterCreator,
      });
      voiceConnection = await entersState(
        voiceConnection,
        VoiceConnectionStatus.Connecting,
        5_000
      );
      console.log("Connected to voice!");
    }

    if (voiceConnection.status === VoiceConnectionStatus.Connected) {
      voiceConnection.subscribe(audioPlayer);
      audioPlayer.play(audioResource);
      console.log("Played TTS");
    }
  }
});
