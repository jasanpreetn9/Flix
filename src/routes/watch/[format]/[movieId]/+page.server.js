import axios from 'axios';
import { myflixerUrl } from '$lib/utils';
import { MOVIES } from '@consumet/extensions';
import { parseDetails, parseEpisodes, parseSeasons } from '$lib/parsers';

// Episodes Providers: https://myflixerz.to/ajax/episode/list/103714
// Episodes Seasons: https://myflixerz.to/ajax/season/list/39480
// Episodes URL: https://myflixerz.to/ajax/season/episodes/626
// 39480
export async function load({ params, url }) {
	const flixhq = new MOVIES.FlixHQ();
	const format = params.format.toLowerCase();
	const movieId = params.movieId.split(".")[0];
	const parts = movieId.split('-');
	const id = parts[parts.length - 1];
	
	const fetchDetails = async () => {
		const { data } = await axios.get(`${myflixerUrl}/${format}/${movieId}`);
		return parseDetails(data, movieId, format);
	};

	const streamingData = async () => {
		let seasons;
		const episodePromises = [];
		const episodes = [];
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

	const getSources = async () => {
		if (format == 'movie') {
			console.log(id,format,params.movieId)
			const sources = await flixhq.fetchEpisodeSources(id, `${format}/${params.movieId}`);
			return sources
		} else {
			const episodesId = params.movieId.split(".")[1]
			const sources = await flixhq.fetchEpisodeSources(episodesId, `${format}/${movieId}`);
			return sources
		}
	};

	return {
		details: await fetchDetails(),
		currentEpisodeId: params.movieId.split(".")[1],
		streamed: {
			movieEpisodes: streamingData(),
			streamingData: getSources()
		}
	};
}

