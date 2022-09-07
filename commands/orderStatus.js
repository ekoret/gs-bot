import Discord, {
	SlashCommandBuilder,
	config,
	Embed,
} from '../helpers/Discord.js';
import WooCommerce from '../helpers/WooCommerce.js';

export default {
	data: new SlashCommandBuilder()
		.setName('order-status')
		.setDescription('Get the order status for your order')
		.addStringOption((option) =>
			option
				.setName('email')
				.setDescription(
					`The email associated with your ${config.companyName} account`
				)
				.setRequired(true)
		)
		.addIntegerOption((option) =>
			option
				.setName('order-number')
				.setDescription('The order number you want to check')
				.setRequired(true)
		),

	async execute(interaction) {
		const input = {
			email: interaction.options.getString('email'),
			orderNumber: interaction.options.getInteger('order-number'),
		};

		// Base cases
		if (input.orderNumber.toString().length !== 7) {
			const failedOrderLengthEmbed = new Embed().createEmbed(
				'Incorrect order length!',
				'The length of your order number was incorrect! It must be 7 numbers.'
			);

			await interaction.reply({
				embeds: [failedOrderLengthEmbed],
				ephemeral: true,
			});
			return;
		} else if (!Discord.checkEmailInString(input.email)) {
			const failedEmailEmbed = new Embed().createEmbed(
				'Incorrect email format!',
				'The email entered was not in the correct email format. Please check your email again.'
			);

			await interaction.reply({
				embeds: [failedEmailEmbed],
				ephemeral: true,
			});
			return;
		}

		await interaction.reply({
			content: 'Please give me a few moments to find your order!',
			ephemeral: true,
		});

		// Make the API call here
		const orderDetails = await WooCommerce.getOrderStatus(input); // returns an object with order data

		if (orderDetails !== null && orderDetails !== undefined) {
			const orderDetailsEmbed = Embed.getOrderDetailsEmbed(orderDetails);

			await interaction.followUp({
				embeds: [orderDetailsEmbed],
				ephemeral: true,
			});
		} else {
			const orderStatusErrorEmbed = new Embed().createEmbed(
				'Could not get your order status!',
				`There was an error attempting to retrieve your order status with the order number \`${input.orderNumber}\` and email \`${input.email}\`.\n\n\`Please ensure that you are entering in the correct order number and email that you used to make the order on ${config.companyName}.\`\n\nIf there are any further issues, please contact \`${config.adminUser}\` or \`${config.customerSupportUser}\``
			);

			await interaction.followUp({
				embeds: [orderStatusErrorEmbed],
				ephemeral: true,
			});
		}
	},
};
