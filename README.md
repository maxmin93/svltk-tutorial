# SvelteKit Starter 예제

## 0. 프로젝트 생성 및 설정

### 1) create svelte@latest

```console
$ pnpm create svelte ninja-tutorial
# => Skeleton 프로젝트, Typescript, ESLint, Prettier 선택

$ cd ninja-tutorial
$ pnpm vite dev -- --open
```

### 2) svelte.config.js

```js
const config = {
	// ...
	kit: {
		adapter: adapter(),
		alias: {
			$lib: './src/lib'
		}
	}
};
```

## 1. Lesson#01

참고 [SvelteKit Tutorial (Crash Course)](https://www.youtube.com/playlist?list=PL4cUxeGkcC9hpM9ARM59Ve3jqcb54dqiP)

- Ninja Tutorial 의 강좌중 하나를 기반으로 이것저것 참고해 추가했다.

![svltk-tutorial-lesson01](/static/sveltk-lesson01-crunch.png){: width="600px"}

## 2. Lesson#02

참고 : [Full Stack SvelteKit For Beginners](https://joyofcode.xyz/sveltekit-for-beginners)

![svltk-tutorial-lesson02](/static/sveltk-lesson02-home-crunch.png){: width="600px"}

### 1) prisma 설치

```console
$ pnpm i -D prisma
$ pnpm i @prisma/client

# 별도로 prisma 스크립트를 실행시키려면 아래와 같이 설치
$ pnpm i -D ts-node @types/node
```

```json
{
  "prisma": {
    "seed": "node --loader ts-node/esm prisma/seed.ts"
  },
  // ...
}
```
{: file="package.json"}

### 1) Prisma 초기화

- Sqlite 파일 생성 : `prisma/dev.db`

```console
$ pnpx prisma init --datasource-provider sqlite
```

### 2) Prisma Schema

- 스키마를 정의하고 Sqlite DB에 반영

```prisma
model Tweet {
  id      Int      @id @default(autoincrement())
  url     String
  posted  DateTime
  content String
  likes   Int
  user    User     @relation(fields: [userId], references: [id])
  userId  Int
}

model User {
  id     Int     @id @default(autoincrement())
  email  String  @unique
  handle String  @unique
  name   String
  avatar String
  about  String
  tweets Tweet[]
  liked  Liked[]
}

model Liked {
  id      Int  @id @default(autoincrement())
  tweetId Int  @unique
  user    User @relation(fields: [userId], references: [id])
  userId  Int
}
```

- `prisma db push` 는 `prisma generate` 까지 수행한다

```console
$ pnpx prisma db push
# ==> Generated Prisma Client

$ pnpx prisma db seed
```
