<script>
	export let data;
	import 'iconify-icon';
	import Siema from 'siema';
	import { onMount } from 'svelte';
	import { MovieCards } from '$lib/components';
	import { Icon, Play, ListBullet } from 'svelte-hero-icons';
	const { sliders, trendingMovies, trendingTv, latestMovies, latestTv, comingSoon } = data;

	let slider, prev, next, radioSlider;
	let select = 0;
	let timer;
	let showMovies = true;

	onMount(() => {
		slider = new Siema({
			selector: '.carousel',
			duration: 500,
			easing: 'ease-in-out',
			perPage: 1,
			startIndex: 0,
			draggable: true,
			multipleDrag: true,
			threshold: 20,
			loop: true,
			rtl: false,
			onInit: () => {},
			onChange: () => {
				select = slider.currentSlide;
				restartTimer();
			}
		});
		prev = () => {
			slider.prev();
			restartTimer();
		};

		next = () => {
			slider.next();
			restartTimer();
		};

		startTimer();
		function startTimer() {
			timer = setInterval(function () {
				slider.next();
			}, 3000);
		}

		function restartTimer() {
			clearInterval(timer);
			startTimer();
		}
	});
</script>

<div class="container">
	<div class="carousel-container">
		<div class="carousel">
			{#each sliders as movie}
				<div class="slider">
					<div class="slide-content">
						<h1 class="movie-title">
							{movie.title}
						</h1>

						<div class="attributes">
							<p class="quality">{movie.quality}</p>
							<p>Duration: {movie?.duration}</p>
							<p>IMDB: {movie?.imdbRating}</p>
							<p>Genre: {movie?.genres.map((item) => item.title).join(', ')}</p>
						</div>
						<p class="movie-des">
							{movie?.description}
						</p>
						<a class="watch-btn" href={`/`}>
							<Icon src={Play} size="14" mini style="margin-right: 5px;" />
							Watch
						</a>
					</div>
					<img src={movie?.banner} alt="" loading="lazy" />
					<div class="banner-gradient" />
				</div>
			{/each}
		</div>
	</div>

	<div class="bullet">
		{#each sliders as d, i}
			<input
				bind:this={radioSlider}
				type="radio"
				id={i}
				name="slider-radio"
				value={i}
				checked={select == i}
				on:click={() => {
					slider.goTo(i);
				}}
			/>
		{/each}
	</div>

	<MovieCards cards={showMovies ? trendingMovies : trendingTv} header="Trending">
		<div class="button-container" slot="header">
			<button on:click={() => (showMovies = true)} class={showMovies ? 'button-active' : ''}>
				<Icon src={Play} size="14" mini style="margin-right: 5px;" />
				Movies
			</button>
			<button on:click={() => (showMovies = false)} class={showMovies ? '' : 'button-active'}>
				<Icon src={ListBullet} size="14" mini style="margin-right: 5px" />
				Tv Shows
			</button>
		</div>
	</MovieCards>

	<MovieCards cards={latestMovies} header="Latest Movies" />
	<MovieCards cards={latestTv} header="Latest TV Shows" />
	<MovieCards cards={comingSoon} header="Coming Soon" />
</div>

<style>
	:root {
		--carouselHeight: 500px;
	}
	.carousel-container {
		position: relative;
		width: 100%;
		padding: 10px 0;
		border-radius: 5px;
		overflow: hidden;
	}

	.carousel {
		position: relative;
		margin: auto;
		height: max-content;
		border-radius: 5px;
		overflow: hidden;
	}

	.slider {
		flex: 0 0 auto;
		margin-right: 30px;
		position: relative;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		width: 100%;
		left: 0;
		transition: 1s;
		overflow: hidden;
		height: 500px;
	}

	.slider img {
		margin: 0 auto;
		width: 100%;
		object-fit: cover;
		opacity: 0.7;
		border-radius: 5px;
		position: absolute;
		height: 100%;
	}

	.banner-gradient {
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(rgba(3, 10, 21, 0) 10%, #020916 95.38%);
	}
	.slide-content {
		position: absolute;
		width: 100%;
		height: 100%;
		padding-left: 50px;
		z-index: 2;
		color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: end;
		padding-bottom: 50px;
	}

	.movie-title {
		width: 100%;
		max-width: 300px;
		text-transform: capitalize;
		font-size: 2.6em;
		font-weight: 700;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin: 0 0 10px 0;
		font-size: 2.6em;
		color: #fff;
		line-height: 1.3em;
		font-weight: 500;
		text-shadow: 0 1px 10px #111;
	}

	.attributes {
		display: flex;
		flex-direction: row;
		margin-bottom: 10px;
	}
	.attributes .quality {
		background: var(--primary);
		padding: 2px 12px;
		border-radius: 10px;
		color: var(--tertiary);
		font-size: 13px;
		font-weight: 400;
		margin-right: 10px;
		width: max-content;
	}
	.attributes p {
		margin-right: 10px;
		font-size: 14px;
	}
	.movie-des {
		width: 50%;
		margin-top: 5px;
		opacity: 0.9;
		font-size: 14px;
		color: #adb5bd;
		font-weight: 400;
		line-height: 1.5em;
		margin-bottom: 25px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.watch-btn {
		background: transparent;
		padding: 7px 20px;
		color: var(--primary);
		border: 1px solid var(--primary);
		border-radius: 20px;
		outline: none;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		cursor: pointer;
		text-decoration: none;
		width: fit-content;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.bullet {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}

	.bullet input {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border-radius: 50%;
		width: 10px;
		height: 10px;
		background-color: darkgrey;
		transition: 0.2s all linear;
		margin-right: 5px;
		position: relative;
		cursor: pointer;
		width: 40px;
		border-radius: 10px;
		height: 5px;
	}

	input:checked {
		background-color: var(--primary);
	}

	.button-container {
		display: flex;
		flex-direction: row;
		height: 100%;
		margin-left: 20px;
	}
	.button-container button {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-right: 10px;
		padding: 6px 14px;
		height: 100%;
		/* width: 20px; */
		border: none;
		border-radius: 5px;
		font-size: 13px;
		cursor: pointer;
		background-color: #2c3237;
		color: white;
	}
	.button-container button.button-active {
		background: var(--primary);
		color: var(--tertiary);
	}

	@media (max-width: 756px) {
		.slide-content {
			padding-left: 10px;
		}
		.carousel-container {
			padding: 2px 0;
		}
		.slider {
			margin-right: 10px;
			height: 250px;
			padding-bottom: 0;
		}
		.slider img {
			border-radius: 3px;
		}
		.movie-des {
			display: none;
		}
		.carousel {
			height: 280px;
		}

		.movie-title {
			font-size: 24px;
		}
	}
</style>
