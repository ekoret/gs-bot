import { SlashCommandBuilder, config } from '../helpers/DiscordHelper.js';

export default {
	data: new SlashCommandBuilder()
		.setName('order-status')
		.setDescription('Get the order status for your order')
		.addStringOption((option) =>
			option
				.setName('order-number')
				.setDescription('The order number you want to check')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('unique-id')
				.setDescription(
					`Your ${config.companyName} unique ID. You can find this on your account page`
				)
				.setRequired(true)
		),
	async execute(interaction) {
		const orderNumber = interaction.options.getString('order-number');
		const uniqueId = interaction.options.getString('unique-id');

		console.log({ orderNumber, uniqueId });

		await interaction.reply({
			content: 'Please give me a few moments to find your order!',
			ephemeral: true,
		});

		// Make the API call here

		await interaction.followUp({ content: 'Hello!', ephemeral: true });
	},
};
