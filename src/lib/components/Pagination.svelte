<script>
    export let pagination;
</script>

<div class="pagination">
    {#each pagination as item}
        <a href={`/movies?page=${item.href}`} class={item.active ? 'active' : ''}>{item.title}</a>
    {/each}
</div>

<style>
    .pagination {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 20px;
		justify-content: center;
        margin-bottom: 30px;
	}
	.pagination a {
		padding: 7px 12px;
        border-radius: 7px;
        cursor: pointer;
		color: #57626D;
	}
	.pagination .active {
		background: var(--primary);
		color: #020916;
	}
</style>