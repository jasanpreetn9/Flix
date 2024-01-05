<script>
	export let data;
	const { details, streamed } = data;
	import { MovieCards, Details, Gradient, Episodes } from '$lib/components';
</script>

<Gradient {details} slot="gradient">
	<Details {details} marginTop="400px" />
	{#if details.format == 'tv'}
		{#await streamed.streamingData then { episodes, seasons }}
			<Episodes {episodes} {seasons} {details} />
		{/await}
	{/if}

	<MovieCards cards={details.recommendations} header="You may also like" />
</Gradient>

