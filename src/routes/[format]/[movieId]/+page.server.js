import axios from 'axios';
import { myflixerUrl } from '$lib/utils';
import { parseDetails, parseEpisodes, parseSeasons } from '$lib/parsers';

// Episodes Providers: https://myflixerz.to/ajax/episode/list/103714
// Episodes Seasons: https://myflixerz.to/ajax/season/list/39480
// Episodes URL: https://myflixerz.to/ajax/season/episodes/626
// 39480

export async function load({ params, url }) {
	const parts = params.movieId.split('-');
	const id = parts[parts.length - 1];

	const fetchDetails = async () => {
		const { data } = await axios.get(`${myflixerUrl}/${params.format}/${params.movieId}`);
		return parseDetails(data, params.movieId, params.format);
	};

	const streamingData = async () => {
		let seasons;
		const episodePromises = [];
		const episodes = [];
		let format = params.format.toLowerCase();
		if (format === 'tv') {
			// fetch all the seasons
			const { data: seasonsText } = await axios.get(`${myflixerUrl}/ajax/season/list/${id}`);
			seasons = parseSeasons(seasonsText);
			// add all the season episodes to the episodePromises array to all be fetched at once
			for (const season of seasons) {
				episodePromises.push(
					axios.get(`${myflixerUrl}/ajax/season/episodes/${season.id}`).then(({ data }) => {
						const seasonEpisodes = parseEpisodes(data, season);
						episodes.push(...seasonEpisodes);
					})
				);
			}
			await Promise.all(episodePromises);
		}
		return { episodes, seasons };
	};

	return {
		details: await fetchDetails(),
		streamed: {
			streamingData: streamingData(),
		}
	};
}
