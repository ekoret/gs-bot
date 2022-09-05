import pkg from '@woocommerce/woocommerce-rest-api';
const WooCommerceRestApi = pkg.default;
import { wcConfig } from './DiscordHelper.js';

export default class WooCommerceHelper {
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
						headers: error.response.headers,
						data: error.response.data,
					});
				} else {
					// Hanlding authentication, authorization, and network errors
					console.log({
						message: '4xx and 5xx error',
						status: error.response.status,
						headers: error.response.headers,
						data: error.response.data,
					});
				}

				return null;
			});

		return data;
	}
}
