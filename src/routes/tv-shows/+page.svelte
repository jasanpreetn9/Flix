<script>
	import { MovieCard,Pagination } from '$lib/components';
	export let data;
	const { pagination,result } = data;
</script>

<div class="container">
	<div class="header">
		<h1>Popular TV Shows</h1>
	</div>
	<Pagination {pagination} />
	<div class="cards-container">
		{#each result as card}
			<MovieCard {card} />
		{/each}
	</div>
	<Pagination {pagination} />
</div>

<style>
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		text-align: center;
		margin-bottom: 10px;
	}
	.header h1 {
		opacity: 0.9;
		text-transform: capitalize;
		font-size: 1.8em;
		font-weight: 300;
		margin-right: 10px;
		color: #e9ecef;
		line-height: 34px;
		font-size: 1.8em !important;
		line-height: 34px;
		height: 34px;
		padding: 0;
		margin: 0;
		color: #e9ecef;
		font-weight: 300;
	}
	
	.cards-container {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		margin-bottom: 30px;
	}
</style>
