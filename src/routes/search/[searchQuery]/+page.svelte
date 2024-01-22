<script>
	import { MovieCards, Pagination } from '$lib/components';
	export let data;
	$: ({ searchResults, searchQuery, pagination } = data);
</script>

<div class="container">
	<MovieCards cards={searchResults} header={`Search results for: <i>${searchQuery}</i>`}>
		<Pagination {pagination} slot="pagination" />
	</MovieCards>
	<Pagination {pagination} />
</div>

