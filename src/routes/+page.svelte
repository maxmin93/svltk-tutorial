<script lang="ts">
	import { page } from '$app/stores';

	let title = 'Ninja Gaming Guides';
	const updateTitle = () => {
		title = 'Something completely different';
	};

	page.subscribe((page) => {
		// console.log(page);
	});
</script>

<div class="index">
	<h2>{title}</h2>
	<p>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt laborum magnam deleniti
		recusandae, quis aperiam, architecto neque, voluptatem dicta expedita aut id voluptate omnis
		consectetur dolore! ...
	</p>

	<button on:click={updateTitle}>change title</button>
	<input type="text" class="" bind:value={title} />
</div>

<style>
	input {
		margin-left: 20px;
		padding-left: 0.5rem;
		min-width: 16rem;
	}
</style>
