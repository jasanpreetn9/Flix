<script>
	export let details;
	export let marginTop = '0px';
	import { Icon, VideoCamera, Play, Plus } from 'svelte-hero-icons';
</script>

<div class="details" style={`margin-top: ${marginTop};`}>
	<div class="poster">
		<img src={details.poster} alt="" />
	</div>
	<div class="info">
		<div class="btn-container">
			<a href={`/watch/${details.format}/${details.movieId}`} class="watchNow-btn">
				<Icon src={Play} size="18" style="margin-right: 5px;" />
				Watch Now
			</a>
			<button class="favorite-btn">
				<Icon src={Plus} size="18" style="margin-right: 5px;" />
				Add to favorite
			</button>
		</div>
		<div class="btn-row">
			<a href="/" class="trailer-link">
				<Icon src={VideoCamera} size="18" style="margin-right: 5px;" />
				Trailer
			</a>
			<p class="quality">
				{details.quality}
			</p>
		</div>
		<p class="title">{details.title}</p>
		<p class="description">{details.description}</p>
		<div class="attributes">
			<p class="attribute">
				<strong>Released: </strong>
				{details.released}
			</p>

			<p class="attribute">
				<strong>Genre: </strong>
				<!-- {details.genre.join(', ')} -->
				{#each details.genres as genre}
					<a href={`/genre/${genre.href}`}>{genre.title}</a>
				{/each}
			</p>

			<p class="attribute">
				<strong>Casts: </strong>
				{#each details.casts as cast}
					<a href={`/cast/${cast.href}`}>{cast.title}</a>
				{/each}
			</p>

			<p class="attribute">
				<strong>Duration: </strong>
				{details.duration}m
			</p>

			<p class="attribute">
				<strong>Country: </strong>
				{#each details.country as cast}
					<a href={`/country/${cast.href}`}>{cast.title}</a>
				{/each}
			</p>

			<p class="attribute">
				<strong>Production: </strong>
				{#each details.production as cast}
					<a href={`/production/${cast.href}`}>{cast.title}</a>
				{/each}
			</p>
		</div>
	</div>
</div>

<style>
	.details {
		display: flex;
		flex-direction: row;
		background-color: #0a1220;
		border-radius: 10px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
		padding: 30px;
		margin-bottom: 30px;
	}

	.details .poster img {
		margin-right: 30px;
		border-radius: 10px;
		width: 250px;
	}
	.details .info {
		width: 100%;
	}
	.btn-container {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15px;
	}
	.watchNow-btn {
		background-color: var(--primary);
		color: white;
		border: none;
		cursor: pointer;
		padding: 10px 17px;
		border-radius: 20px;
		font-size: 15px;
		font-weight: 500;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.favorite-btn {
		background-color: #e2e6ea;
		color: black;
		border: none;
		cursor: pointer;
		padding: 10px;
		border-radius: 20px;
		font-size: 15px;
		font-weight: 500;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.info .title {
		font-size: 2.5em;
		line-height: 1.3em;
		margin: 0 0 15px;
		font-weight: 300;
		text-decoration: none;
		/* color: black; */
	}
	.info .title:hover {
		color: var(--primary);
	}
	.btn-row {
		display: flex;
		flex-direction: row;
	}
	.trailer-link {
		display: flex;
		align-items: center;
		text-decoration: none;
		font-size: 15px;
		font-weight: 500;
		border: 1px solid #6a727a;
		border-radius: 3px;
		width: max-content;
		margin-right: 5px;
		padding: 6px;
	}
	.quality {
		display: flex;
		align-items: center;
		text-decoration: none;
		font-size: 15px;
		font-weight: 500;
		/* color: black; */
		border: 1px solid #6a727a;
		border-radius: 3px;
		width: max-content;
		padding: 6px;
	}
	.description {
		font-size: 15px;
		line-height: 1.5em;
		margin: 0 0 15px;
		font-weight: 300;
	}
	.attributes {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		gap: 1em 1em;
	}
	/* .attributes .attribute {
		 display: flex;
		flex-direction: row;
		margin-bottom: 10px;
		font-size: 16px;
	} */
	.attributes .attribute a:hover {
		color: var(--primary);
	}
	.attributes .attribute a + a:before {
		content: ', ';
	}
	.attributes .attribute strong {
		margin-right: 4px;
	}
</style>
