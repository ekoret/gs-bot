import pkg from '@woocommerce/woocommerce-rest-api';
const WooCommerceRestApi = pkg.default;
import { wcConfig } from './Discord.js';

export default class WooCommerce {
	static async getOrderStatus({ email, orderNumber }) {
		const api = new WooCommerceRestApi(wcConfig);

		const data = await api
			.get(`orders/${orderNumber}`)
			.then((response) => {
				if (response.status === 200) {
					// We got data
					const responseData = response.data;

					const { id, status, date_created, date_modified, billing } =
						responseData;

					const userEmail = billing.email.toLowerCase();
					const inputEmail = email.toLowerCase();

					// Here we are checking if the input email matches the email in the database
					if (userEmail !== inputEmail) {
						return null;
					}

					return { id, status, date_created, date_modified };
				} else {
					// Any other response status other than 200 will return null
					return null;
				}
			})
			.catch((error) => {
				// Invalid request, for 4xx and 5xx statuses
				if (
					error.response.data.code === 'woocommerce_rest_shop_order_invalid_id'
				) {
					// Handling invalid order ids
					console.log({
						message: 'Invalid Order ID',
						status: error.response.status,
						data: error.response.data,
						orderNumber: orderNumber,
					});
				} else {
					// Hanlding authentication, authorization, and network errors
					console.log({
						message: '4xx and 5xx error',
						status: error.response.status,
						data: error.response.data,
						orderNumber: orderNumber,
					});
				}

				return null;
			});

		return data;
	}
}
