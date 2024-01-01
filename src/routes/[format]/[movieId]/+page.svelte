<script>
	export let data;
	const { details, streamed } = data;
	import { clickOutside } from '$lib/utils';
	import { MovieCard, Details, Gradient } from '$lib/components';
	import { Icon, ListBullet, ChevronDown } from 'svelte-hero-icons';
	let showDropdown = false;
	let currentSeason = 1;
	// console.log(data);
</script>

<Gradient {details}>
	<Details {details} />

	<!-- Episodes Start -->
	{#if details.format == 'tv'}
		{#await streamed.streamingData then { episodes, seasons }}
			<div class="episodes-container">
				<div class="header">
					<div class="dropdown">
						<button on:click={() => (showDropdown = !showDropdown)} class="dropbtn">
							<Icon src={ListBullet} size="22" style="margin-right: 5px;" />
							Dropdown
							<Icon src={ChevronDown} size="22" />
						</button>
						{#if showDropdown}
							<div
								class="dropdown-content"
								use:clickOutside
								on:click_outside={() => (showDropdown = false)}
							>
								{#each seasons as item}
									<button class={currentSeason == item.seasonNumber ? "active" : ""}>Season {item.seasonNumber}</button>
								{/each}
							</div>
						{/if}
					</div>
				</div>
				<div class="episodes-cards">
					{#each episodes as episode}
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
		{/await}
	{/if}
	<!-- Episodes End -->

	<!-- Recommend Start -->
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
	<!-- Recommend End -->
</Gradient>

<style>
	.episodes-container {
		background-color: #0a1220;
		border-radius: 10px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
		display: flex;
		flex-direction: column;
		padding: 30px;
		margin-bottom: 30px;
		color: white;
	}
	.episodes-container .header {
		display: flex;
		flex-direction: row;
		margin-bottom: 20px;
	}
	.episodes-container .header button {
		color: black;
		border: none;
		cursor: pointer;
		background-color: transparent;
		color: white;
		font-size: 18px;
		display: flex;
		flex-direction: row;
		align-items: center;
		cursor: pointer;
	}

	.dropdown-content {
		position: absolute;
		display: flex;
		flex-direction: column;
		background-color: #1e2735;
		border-radius: 5px;
	}
	.dropdown-content button.active {
		background-color: var(--primary);
		color: white;
	}
	.dropdown-content button.active:hover {
		background-color: var(--primary);
	}
	.dropdown-content button:hover {
		background-color: #111926;
		/* color: white; */
	}
	.episodes-cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
		width: 100%;
	}

	.episode-card {
		background-color: #111926 !important;
		font-size: 15px;
		border-radius: 3px;
		height: 43px;
		padding: 12px 20px;
		width: 250px;
	}
	.episode-card a {
		font-size: 15px;
		text-align: left;
		/* color: #111; */
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
