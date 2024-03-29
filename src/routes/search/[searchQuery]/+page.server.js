import * as cheerio from 'cheerio';
import axios from 'axios';
import { myflixerUrl } from '$lib/utils';
import { parseMovieCard, parsePagination } from '$lib/parsers';

export async function load({ params }) {
	const { data } = await axios.get(
		`${myflixerUrl}/search/${params.searchQuery.replace(/ /g, '-')}`
	);
	const $ = cheerio.load(data);
	const searchResults = [];
	const pagination = [];
	$('.film_list-wrap .flw-item').each((index, element) => {
		searchResults.push(parseMovieCard(element));
	});

	$('.pagination:nth-child(1) li').each((index, element) => {
		pagination.push(parsePagination(element));
	});

	const uniquePagination = pagination.filter((item, index) => {
		return (
			index ===
			pagination.findIndex((obj) => {
				return JSON.stringify(obj) === JSON.stringify(item);
			})
		);
	});
	return {
		searchResults,
		pagination: uniquePagination,
		searchQuery: params.searchQuery
	};
}
