<script lang="ts">
	import Tweet from '../../../../tweet.svelte';

	import type { PageData } from './$types';
	export let data: PageData;

	import type { TweetType } from '$lib/types/lesson02';
	const tweet: TweetType = data.tweet;
</script>

<svelte:head>
	<title>{tweet.name} on Twittr</title>
</svelte:head>

<Tweet {tweet} />
