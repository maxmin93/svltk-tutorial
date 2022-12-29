import PrismaClientPkg from '@prisma/client';

// Prisma doesn't support ES Modules so we have to do this
const PrismaClient = PrismaClientPkg.PrismaClient;
const prisma = new PrismaClient();

export const randomUrl = (): string => {
	return Math.random().toString(16).slice(2);
};

export const randomDate = (): string => {
	// this is set to one day
	const offset = 24 * 60 * 60 * 1000 * 1;
	const current = new Date().getTime();
	const random = Math.random() * offset;
	const difference = new Date(current - random);
	return difference.toISOString();
};

const getUsers = () => {
	return [
		{
			email: 'matia@example.test',
			name: 'matia',
			about: 'Likes long walks on the beach. 😘'
		},
		{
			email: 'jane@example.test',
			name: 'jane',
			about: 'Likes shopping and going out picnic.'
		},
		{
			email: 'bob@example.test',
			name: 'bob',
			about: 'Likes painting.'
		}
	];
};

const getTweets = () => {
	return [
		{
			url: randomUrl(),
			posted: randomDate(),
			content: `SvelteKit is lit. 🔥`,
			likes: 10
		},
		{
			url: randomUrl(),
			posted: randomDate(),
			content: `I love Svelte! ❤️`,
			likes: 24
		},
		{
			url: randomUrl(),
			posted: randomDate(),
			content: `Sometimes when I'm writing JavaScript I want to throw up my hands and say "this is crazy!" but I can't remember what "this" refers to. 🤪`,
			likes: 0
		},
		{
			url: randomUrl(),
			posted: randomDate(),
			content: `How do you comfort a JavaScript bug? You console it. 🤭`,
			likes: 0
		},
		{
			url: randomUrl(),
			posted: randomDate(),
			content: `Use your imagination. Wind it up, blend it together. The joy of painting really is universal.`,
			likes: 1
		},
		{
			url: randomUrl(),
			posted: randomDate(),
			content: `The only thing I have control over is taking out the trash. 😂`,
			likes: 4
		},
		{
			url: randomUrl(),
			posted: randomDate(),
			content: 'Painting is as individual as people are. 👩‍🎨',
			likes: 0
		},
		{
			url: randomUrl(),
			posted: randomDate(),
			content:
				'All we do is just sorta have an idea in our mind, and we just sorta let it happen. 🌈',
			likes: 10
		}
	];
};

const seed = async (): Promise<void> => {
	const users = getUsers();
	for (const user of users) {
		await prisma.user.create({ data: user });
	}
	const tweets = getTweets();
	for (const tweet of tweets) {
		await prisma.tweet.create({ data: tweet });
	}
};

seed();
