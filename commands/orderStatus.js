import { SlashCommandBuilder, config } from '../helpers/DiscordHelper.js';
import WooCommerceHelper from '../helpers/WooCommerceHelper.js';
import EmbedHelper from '../helpers/EmbedHelper.js';

export default {
	data: new SlashCommandBuilder()
		.setName('order-status')
		.setDescription('Get the order status for your order')
		.addStringOption((option) =>
			option
				.setName('order-number')
				.setDescription('The order number you want to check')
				.setRequired(true)
		),

	async execute(interaction) {
		const orderNumber = interaction.options.getString('order-number');

		await interaction.reply({
			content: 'Please give me a few moments to find your order!',
			ephemeral: true,
		});

		// Make the API call here
		const orderDetails = await WooCommerceHelper.getOrderStatus(orderNumber); // returns an object with order data

		if (orderDetails !== null && orderDetails !== undefined) {
			const orderDetailsEmbed = EmbedHelper.getOrderDetailsEmbed(orderDetails);
			await interaction.followUp({
				embeds: [orderDetailsEmbed],
				ephemeral: true,
			});
		} else {
			const orderStatusErrorEmbed = EmbedHelper.createEmbed(
				'Could not get your order status!',
				`There was an error attempting to retrieve your order status with the order number \`${orderNumber}\`.\n\nPlease ensure that you are entering in the correct order number.\n\nIf there are any further issues, please contact ${config.adminUser}`
			);
			await interaction.followUp({
				embeds: [orderStatusErrorEmbed],
				ephemeral: true,
			});
		}
	},
};
