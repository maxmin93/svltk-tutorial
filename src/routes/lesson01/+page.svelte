<script lang="ts">
	// import { page } from '$app/stores';
	import type { PageData } from './$types';
	export let data: PageData;

	let shouldReload = false;
</script>

<!-- {@debug data} -->

<div class="guides">
	<ul data-sveltekit-reload={shouldReload ? '' : 'off'}>
		{#each data.guides as guide}
			<li>
				<a data-sveltekit-preload-data="hover" href={`/lesson01/${guide.id}`}>{guide.title}</a>
				(${guide.price})
			</li>
		{/each}
	</ul>
</div>

<style>
	.guides {
		margin: 20px;
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
	a {
		display: inline-block;
		margin-top: 10px;
		padding: 10px;
		border: 1px dotted rgba(255, 255, 255, 0.2);
	}
</style>
