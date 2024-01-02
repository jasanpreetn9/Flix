import axios from 'axios';
import * as cheerio from 'cheerio';
import { parseMovieCard, parsePagination } from '$lib/parsers';
export async function load({ params, url }) {
	const page = url.searchParams.get('page') || 1;
	const { data } = await axios.get(`https://flixhq.pe/country/${params.country}?page=${page}`);
	const $ = cheerio.load(data);
	const result = [];
	const pagination = [];

	$('.film_list-wrap .flw-item').each((index, element) => {
		result.push(parseMovieCard(element));
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
		country: $('.cat-heading').text().trim(),
		pagination: uniquePagination,
		result
	};
}
