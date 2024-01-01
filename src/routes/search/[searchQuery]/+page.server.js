import * as cheerio from 'cheerio';
import axios from 'axios';
import { baseUrl, formatCard } from '$lib/utils';

export async function load({ params }) {
	const { data } = await axios.get(`${baseUrl}/search/${params.searchQuery}`);
	const $ = cheerio.load(data);
	const searchResults = [];
	$('.film_list-wrap .flw-item').each((index, element) => {
		searchResults.push(formatCard(element));
	});

	return {
        searchResults,
        searchQuery: params.searchQuery,
    };
}
