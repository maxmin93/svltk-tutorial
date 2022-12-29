<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { rootPath } from './const';

	let visible = false;

	const asyncDelay = async (delay: number) => {
		await new Promise((resolve) => setTimeout(resolve, delay));
	};

	const asyncHide = async () => {
		visible = false;
		try {
			await asyncDelay(300).then(() => console.log('Page out'));
		} finally {
			goto($rootPath + '/home');
		}
	};

	onMount(async () => {
		try {
			await asyncDelay(100).then(() => console.log('Page In'));
		} finally {
			visible = true;
		}
	});
</script>

<svelte:head>
	<title>Twittr</title>
</svelte:head>

<main class="container">
	{#if visible}
		<section class="hero" in:fly={{ x: -400, duration: 250, delay: 300 }} out:fade>
			<h1 class="title">Twittr 🐦️</h1>
			<p class="text">Share your hot take with everyone.</p>
		</section>
	{/if}
	<section class="login">
		<a class="btn" href={undefined} on:click={asyncHide}> 🔥 Share Your Hot Take</a>
	</section>
</main>

<style>
	.container {
		height: 100vh;
		display: grid;
	}

	.hero,
	.login {
		display: grid;
		place-content: center;
	}

	.hero {
		background-color: var(--color-brand);
		text-align: center;
	}

	.title {
		font-size: var(--font-80);
		z-index: 2;
	}

	.text {
		padding: var(--spacing-16);
		transform: rotate(2deg) translateY(-40%);
		background: var(--color-bg-primary);
		font-weight: bold;
		font-size: var(--font-24);
		z-index: 1;
	}

	@media (min-width: 800px) {
		.container {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
