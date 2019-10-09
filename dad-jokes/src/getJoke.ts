const request = require('request-promise');

interface requestOptions {
	readonly method: string;
	readonly uri: string;
	readonly headers: {
		Accept: string;
		'User-Agent': string;
	};
	readonly json: boolean;
}

const options: requestOptions = {
	method: 'GET',
	uri: 'https://icanhazdadjoke.com/',
	headers: {
		Accept: 'application/json',
		'User-Agent': 'request-promise practice, contact me at github.com/mattdavis0351'
	},
	json: true
};

async function getJoke(): Promise<string> {
	const res = await request(options);

	// console.log(res.joke);
	return res.joke;
}
// getJoke();
export default getJoke;
