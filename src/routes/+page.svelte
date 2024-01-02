<script>
	export let data;
	import 'iconify-icon';
	import Siema from 'siema';
	import { onMount } from 'svelte';
	import { MovieCard } from '$lib/components';
	import { Icon, Play, ListBullet, ChevronRight, ChevronLeft } from 'svelte-hero-icons';
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
		<button on:click={prev} class="pre-btn">
			<Icon src={ChevronLeft} size="20px" color="white" />
		</button>
		<button on:click={next} class="nxt-btn">
			<Icon src={ChevronRight} size="20px" color="white" />
		</button>
		<div class="carousel">
			{#each sliders as movie}
				<div class="slider">
					<div class="slide-content">
						<h1 class="movie-title">
							{movie.title}
						</h1>
						<div class="badges-container">
							<!-- HD Duration IMDB Genre-->
							<p class="badges">
								Duration: {movie?.duration}
							</p>
							<span class="dots" />
							<p class="badges">IMDB: {movie?.imdbRating}</p>
							<span class="dots" />
							<p class="badges">Genre: {movie?.genre}</p>
						</div>
						<p class="movie-des">
							{movie?.description}
						</p>
						<a class="watch-btn" href={`/details/${movie?.idMal}`}>Watch</a>
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

	<div class="header">
		<h1>Trending</h1>
		<div class="button-container">
			<button on:click={() => (showMovies = true)} class={showMovies ? 'button-active' : ''}>
				<Icon src={Play} size="14" mini style="margin-right: 5px;" />

				Movies
			</button>
			<button on:click={() => (showMovies = false)} class={showMovies ? '' : 'button-active'}>
				<Icon src={ListBullet} size="14" mini style="margin-right: 5px" />
				Tv Shows
			</button>
		</div>
	</div>
	<div class="cards-container">
		{#each showMovies ? trendingMovies : trendingTv as card}
			<MovieCard {card} />
		{/each}
	</div>

	<div class="header">
		<h1>Latest Movies</h1>
	</div>
	<div class="cards-container">
		{#each latestMovies as card}
			<MovieCard {card} />
		{/each}
	</div>

	<div class="header">
		<h1>Latest Tv Shows</h1>
	</div>
	<div class="cards-container">
		{#each latestTv as card}
			<MovieCard {card} />
		{/each}
	</div>

	<div class="header">
		<h1>Coming Soon</h1>
	</div>
	<div class="cards-container">
		{#each comingSoon as card}
			<MovieCard {card} />
		{/each}
	</div>
</div>

<style>
	.carousel-container {
		position: relative;
		width: 100%;
		padding: 10px 0;
		border-radius: 5px;
		overflow: hidden;
	}

	.pre-btn,
	.nxt-btn {
		position: absolute;
		top: 0;
		width: 3%;
		height: 100%;
		z-index: 2;
		border: none;
		cursor: pointer;
		outline: none;
		background-color: transparent;
	}

	.pre-btn {
		left: 0;
	}

	.nxt-btn {
		right: 0;
	}

	.carousel {
		position: relative;
		margin: auto;
		height: 400px;
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
		height: 400px;
		align-items: center;
		justify-content: center;
		align-items: center;
	}

	.slider img {
		margin: 0 auto;
		height: 100%;
		width: 100%;
		object-fit: cover;
		opacity: 0.7;
		border-radius: 5px;
		position: absolute;
	}

	.banner-gradient {
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(rgba(2, 9, 22, 1) 0.42%, rgba(3, 10, 21, 0) 50.42%, #020916 95.38%);
	}
	.slide-content {
		position: absolute;
		width: 100%;
		height: 60%;
		padding-left: 50px;
		z-index: 2;
		color: #fff;
	}

	.movie-title {
		width: 100%;
		max-width: 300px;
		text-transform: capitalize;
		margin-top: 20px;
		font-size: 27px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.badges-container {
		display: flex;
		flex-wrap: wrap;
		max-width: 300px;
	}

	.badges {
		margin-top: 10px;
		padding: 6px;
		border-radius: 16px;
		text-align: center;
		font-size: 14px;
		margin-right: 3px;
		opacity: 85%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.dots {
		margin-top: 21.5px;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: white;
		display: inline-block;
	}

	.movie-des {
		width: 40%;
		line-height: 24px;
		margin-top: 5px;
		opacity: 0.9;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-size: 14px;
		margin-bottom: 15px;
	}

	.watch-btn {
		background: var(--primary);
		padding: 10px;
		color: #fff;
		border-radius: 5px;
		border: none;
		outline: none;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		cursor: pointer;
		text-decoration: none;
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

	@media (max-width: 768px) {
		.carousel-container {
			padding: 5px 0;
		}

		.carousel {
			height: 250px;
		}

		.slider {
			margin-right: 15px;
			height: 300px;
		}

		.slider img {
			border-radius: 3px;
		}
		.movie-des {
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			width: 70%;
		}
	}

	@media (max-width: 756px) {
		.carousel {
			height: 280px;
		}

		.slider {
			margin-right: 10px;
			height: 250px;
		}
		.nxt-btn {
			margin-right: 10px;
		}
	}

	.container {
		padding: 0 3%;
	}
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
		font-size: 1.2em;
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
		/* border-bottom: var(--secondary) 1px solid; */
	}
	.header .button-container {
		display: flex;
		flex-direction: row;
		height: 100%;
		margin-left: 20px;
		
	}
	.header .button-container button {
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
	}
	.header .button-container button.button-active {
		background: var(--primary);
		color: var(--tertiary);
	}
	.cards-container {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		margin-bottom: 30px;
	}
</style>
