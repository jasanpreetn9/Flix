<script>
	export let episodes, seasons, details,currentEpisodeId;
	import { clickOutside } from '$lib/utils';
	import { Icon, ListBullet, ChevronDown } from 'svelte-hero-icons';
	let showDropdown = false;
	let currentSeasonId = 1;
	currentSeasonId = seasons[0].id;
</script>

<div class="episodes-container">
	<div class="header">
		<div class="dropdown" use:clickOutside on:click_outside={() => (showDropdown = false)}>
			<button on:click={() => (showDropdown = !showDropdown)} class="drop-btn">
				<Icon src={ListBullet} size="20" style="margin-right: 10px;" />
				{seasons.filter((item) => item.id == currentSeasonId)[0].title}
				<Icon src={ChevronDown} size="17" />
			</button>
			{#if showDropdown}
				<div class="dropdown-content">
					{#each seasons as item}
						<button
							class={currentSeasonId == item.id ? 'active' : ''}
							on:click={() => {
								currentSeasonId = item.id;
								showDropdown = false;
							}}
						>
							{item.title}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<div class="episodes-cards">
		{#each episodes.filter((item) => item.seasonId == currentSeasonId) as episode}
			<div class={currentEpisodeId == episode.episodeId ? "episode-card active" : "episode-card"}>
				<a href={`/watch/${details.format}/${details.movieId}.${episode.episodeId}`}>
					<strong>
						Eps {episode.number}:
					</strong>
					{episode.title}
				</a>
			</div>
		{/each}
	</div>
</div>

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
		width: 100%;
	}
	.episodes-container .header .drop-btn {
		color: black;
		border: none;
		cursor: pointer;
		background-color: transparent;
		color: white;
		font-size: 15px;
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
		overflow-y: auto;
		max-height: 200px;
	}
	.dropdown-content button {
		padding: 10px 25px;
		background-color: transparent;
		border: none;
		border-radius: 4px;
		color: #8e95a5;
		text-align: left;
		font-size: 13px;
		cursor: pointer;
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
	.active {
		background-color: var(--primary);
		color: white;
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
</style>
