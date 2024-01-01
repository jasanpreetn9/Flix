import * as cheerio from 'cheerio';
import axios from 'axios';
import { baseUrl, formatCard } from '$lib/utils';

// Episodes Providers: https://myflixerz.to/ajax/episode/list/103714
// Episodes Seasons: https://myflixerz.to/ajax/season/list/39480
// Episodes URL: https://myflixerz.to/ajax/season/episodes/626
export async function load({ params }) {
	const parts = params.movieId.split('-');
	const id = parts[parts.length - 1];
	const { data: details } = await axios.get(`${baseUrl}/${params.format}/${params.movieId}`);
	const { data: provider } = await axios.get(`${baseUrl}/ajax/episode/list/${id}`);

	const $ = cheerio.load(details);
	const $$ = cheerio.load(provider);

	const result = {
		movieId: params.movieId,
		banner: $('.cover_follow')
			.attr('style')
			.match(/url\((.*?)\)/)[1]
			.replace(/['"]/g, ''),
		poster: $('.film-poster img').attr('src'),
		title: $('.heading-name a').text(),
		quality: $('.btn-quality').text().trim(),
		imdbRating: Number($('.btn-imdb').text().trim().replace('IMDB: ', '')),
		description: $('.description').text().trim(),
		format: params.format.toLowerCase(),
		released: "",
		genre: "",
		casts: "",
		duration: "",
		country: "",
		production: "",
		recommendations: "",
		providers: [],
		recommendations: [],
	};

	$('.elements .row .row-line').each((index, element) => {
		const type = $(element).find('.type').text().replace(':', '').trim().toLowerCase();
		const value = $(element)
			.find('.type')
			.parent()
			.clone()
			.children('.type')
			.remove()
			.end()
			.text()
			.trim();
		switch (type) {
			case 'released':
				result.released = value;
				break;
			case 'genre':
				result.genre = value.split(',').map((item) => item.trim());
				break;
			case 'casts':
				result.casts = value.split(',').map((item) => item.trim());
				break;
			case 'duration':
				result.duration = parseInt(value);
				break;
			case 'country':
				result.country = value;
				break;
			case 'production':
				result.production = value.split(',').map((item) => item.trim());
				break;
		}
	});
	$('.film_list-wrap .flw-item').each((index, element) => {
		result.recommendations.push(formatCard(element));
	});

	$$('.nav-item').each((index, element) => {
		const id = $$(element).find('a').attr('href');
		const name = $$(element).find('a').text().trim();
		result.providers.push({ id, name });
	});


	if (params.format.toLowerCase() === 'tv') {
		const seasons = [];
		const episodes = [];
		const { data: seasonsText } = await axios.get(`${baseUrl}/ajax/season/list/${id}`);

		const $ = cheerio.load(seasonsText);
		$('.dropdown-menu a').each((index, element) => {
			const id = Number($(element).attr('data-id'));
			const number = Number($(element).text().trim().replace('Season ', ''));
			seasons.push({ id, number });
		});
		const minSeasonNumber = seasons.reduce((min, season) => {
			return season.number < min ? season.number : min;
		}, Infinity);

		const minSeasonObject = seasons.find((season) => season.number === minSeasonNumber);
		const { data: episodesText } = await axios.get(
			`${baseUrl}/ajax/season/episodes/${minSeasonObject.id}`
		);
		const $$ = cheerio.load(episodesText);
		$$('.nav-item').each((index, element) => {
			episodes.push({
				title: $$(element).find('a').text().trim().split(': ')[1],
				number: Number(
					$$(element).find('a').text().trim().split(': ')[0].replace('Eps ', ' ').trim()
				),
				id: $$(element).find('a').attr('data-id')
			});
		});
		result.seasons = seasons;
		result.episodes = episodes;
	}
	return result;
}
