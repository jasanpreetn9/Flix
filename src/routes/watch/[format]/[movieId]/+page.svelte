<script>
	export let data;
	const { streamed, details,currentEpisodeId } = data;
	import { MovieCard, Details, Gradient, Episodes, Artplayer } from '$lib/components';
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

	<div class="cards-container">
		<div class="header">
			<h1>You may also like</h1>
		</div>
		<div class="cards">
			{#each details.recommendations as card}
				<MovieCard {card} />
			{/each}
		</div>
	</div>
</Gradient>

<style>
	.cards-container .header {
		display: flex;
		flex-direction: row;
		align-items: center;
		text-align: center;
		margin-bottom: 10px;
		/* color: black; */
	}
	.cards-container .header h1 {
		opacity: 0.9;
		text-transform: capitalize;
		font-size: 24px;
		font-weight: 300;
		margin-right: 10px;
	}

	.cards-container .cards {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		margin-bottom: 30px;
	}
</style>
