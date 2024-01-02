<script>
	import '$lib/global.css';
	import { Icon, MagnifyingGlass, Bars3 } from 'svelte-hero-icons';
	import { genres } from '$lib/utils';
</script>

<nav>
	<a href="/" class="icon">
		<img src="https://myflixerz.to/images/group_1/theme_7/logo.png?v=0.1" alt="Icon" />
	</a>
	<ul>
		<li><a class="nav-item" href="/">Home</a></li>
		<li><p class="genre nav-item">Genre</p></li>
		<li><a class="nav-item" href="/">Country</a></li>
		<li><a class="nav-item" href="/movies">Movies</a></li>
		<li><a class="nav-item" href="/tv-shows">TV Shows</a></li>
		<li><a class="nav-item" href="/">Top IMDB</a></li>
	</ul>
	<div class="right-container">
		<form action="/search" method="POST" class="navbar-search-container">
			<button type="submit">
				<Icon src={MagnifyingGlass} size="22" color="white" />
			</button>
			<input type="text" name="search" class="search" placeholder="Search" />
		</form>
		<a href="/login" class="login-btn">Login</a>
	</div>
</nav>

<main>
	<slot />
</main>

<style>
	nav {
		display: flex;
		height: 65px;
		align-items: center;
		padding: 2.4% 3%;
		/* margin-bottom: 20px; */
	}
	nav a {
		margin-right: 30px;
	}
	nav a img {
		height: 35px;
		width: 35px;
	}
	nav ul {
		display: flex;
		list-style: none;
		color: white;
	}
	nav ul li {
		margin: 0 3px;
	}
	.nav-item {
		height: 65px;
		line-height: 65px;
		margin: 0;
		padding: 0 20px;
		color: #fff;
		display: inline-block;
		font-size: 14px;
		font-weight: 400;
		letter-spacing: 1px;
		text-decoration: none;
	}
	.right-container {
		margin-left: auto;
		display: flex;
		align-items: center;
	}
	.right-container form {
		height: 40px;
		display: flex;
		background-color: #ffffff33;
		border-radius: 12px;
		align-items: center;
		padding: 10px;
		margin-right: 13px;
	}
	.right-container form button {
		background-color: transparent;
		border: none;
		cursor: pointer;
	}
	.right-container form input {
		outline: none;
		height: 40px;
		width: 200px;
		font-size: 14px;
		font-weight: 300;
		color: white;
		border-radius: 12px;
		border: none;
		box-shadow: none;
		margin-left: 10px;
		background-color: transparent;
	}
	.right-container .login-btn {
		color: white;
		font-weight: 500;
		padding: 10px 14px;
		display: flex;
		justify-content: center;
		border-radius: 5px;
		font-size: 15px;
		background: var(--primary);
		border: none;
		cursor: pointer;
		text-decoration: none;
	}
	/* Responsive styles for tablets */
	@media (max-width: 768px) {
		.nav-item {
			padding: 0 15px; /* Reduced padding */
		}
	}

	/* Responsive styles for phones */
	@media (max-width: 480px) {
		.nav-item {
			padding: 0 10px; /* Even more reduced padding */
		}

		/* Additional responsive adjustments can go here */
		.right-container form input {
			width: 150px; /* Adjust input width for smaller screens */
		}
	}
</style>
