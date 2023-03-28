const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('temperatura')
    .setDescription('Mostra a temperatura atual de uma cidade')
    .addStringOption(option =>
      option.setName('cidade')
        .setDescription('Digite o nome da cidade')
        .setRequired(true)),

  async execute(interaction) {
    const cidade = interaction.options.getString('cidade');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`;

    try {
      const response = await axios.get(url);

      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Temperatura em ${response.data.name}`)
        .setDescription(`${response.data.main.temp}°C`)
        .setTimestamp();

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply('Ocorreu um erro ao buscar a temperatura da cidade.');
    }
  },
};
