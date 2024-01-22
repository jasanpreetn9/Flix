import * as cheerio from 'cheerio';
import axios from 'axios';
import { parseMovieCard, parseDetails } from '$lib/parsers';
import { myflixerUrl } from '$lib/utils';

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
	const slidersId = [];
	$('.swiper-wrapper .swiper-slide').each((index, element) => {
		slidersId.push({
			id: $(element).find('.slide-link').attr('href').split('watch-')[1],
			format: $(element).find('.slide-link').attr('href').split('watch-')[0].replaceAll('/', '')
		});
	});
	const axiosSliderPromises = [];
	for (const index in slidersId) {
		const slider = slidersId[index];

		axiosSliderPromises.push(
			axios.get(`${myflixerUrl}/${slider.format}/${slider.id}`).then(({ data }) => {
				result.sliders.push(parseDetails(data, slider.id, slider.format));
			})
		);
	}
	await Promise.all(axiosSliderPromises);
	
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
