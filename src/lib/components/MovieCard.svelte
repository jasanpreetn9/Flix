<script>
	export let card;
</script>

<div class="card">
	<a href={`/${card.type}/${card.id}`}>
		<div class="poster">
			<img src={card.img} alt={card.title} loading="lazy" />
			<span>{card.quality}</span>
		</div>
		<div class="card-body">
			<h2>{card.title}</h2>
			<div class="card-info">
				<span>{card.info}</span>
				<span class="type">{card.type}</span>
			</div>
		</div>
	</a>
</div>

<style>
	.card a {
		text-decoration: none;
		cursor: pointer;
	}
	.poster {
		position: relative;
	}
	.card img {
		width: 100%;
		border-radius: 7px;
	}
	.card .poster span {
		position: absolute;
		top: 6px;
		left: auto;
		right: 10px;
		background-color: #ffff;
		color: black;
		padding: 4px;
		border-radius: 3px;
		font-size: 10px;
		text-transform: capitalize;
	}
	.card .card-body h2 {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-size: 15px;
		margin-top: 3px;
		font-weight: 400;
	}
	.card .card-body .card-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-top: 4px;

	}
	.card .card-body .card-info span {
		font-size: 13px;
		opacity: 0.7;
		text-transform: capitalize;
		color: var(--secondary);
	}
	.card .card-body .card-info .type {
		color: var(--secondary);
		font-size: 12px;
		line-height: 14px;
		padding: 2px 4px;
		border: 1px solid var(--secondary);
		border-radius: 3px;
		text-transform: capitalize;
	}
</style>
