import Discord, {
	config,
	SlashCommandBuilder,
	Embed,
} from '../helpers/Discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('rewards')
		.setDescription('View the redemption amount for credits to points.'),
	async execute(interaction) {
		const commandText = await Discord.getTableText('rewards');

		const embed = new Embed().createEmbed('Rewards', ' ');

		const descriptionText = `\`There is a minimum redemption amount of $25 CREDITS\`\n\n${commandText}\n\nContact \`${config.customerSupportUser}\` with the amount you'd like to redeem along with the email address associated with your ${config.companyName} account.`;

		embed.setDescription(descriptionText);

		await interaction.reply({ embeds: [embed] });
	},
};
