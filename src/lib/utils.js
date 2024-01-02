import * as cheerio from 'cheerio';
export const myflixerUrl = 'https://myflixerz.to';

export function clickOutside(node) {
	const handleClick = (event) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('click_outside', node));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}


export const genres = [
	{ href: 'action', title: 'Action' },
	{ href: 'action-adventure', title: 'Action &amp; Adventure' },
	{ href: 'adventure', title: 'Adventure' },
	{ href: 'animation', title: 'Animation' },
	{ href: 'biography', title: 'Biography' },
	{ href: 'comedy', title: 'Comedy' },
	{ href: 'crime', title: 'Crime' },
	{ href: 'documentary', title: 'Documentary' },
	{ href: 'drama', title: 'Drama' },
	{ href: 'family', title: 'Family' },
	{ href: 'fantasy', title: 'Fantasy' },
	{ href: 'history', title: 'History' },
	{ href: 'horror', title: 'Horror' },
	{ href: 'kids', title: 'Kids' },
	{ href: 'music', title: 'Music' },
	{ href: 'mystery', title: 'Mystery' },
	{ href: 'news', title: 'News' },
	{ href: 'reality', title: 'Reality' },
	{ href: 'romance', title: 'Romance' },
	{ href: 'sci-fi-fantasy', title: 'Sci-Fi &amp; Fantasy' },
	{ href: 'science-fiction', title: 'Science Fiction' },
	{ href: 'soap', title: 'Soap' },
	{ href: 'talk', title: 'Talk' },
	{ href: 'thriller', title: 'Thriller' },
	{ href: 'tv-movie', title: 'TV Movie' },
	{ href: 'war', title: 'War' },
	{ href: 'war-politics', title: 'War &amp; Politics' },
	{ href: 'western', title: 'Western' }
];

export const countries = [
	{ href: '/country/AR', title: 'Argentina' },
	{ href: '/country/AU', title: 'Australia' },
	{ href: '/country/AT', title: 'Austria' },
	{ href: '/country/BE', title: 'Belgium' },
	{ href: '/country/BR', title: 'Brazil' },
	{ href: '/country/CA', title: 'Canada' },
	{ href: '/country/CN', title: 'China' },
	{ href: '/country/CZ', title: 'Czech Republic' },
	{ href: '/country/DK', title: 'Denmark' },
	{ href: '/country/FI', title: 'Finland' },
	{ href: '/country/FR', title: 'France' },
	{ href: '/country/DE', title: 'Germany' },
	{ href: '/country/HK', title: 'Hong Kong' },
	{ href: '/country/HU', title: 'Hungary' },
	{ href: '/country/IN', title: 'India' },
	{ href: '/country/IE', title: 'Ireland' },
	{ href: '/country/IL', title: 'Israel' },
	{ href: '/country/IT', title: 'Italy' },
	{ href: '/country/JP', title: 'Japan' },
	{ href: '/country/LU', title: 'Luxembourg' },
	{ href: '/country/MX', title: 'Mexico' },
	{ href: '/country/NL', title: 'Netherlands' },
	{ href: '/country/NZ', title: 'New Zealand' },
	{ href: '/country/NO', title: 'Norway' },
	{ href: '/country/PL', title: 'Poland' },
	{ href: '/country/RO', title: 'Romania' },
	{ href: '/country/RU', title: 'Russia' },
	{ href: '/country/ZA', title: 'South Africa' },
	{ href: '/country/KR', title: 'South Korea' },
	{ href: '/country/ES', title: 'Spain' },
	{ href: '/country/SE', title: 'Sweden' },
	{ href: '/country/CH', title: 'Switzerland' },
	{ href: '/country/TW', title: 'Taiwan' },
	{ href: '/country/TH', title: 'Thailand' },
	{ href: '/country/GB', title: 'United Kingdom' },
	{ href: '/country/US', title: 'United States of America' }
];
