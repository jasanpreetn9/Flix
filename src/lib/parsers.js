import * as cheerio from 'cheerio';

export const parseMovieCard = (element) => {
	const $ = cheerio.load(element);

	// Extracting the title
	const title = $('.film-detail .film-name').text().trim();

	// Extracting the type and converting it to lowercase
	const type = $('.film-detail .fd-infor .fdi-type').text().trim().toLowerCase();

	// Extracting the ID from the URL
	const id = $('.film-name a').attr('href').split('/')[2].replace("watch-","");
	
	// Extracting the quality information
	const quality = $('.film-poster .film-poster-quality').text().trim();

	// Extracting the image URL
	const img = $('.film-poster img').attr('data-src');

	// Extracting duration based on the type of content (TV or Movie)
	let info = [];
	$('.fdi-item').each((index, element) => {
		info.push($(element).text().trim());
	});
	info = info.join(' • ');
	// Return the formatted data as an object
	return {
		title,
		type,
		id,
		quality,
		img,
		info
	};
};

export const parsePagination = (element) => {
	const $ = cheerio.load(element);
	return {
		title: $(element).find('a').text().trim(),
		href: $(element).find('a').attr('href'),
		active: $(element).hasClass('active')
	};
};

export const parseDetails = (element, id, format) => {
	const $ = cheerio.load(element);

	const result = {
		id,
		banner: $('.cover_follow')
			.attr('style')
			?.match(/url\((.*?)\)/)[1]
			?.replace(/['"]/g, ''),
		poster: $('.film-poster img').attr('src'),
		title: $('.heading-name a').text(),
		quality: $('.btn-quality').text().trim(),
		imdbRating: Number($('.btn-imdb').text().trim().replace('IMDB: ', '')),
		description: $('.description').text().trim(),
		format: format.toLowerCase(),
		released: '',
		genres: [],
		casts: [],
		duration: '',
		country: [],
		production: [],
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
				// result.genre = value.split(',').map((item) => item.trim());
				$(element)
					.find('a')
					.each((index, aTag) => {
						result.genres.push({
							title: $(aTag).attr('title'),
							href: $(aTag).attr('href').replace('/genre/', '')
						});
					});
				break;
			case 'casts':
				// result.casts = value.split(',').map((item) => item.trim());
				$(element)
					.find('a')
					.each((index, aTag) => {
						result.casts.push({
							title: $(aTag).attr('title'),
							href: $(aTag).attr('href').replace('/cast/', '')
						});
					});
				break;
			case 'duration':
				result.duration = parseInt(value);
				break;
			case 'country':
				$(element)
					.find('a')
					.each((index, aTag) => {
						result.country.push({
							title: $(aTag).attr('title'),
							href: $(aTag).attr('href').replace('/country/', '')
						});
					});
				break;
			case 'production':
				// result.production = value.split(',').map((item) => item.trim());
				$(element)
					.find('a')
					.each((index, aTag) => {
						result.production.push({
							title: $(aTag).attr('title'),
							href: $(aTag).attr('href').replace('/production/', '')
						});
					});
				break;
		}
	});
	$('.film_list-wrap .flw-item').each((index, element) => {
		result.recommendations.push(parseMovieCard(element));
	});
	return result;
};

export function parseEpisodes(html, season) {
	const results = [];
	const $ = cheerio.load(html);
	$('.nav-item').each((index, element) => {
		results.push({
			title: $(element).find('a').text().trim().split(': ')[1],
			episodeId: $(element).find('a').attr('data-id'),
			number: Number($(element).find('a').text().trim().split(': ')[0].replace('Eps ', ' ').trim()),
			seasonId: season.id,
			season: season.title
		});
	});
	return results;
}

export function parseSeasons(html) {
	const results = [];
	const $ = cheerio.load(html);
	$('.dropdown-menu a').each((index, element) => {
		results.push({
			id: Number($(element).attr('data-id')),
			title: $(element).text().trim()
		});
	});
	return results;
}
