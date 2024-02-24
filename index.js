//This bot is a custom truth and dare game bot also could be used for moderations if u have the specific permissions , it is a complete slash based bot which will automatically register slash commands when added to your server 
 

//importing modules 
const { REST,Client,IntentsBitField,EmbedBuilder }= require('discord.js')
const{  ActionRowBuilder, ButtonBuilder, ButtonStyle}= require('discord.js')
const { Routes } = require('discord-api-types/v9')

//defining variables
const clientId= '1185956373008240650'
const token= 'TOKEN HERE'

//Arrays

//truth array 
const truthsArray = 'TRUTH ARRAY ' // EG: ['HELLO','HI'];
//dare array
const daresArray =   'DARE ARRAY'  // EG: ['HELLO','HI'];



//creating functions

async function registerSlash(clientId ,token,guildId)
{
    const commands = [
        {
          name: 'ping',
          description: 'Replies with Pong!',
        },
        {
          name: 'help',
          description: 'Shows commands',
        },
        {
          name: 'meme',
          description: 'Gives out a random meme',
        },
        {
          name: 'truth',
          description: 'Asks a random TRUTH question',
        },
        {
          name: 'dare',
          description: 'Gives a random DARE',
        },
        {
          name: 'ai',
          description: 'responds with an AI answer',
          options: [
            {
              name: 'text',
              type: 3,
              description: 'get ai response',
              required: true,
            },
          ]
        },
        {
          name: 'ban',
          description: 'Ban user guild',
          options: [
            {
              name: 'usermention',
              type: 6,
              description: 'User to be banned',
              required: true,
            },
            {
              name: 'reason',
              type: 3,
              description: 'Reason for the ban',
              required: false,
            },
          ],
        },
        {
          name: 'kick',
          description: 'Kick user guild',
          options: [
            {
              name: 'usermention',
              type: 6,
              description: 'User to be kicked',
              required: true,
            },
            {
              name: 'reason',
              type: 3,
              description: 'Reason for the kick',
              required: false,
            },
          ],
        },
        {
          name: 'play',
          description: 'Play a song',
          options: [
            {
              name: 'songname',
              type: 3, // STRING type
              description: 'Name of the song to play',
              required: true,
            },
          ],
        },
        {
          name: 'leave',
          description: 'Leave the voice channel',
        },
        {
          name: 'confess',
          description: 'secret confession anonymously',
          options: [
            {
              name: 'confession',
              type: 3,
              description: 'give your confession',
              required : true,
            },
          ],
        },
];

const rest = new REST ({version:'10'}).setToken(token);

(async ()=>{
    try{
        console.log('Registring Slash commands');
        console.log(guildId)
         await rest.put(
          Routes.applicationGuildCommands(
            clientId,guildId
            ),
          {body: commands}
         );
         console.log('Slash cmds registered successfully');
          }catch(error){
          console.log(`There was an error: ${error}`);
        }
    })()};


  
  
//client defining
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildEmojisAndStickers,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.GuildPresences
  ]
});

//on bot run 

client.on('ready',()=>{
    console.log(`${client.user.tag} is ready`)
    client.guilds.cache.forEach(guild => {
        // Register the slash command in each guild
        const guildId= guild.id
        registerSlash(clientId,token,guildId);
})
});



//interaction maker
client.on('interactionCreate', async interaction=>{
    if(!interaction.isChatInputCommand()) return;


    //ping cmd
    if (interaction.commandName==='ping'){
        await interaction.reply('pong');

    //ban cmd
    }else if (interaction.commandName==='ban'){
        const user = interaction.options.get('usermention').user;
        const reason = interaction.options.get('reason')?.value || 'No reason provided';

        if (interaction.member.permissions.has('BAN_MEMBER')){
            try {
              await interaction.guild.members.ban(user, { reason });
              const largerFontTruth = '**' + `Successfully banned ${user.tag} by ${interaction.member.displayName}` + `Reason: ${reason}` + '**';
              const userAvatarURL = interaction.member.user.displayAvatarURL({ dynamic: true, size: 256 });
              const embed = new EmbedBuilder()
               .setColor('#ff0000')
               .setTitle('**BAN**')
               .setDescription(largerFontTruth)
	           .setTimestamp()
	           .setFooter({ text: `banned by ${interaction.member.displayName}`,iconURL: userAvatarURL});
               await interaction.reply({ embeds: [embed]});
            }  catch (error) {
              console.error(error);
              await interaction.reply('Error banning the user.');
            }
        }else{
            const embed = new EmbedBuilder()
              .setColor('#ff0000')
              .setTitle('**BAN**')
              .setDescription(`${interaction.member.displayName} dont have ban user permission`)
              await interaction.reply({embeds: [embed]})
        } 

    //kick cmd
    }else if (interaction.commandName==='kick'){
        const user = interaction.options.get('usermention').user;
        const reason = interaction.options.get('reason')?.value || 'No reason provided';

        if (interaction.member.permissions.has('KICK_MEMBER')){
            try {
              await interaction.guild.members.kick(user, { reason });
              const largerFontTruth = '**' + `Successfully kicked ${user.tag} by ${interaction.member.displayName}` + `Reason: ${reason}` + '**';
              const userAvatarURL = interaction.member.user.displayAvatarURL({ dynamic: true, size: 256 });
              const embed = new EmbedBuilder()
               .setColor('#ff0000')
               .setTitle('**KICK**')
               .setDescription(largerFontTruth)
	           .setTimestamp()
	           .setFooter({ text: `kicked by ${interaction.member.displayName}`,iconURL: userAvatarURL});
               await interaction.reply({ embeds: [embed]});
            }  catch (error) {
              console.error(error);
              await interaction.reply('Error kicking the user.');
            }
        }else{
            const embed = new EmbedBuilder()
              .setColor('#ff0000')
              .setTitle('**KICK**')
              .setDescription(`${interaction.member.displayName} dont have kick user permission`)
              await interaction.reply({embeds: [embed]})
        } 
    
    //truth cmd
    }else if (interaction.commandName=== 'truth') {
  
        const randomTruth = truthsArray[Math.floor(Math.random() * truthsArray.length)];
    
        const largerFontTruth = '**' + randomTruth + '**';
        const userAvatarURL = interaction.member.user.displayAvatarURL({ dynamic: true, size: 256 });

        const embed = new EmbedBuilder()
          .setColor('#49ff05')
          .setTitle('**TRUTH**')
          .setDescription(largerFontTruth)
          .setTimestamp()
          .setFooter({ text: `requested by ${interaction.member.displayName}`,iconURL: userAvatarURL});

          const truth = new ButtonBuilder()
                .setCustomId('truth_button')
                .setLabel('TRUTH')
                .setStyle(ButtonStyle.Primary)
          const dare  = new ButtonBuilder()
                .setCustomId('dare_button')
                .setLabel('DARE')
                .setStyle(ButtonStyle.Danger)
      
         const row = new ActionRowBuilder()
                .addComponents(truth,dare);
      
         await interaction.reply({ embeds: [embed], components: [row]});
      
    
    //dare cmd
    }else if (interaction.commandName=== 'dare'){
        const randomDare = daresArray[Math.floor(Math.random() * daresArray.length)];
     
        const largerFontTruth = '**' + randomDare + '**';
        const userAvatarURL = interaction.member.user.displayAvatarURL({ dynamic: true, size: 256 });
        const embed = new EmbedBuilder()
          .setColor('#49ff05')
          .setTitle('**DARE**')
          .setDescription(largerFontTruth)
          .setTimestamp()
          .setFooter({ text: `requested by ${interaction.member.displayName}`,iconURL: userAvatarURL});

          const truth = new ButtonBuilder()
          .setCustomId('truth_button')
          .setLabel('TRUTH')
          .setStyle(ButtonStyle.Primary)
          const dare  = new ButtonBuilder()
          .setCustomId('dare_button')
          .setLabel('DARE')
          .setStyle(ButtonStyle.Danger)

          const row = new ActionRowBuilder()
          .addComponents(truth,dare);

await interaction.reply({ embeds: [embed], components: [row]});
    
    //
    }else if (interaction.commandName=== 'confess'){
        const confession = interaction.options.get('confession')?.value ;
        const largeFontConfess = '**' + confession + '**';
        const embed = new EmbedBuilder()
          .setColor('#0911fd')
          .setTitle('**Confession**')
          .setDescription(largeFontConfess);
          await interaction.channel.send({
              content: `Confession submitted anonymously.`,
              embeds: [embed],
              allowedMentions: { repliedUser: false }, // This disables mentioning the user who triggered the command
            });
      

    }

  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'truth_button') {
      const randomTruth = truthsArray[Math.floor(Math.random() * truthsArray.length)];
    
        const largerFontTruth = '**' + randomTruth + '**';
        const userAvatarURL = interaction.member.user.displayAvatarURL({ dynamic: true, size: 256 });

        const embed = new EmbedBuilder()
          .setColor('#49ff05')
          .setTitle('**TRUTH**')
          .setDescription(largerFontTruth)
          .setTimestamp()
          .setFooter({ text: `requested by ${interaction.member.displayName}`,iconURL: userAvatarURL});

          const truth = new ButtonBuilder()
                .setCustomId('truth_button')
                .setLabel('TRUTH')
                .setStyle(ButtonStyle.Primary)
          const dare  = new ButtonBuilder()
                .setCustomId('dare_button')
                .setLabel('DARE')
                .setStyle(ButtonStyle.Danger)
      
          const row = new ActionRowBuilder()
                .addComponents(truth,dare);
      
      await interaction.reply({ embeds: [embed], components: [row]});




  } else if (interaction.customId === 'dare_button') {
    const randomDare = daresArray[Math.floor(Math.random() * daresArray.length)];
     
    const largerFontTruth = '**' + randomDare + '**';
    const userAvatarURL = interaction.member.user.displayAvatarURL({ dynamic: true, size: 256 });
    const embed = new EmbedBuilder()
      .setColor('#49ff05')
      .setTitle('**DARE**')
      .setDescription(largerFontTruth)
      .setTimestamp()
      .setFooter({ text: `requested by ${interaction.member.displayName}`,iconURL: userAvatarURL});

      const truth = new ButtonBuilder()
                .setCustomId('truth_button')
                .setLabel('TRUTH')
                .setStyle(ButtonStyle.Primary)
      const dare  = new ButtonBuilder()
                .setCustomId('dare_button')
                .setLabel('DARE')
                .setStyle(ButtonStyle.Danger)
      
      const row = new ActionRowBuilder()
                .addComponents(truth,dare);
      
      await interaction.reply({ embeds: [embed], components: [row]});
  }

});

client.login(token);
