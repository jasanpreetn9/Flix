<script>
	import '$lib/global.css';
	import { genres, logo, clickOutside } from '$lib/utils';
	import { Modal } from '$lib/components';
	import { page } from '$app/stores';
	$: isPadding = $page.url.pathname.includes('movie') || $page.url.pathname.includes('tv-show');
	import { Icon, MagnifyingGlass, Bars3 } from 'svelte-hero-icons';
	let showModal = false;
	let sideMenu = false;
</script>

<svelte:head>
	<title>FLix</title>
	<link rel="icon" href={logo} />
</svelte:head>

<nav>
	<button class="mobile-menu-btn" on:click={() => (sideMenu = !sideMenu)}>
		<Icon src={Bars3} size="22" color="white" />
	</button>
	{#if sideMenu}
		<div class="mobile-menu" use:clickOutside on:click_outside={() => (sideMenu = false)}>
			<ul>
				<li><a class="nav-item" href="/">Home</a></li>
				<li><a class="nav-item" href="/">Genre</a></li>
				<li><a class="nav-item" href="/">Country</a></li>
				<li><a class="nav-item" href="/movies">Movies</a></li>
				<li><a class="nav-item" href="/tv-shows">TV Shows</a></li>
				<li><a class="nav-item" href="/">Top IMDB</a></li>
			</ul>
		</div>
	{/if}
	<a href="/" class="icon">
		<img src={logo} alt="Icon" />
	</a>
	<ul class="nav-items">
		<li><a class="nav-item" href="/">Home</a></li>
		<li><p class="dropdown genre nav-item">Genre</p></li>
		<li><a class="dropdown country nav-item" href="/">Country</a></li>
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
		<button class="login-btn" on:click={() => (showModal = true)}>Login</button>
	</div>
</nav>
<!-- {#if showModal}
	<Modal bind:showModal>
		<form action="/login" method="POST" class="login">
			<h3>Login Here</h3>

			<label for="email">Email</label>
			<input type="text" placeholder="Email" name="email" />

			<label for="password">Password</label>
			<input type="password" placeholder="Password" name="password" />

			<button>Log In</button>
		</form>
	</Modal>
{/if} -->
<main style={isPadding ? '' : 'padding: 0 3%'}>
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
	.mobile-menu-btn {
		background-color: transparent;
		border: none;
		cursor: pointer;
		display: none;
		margin-right: 20px;
	}
	.mobile-menu {
		left: 0;
		z-index: 100;
		position: absolute;
		top: 70px;
		width: calc(100% - 30px);
		max-width: 400px;
		border-radius: 10px;
		padding: 10px 20px;
		background: #141e2d;
		color: #ccc;
		height: max-content;
		margin-left: 3%;
		display: -webkit-box;
		-webkit-transition: all 0.2s ease 0s;
	}
	.mobile-menu ul {
		display: flex;
		flex-direction: column;
		list-style: none;
		width: 100%;
	}
	.mobile-menu ul li {
		display: block;
		width: 100%;
		border-bottom: 1px solid #0f1722;
		position: relative;
	}
	.mobile-menu ul li a {
		display: block;
		padding: 15px 0;
		color: #bbb;
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

	/* .login h3 {
		font-size: 32px;
		font-weight: 500;
		line-height: 42px;
		text-align: center;
		color: white;
	}

	.login label {
		display: block;
		margin-top: 30px;
		font-size: 13px;
		font-weight: 400;
		color: white;
	}

	.login input {
		display: block;
		height: 40px;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.07);
		border-radius: 8px;
		padding: 0 10px;
		margin-top: 8px;
		font-size: 14px;
		font-weight: 300;
		border: none;
		color: white;
	} 

	::placeholder {
		color: #e5e5e5;
	}

	.login button {
		margin-top: 50px;
		width: 100%;
		background-color: var(--primary);
		color: #080710;
		padding: 15px 0;
		font-size: 18px;
		font-weight: 600;
		border-radius: 5px;
		cursor: pointer;
		border: none;
	} */
	@media (max-width: 1085px) {
		.nav-item {
			transition: 1s;
			padding: 0 10px;
		}
	}
	/* Responsive styles for tablets */
	@media (max-width: 949px) {
		.nav-items {
			display: none;
		}
		.nav-item {
			padding: 0 15px; /* Reduced padding */
		}
		.mobile-menu-btn {
			display: block;
		}
	}
</style>
