import * as cheerio from 'cheerio';
export const baseUrl = 'https://myflixerz.to';

export function clickOutside(node) {
  
	const handleClick = event => {
	  if (node && !node.contains(event.target) && !event.defaultPrevented) {
		node.dispatchEvent(
		  new CustomEvent('click_outside', node)
		)
	  }
	}
  
	  document.addEventListener('click', handleClick, true);
	
	return {
	  destroy() {
		document.removeEventListener('click', handleClick, true);
	  }
	  }
  }

export const formatCard = (element) => {
	const $ = cheerio.load(element);

	// Extracting the title
	const title = $('.film-detail .film-name').text().trim();

	// Extracting the type and converting it to lowercase
	const type = $('.film-detail .fd-infor .fdi-type').text().trim().toLowerCase();

	// Extracting the ID from the URL
	const id = $('.film-name a').attr('href').split('/')[2];

	// Extracting the quality information
	const quality = $('.film-poster .film-poster-quality').text().trim();

	// Extracting the image URL
	const img = $('.film-poster img').attr('data-src');

	// Extracting duration based on the type of content (TV or Movie)
	let info = [];
	$(".fdi-item").each((index,element) => {
		info.push($(element).text().trim());
	})
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
