<script>
	import { MovieCard, Pagination } from '$lib/components';
	export let data;
	$: ({ searchResults, searchQuery, pagination } = data);
</script>

<div class="cards-container">
	<div class="header">
		<h1>Search results for: <i>{searchQuery}</i></h1>
	</div>
	<Pagination {pagination} />
	<div class="cards">
		{#each searchResults as card}
			<MovieCard {card} />
		{/each}
	</div>
	<Pagination {pagination} />
</div>

<style>
	.cards-container {
		padding: 0 2%;
	}
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
