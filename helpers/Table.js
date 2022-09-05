export default class Table {
	static getCommands() {
		return {
			'/commands': 'Get a full list of commands',
			'/roll': 'Roll the dice and get free credits',
			'/rewards': 'View the redemption amount for credits to points',
		};
	}

	static getRewards() {
		return {
			'$25 CREDITS': '1000 POINTS',
			'$50 CREDITS': '2000 + 100 POINTS',
			'$75 CREDITS': '3000 + 200 POINTS',
			'$100 CREDITS': '4000 + 400 POINTS',
		};
	}
}
