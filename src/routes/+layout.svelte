<script>
	import '$lib/global.css';
	import { Icon, MagnifyingGlass, } from 'svelte-hero-icons';

</script>

<nav>
	<a href="/" class="icon">
		<img src="https://myflixerz.to/images/group_1/theme_7/logo.png?v=0.1" alt="Icon" />
	</a>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/">Genre</a></li>
		<li><a href="/">Country</a></li>
		<li><a href="/">Movies</a></li>
		<li><a href="/">TV Shows</a></li>
		<li><a href="/">Top IMDB</a></li>
	</ul>
	<div class="right-container">
		<form action="">
			<Icon src={MagnifyingGlass} size="22"/>
			<input type="text" class="search" placeholder="Search" />
		</form>
		<a href="/login" class="login-btn">Login</a>
	</div>
</nav>

<main>
	<slot />
</main>

<style>
	nav {
		background: #020916;
		display: flex;
		height: 65px;
		align-items: center;
		padding: 0 2%;

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
	nav ul li a {
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

</style>
