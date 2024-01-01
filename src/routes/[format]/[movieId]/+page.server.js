import * as cheerio from 'cheerio';
import axios from 'axios';
import { baseUrl, formatCard } from '$lib/utils';

// Episodes Providers: https://myflixerz.to/ajax/episode/list/103714
// Episodes Seasons: https://myflixerz.to/ajax/season/list/39480
// Episodes URL: https://myflixerz.to/ajax/season/episodes/626
function parseSeasons(html) {
	const results = [];
	const $ = cheerio.load(html);
	$('.dropdown-menu a').each((index, element) => {
		results.push({
			seasonId: Number($(element).attr('data-id')),
			seasonNumber: Number($(element).text().trim().replace('Season ', ''))
		});
	});
	return results;
}

function parseEpisodes(html, season) {
	const results = [];
	const $ = cheerio.load(html);
	$('.nav-item').each((index, element) => {
		results.push({
			title: $(element).find('a').text().trim().split(': ')[1],
			episodeId: $(element).find('a').attr('data-id'),
			number: Number($(element).find('a').text().trim().split(': ')[0].replace('Eps ', ' ').trim()),
			...season
		});
	});
	return results;
}

export async function load({ params, url }) {
	const parts = params.movieId.split('-');
	const id = parts[parts.length - 1];
	const fetchDetails = async () => {
		const { data: details } = await axios.get(`${baseUrl}/${params.format}/${params.movieId}`);

		const $ = cheerio.load(details);

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
			released: '',
			genre: '',
			casts: '',
			duration: '',
			country: '',
			production: '',
			recommendations: '',
			recommendations: [],
			episodes: []
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
		return result;
	};

	const fetchEpisodes = async () => {
		const episodes = [];
		let seasons;
		if (params.format.toLowerCase() === 'tv') {
			const { data: seasonsText } = await axios.get(`${baseUrl}/ajax/season/list/${id}`);
			seasons = parseSeasons(seasonsText);
			for (const season of seasons) {
				const { data: episodesText } = await axios.get(
					`${baseUrl}/ajax/season/episodes/${season.seasonId}`
				);
				episodes.push(...parseEpisodes(episodesText, season));
			}
		}
		return { episodes, seasons };
	};
	return {
		details: await fetchDetails(),
		streamed: {
			streamingData: fetchEpisodes()
		}
	};
}
