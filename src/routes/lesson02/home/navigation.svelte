<script lang="ts">
	import { page } from '$app/stores';
	import Icon from './icon.svelte';

	import { rootPath } from '../const';

	$: path = $page.url.pathname;
</script>

<aside>
	<div class="container">
		<nav>
			<ul>
				<li>
					<a href="{$rootPath}/" class="logo" data-sveltekit-preload-data="tap">🐦️</a>
				</li>

				<li class:active={path === $rootPath + '/home'}>
					<a href="{$rootPath}/home" data-sveltekit-reload>
						<Icon width="32" height="32" name="home" />
						<span>Home</span>
					</a>
				</li>

				<li class:active={path === $rootPath + '/home/profile/matia'}>
					<a href="{$rootPath}/home/profile/matia" data-sveltekit-preload-data="off">
						<Icon width="32" height="32" name="profile" />
						<span>Profile</span>
					</a>
				</li>

				<li class:active={path === $rootPath + '/settings'}>
					<a href="{$rootPath}/home/settings" data-sveltekit-preload-data="off">
						<Icon width="32" height="32" name="settings" />
						<span>Settings</span>
					</a>
				</li>

				<li class:active={path === $rootPath + '/about'}>
					<a href="{$rootPath}/home/about" data-sveltekit-preload-data="off">
						<Icon width="32" height="32" name="about" />
						<span>About</span>
					</a>
				</li>
			</ul>
		</nav>

		<button class="btn tweet">Tweet</button>
	</div>
</aside>

<style>
	.container {
		position: sticky;
		top: 0;
	}

	ul {
		display: grid;
		gap: var(--spacing-8);
		font-size: var(--font-18);
	}

	li a {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-16);
		padding: 1.4rem;
		border-radius: var(--radius-base);
		transition: all 0.2s ease;
	}

	li a:hover {
		background-color: var(--color-link-hover);
	}

	li.active {
		font-weight: 700;
		/* background-color: var(--color-link-hover); */
	}

	.logo {
		font-size: var(--font-32);
	}

	span {
		display: none;
	}

	.tweet {
		display: none;
		text-align: center;
	}

	.tweet:hover {
		background-color: var(--color-btn-primary-active-hover);
	}

	@media (min-width: 1024px) {
		aside {
			padding: 0 var(--spacing-32);
		}

		span {
			display: block;
		}

		.tweet {
			width: 100%;
			display: block;
			margin-top: var(--spacing-16);
		}
	}
</style>
