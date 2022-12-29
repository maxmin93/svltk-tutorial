<script lang="ts">
	import Title from './title.svelte';
	import '$lib/styles/lesson01.css';

	let rootPath = '/lesson01';
</script>

<header>
	<nav>
		<Title title="Ninja Gaming Guides" />
		<div class="links">
			<a href="{rootPath}/">Home</a>
			<a href="{rootPath}/about">About</a>
			<a href="{rootPath}/guides">Guides</a>
		</div>
	</nav>
</header>
<main>
	<slot />
</main>
<footer>
	<p>Copyright 2022 Ninja Gaming Guides</p>
</footer>

<style>
	header {
		padding-left: 2rem;
		padding-right: 4rem;
		text-align: center;
		background: rgba(0, 0, 0, 0.1);
	}
	main {
		max-width: 960px;
		margin: 20px auto;
	}
	footer {
		text-align: center;
	}
	nav {
		display: flex;
		align-items: center;
		max-width: 960px;
		margin: 0 auto;
	}
	.links {
		margin-left: auto;
	}
	a {
		margin-left: 10px;
	}
</style>
