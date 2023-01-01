<script lang="ts">
	// import { page } from '$app/stores';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Photos</h1>

<div class="grid">
	{#each data.photos as photo}
		<a href="/api/photos/{photo.id}">
			<img src={photo.thumbnailUrl} alt={photo.title} />
		</a>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.4rem;
	}
</style>
