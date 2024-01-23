<script>
	export let details;
</script>

<div class="gradient">
	<div class="banner">
		<div class="banner-gradient">
			<ul class="breadcrumb">
				<li><a href="/">Home</a></li>
				<li><a href={`/${details?.format}`}>{details?.format}</a></li>
				<li><a href={`/${details?.format}/${details?.movieId}`}>{details?.title}</a></li>
			</ul>
		</div>
		<img src={details.banner} alt="" />
	</div>
	<div class="content">
		<slot><!-- optional fallback --></slot>
	</div>
</div>

<style>
	.gradient {
		display: flex;
		height: 100%;
		position: relative;
		margin: auto;
	}

	.banner {
		flex: 0 0 auto;
		position: relative;
		background: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
		left: 0;
		transition: 1s;
		overflow: hidden;
	}

	.banner img {
		width: 100%;
		min-height: 100%;
		object-fit: cover;
		display: block;
		margin-left: auto;
	}

	.banner-gradient {
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(rgba(2, 9, 22, 1), #0000004f 29.41%, rgb(2, 9, 22));
	}
	.content {
		position: absolute;
		width: 100%;
		height: 100%;
		padding: 0 2%;
	}

	.breadcrumb {
		margin: 15px;
		list-style: none;
		text-transform: capitalize;
		padding: 0 2%;
	}

	/* Display list items side by side */
	ul.breadcrumb li {
		display: inline;
		font-size: 14px;
	}

	/* Add a slash symbol (/) before/behind each list item */
	ul.breadcrumb li + li:before {
		padding: 8px;
		color: #848484;
		content: '/\00a0';
	}

	ul.breadcrumb li a {
		color: #848484;
		text-decoration: none;
	}

	/* Add a color on mouse-over */
	ul.breadcrumb li a:hover {
		color: var(--primary);
		text-decoration: underline;
	}
	/* @media (max-width: 850px) {
		.banner {
			display: none;
		}
	} */
</style>
