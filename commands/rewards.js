import DiscordHelper, {
	config,
	SlashCommandBuilder,
} from '../helpers/DiscordHelper.js';
import EmbedHelper from '../helpers/EmbedHelper.js';

export default {
	data: new SlashCommandBuilder()
		.setName('rewards')
		.setDescription('View the redemption amount for credits to points.'),
	async execute(interaction) {
		const embed = EmbedHelper.createEmbed('Rewards', ' ');

		const commandText = await DiscordHelper.getTableText('rewards');

		embed.setDescription(
			`\`There is a minimum redemption amount of $25 CREDITS\`\n\n${commandText}\n\nContact \`${config.customerSupportUser}\` with the amount you'd like to redeem along with the email address associated with your ${config.companyName} account.`
		);

		await interaction.reply({ embeds: [embed] });
	},
};
