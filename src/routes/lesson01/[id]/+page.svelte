<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div style="padding: 1rem">
	<h1>{data.guide?.id}</h1>
	<h3>{data.guide?.title}</h3>
</div>
