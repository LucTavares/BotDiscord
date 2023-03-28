const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dado')
    .setDescription('Joga um dado'),

  async execute(interaction) {
    const roll = Math.floor(Math.random() * 6) + 1;
    await interaction.reply(`Você jogou um dado e tirou ${roll}!`);
  },
};
