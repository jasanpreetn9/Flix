<script>
	export let data;
	import { MovieCard, Details, Gradient } from '$lib/components';
</script>

<Gradient {data}>
	<Details {data} />

	<!-- Episodes Start -->
	{#if data.seasons}
		<div class="episodes-container">
			<div class="header"></div>
			<div class="episodes-cards">
				{#each data.episodes as episode}
					<div class="episode-card">
						<a href="/">
							<strong>
								Eps {episode.number}:
							</strong>
							{episode.title}
						</a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	<!-- Episodes End -->

	<!-- Recommend Start -->
	<div class="cards-container">
		<div class="header">
			<h1>You may also like</h1>
		</div>
		<div class="cards">
			{#each data.recommendations as card}
				<MovieCard {card} />
			{/each}
		</div>
	</div>
	<!-- Recommend End -->
</Gradient>

<style>
	.episodes-container {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
		display: flex;
		flex-direction: row;
		padding: 30px;
		margin-bottom: 30px;
	}
	.episodes-cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
		width: 100%;
	}

	.episode-card {
		background-color: #f3f3f3;
		font-size: 15px;
		border-radius: 3px;
		height: 43px;
		background: rgba(22, 22, 22, 0.05);
		padding: 12px 20px;
		width: 250px;
	}
	.episode-card a {
		font-size: 15px;
		text-align: left;
		color: #111;
		overflow: hidden;
		text-decoration: none;
		font-weight: 300;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
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
