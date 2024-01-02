import * as cheerio from 'cheerio';
import axios from 'axios';
import { parseMovieCard } from '$lib/parsers';
export async function load() {
	const { data } = await axios.get(`https://flixhq.pe/home`);
	const $ = cheerio.load(data);
	const result = {
		sliders: [],
		trendingMovies: [],
		trendingTv: [],
		latestMovies: [],
		latestTv: [],
		comingSoon: []
	};

	$('.swiper-wrapper .swiper-slide').each((index, element) => {
		const genres = $(element)
			.find('.scd-item:nth-child(4) strong a')
			.map((index, element) => ({
				title: $(element).text(),
				href: $(element).attr('href')
			}))
			.get();

		result.sliders.push({
			banner: $(element)
				.attr('style')
				.match(/url\((.*?)\)/)[1]
				.replace(/['"]/g, ''),
			title: $(element).find('.film-title').text(),
			image: $(element)
				.attr('style')
				.match(/url\((.*?)\)/)[1]
				.replace(/['"]/g, ''),
			id: $(element).find('a').attr('href').split('/watch-')[1],
			format: $(element).find('a').attr('href').split('/watch-')[0].replace('/', ''),
			quality: $(element).find('.quality').text(),
			duration: $(element).find('.scd-item:nth-child(2) strong').text(),
			imdbRating: $(element).find('.scd-item:nth-child(3) strong').text(),
			genres,
			description: $(element).find('.sc-desc').text()
		});
	});

	$('#trending-movies .flw-item').each((index, element) => {
		result.trendingMovies.push(parseMovieCard(element));
	});

	$('#trending-tv .flw-item').each((index, element) => {
		result.trendingTv.push(parseMovieCard(element));
	});

	$("h2:contains('Latest Movies')")
		.parent()
		.parent()
		.parent()
		.find('.film_list-wrap .flw-item')
		.each((index, element) => {
			result.latestMovies.push(parseMovieCard(element));
		});
	$("h2:contains('Latest TV Shows')")
		.parent()
		.parent()
		.parent()
		.find('.film_list-wrap .flw-item')
		.each((index, element) => {
			result.latestTv.push(parseMovieCard(element));
		});
	$("h2:contains('Coming Soon')")
		.parent()
		.parent()
		.parent()
		.find('.film_list-wrap .flw-item')
		.each((index, element) => {
			result.comingSoon.push(parseMovieCard(element));
		});

	return result;
}
