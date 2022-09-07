import pkg from '@woocommerce/woocommerce-rest-api';
const WooCommerceRestApi = pkg.default;
import { wcConfig } from './Discord.js';

export default class WooCommerce {
	static async getOrderStatus(orderNumber) {
		const api = new WooCommerceRestApi(wcConfig);

		const data = await api
			.get(`orders/${orderNumber}`)
			.then((response) => {
				if (response.status === 200) {
					const responseData = response.data;

					const { id, status, date_created, date_modified } = responseData;

					return { id, status, date_created, date_modified };
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
