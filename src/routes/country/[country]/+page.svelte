<script>
	import { MovieCards, Pagination } from '$lib/components';
	export let data;
	$: ({ pagination, result } = data);
</script>

<div class="container">
	<MovieCards cards={result} header="Popular Movies">
		<Pagination {pagination} slot="pagination" />
	</MovieCards>
	<Pagination {pagination} />
</div>


