<script>
	export let data;
	const { streamed, details,currentEpisodeId } = data;
	import { MovieCards, Details, Gradient, Episodes, Artplayer } from '$lib/components';
</script>

<Gradient {details}>
	{#await streamed.streamingData then streamingData}
		<Artplayer {streamingData}  />
	{/await}
	{#if details.format == 'tv'}
		{#await streamed.movieEpisodes then { episodes, seasons }}
			<Episodes {episodes} {seasons} {details} {currentEpisodeId} />
		{/await}
	{/if}
	<Details {details} />

	<MovieCards cards={details.recommendations} header="You may also like"/>
</Gradient>
