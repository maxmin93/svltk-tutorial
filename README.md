# SvelteKit Starter 예제

## 0. 프로젝트 생성 및 설정

### 1) create svelte@latest

```console
$ pnpm create svelte svltk-tutorial
# => Skeleton 프로젝트, Typescript, ESLint, Prettier 선택

$ cd svltk-tutorial
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
_svltk-tutorial-lesson01 실행화면_

### 1) 구현 기능

- Guides JSON 데이터를 제공하는 Repo 클래스 구현
  - getGuides() : 전체 리스트
  - getById(ID) : 특정 ID의 데이터
- `+page.ts` 와 `+page.svelte` 간의 PageData 전달
  - `/lesson01` 에서 getGuides() 를 통해 전체 리스트 출력
  - `/lesson01/[id]` 에서 getById(ID) 를 통해 특정 데이터 출력
- data-sveltekit-preload-data 적용 : 링크 hover 시에 데이터를 미리 로드
  - data-sveltekit-reload : 페이지 이동시에 데이터를 다시 로드
- `+error.svelte` 구현 : getById(ID) 의 Not Found(404) 에러 페이지

> create svelte 로 프로젝트 생성시 data-sveltekit-preload-data="hover" 가 body 태그에 적용되어 있음

## 2. Lesson#02

참고 : [Full Stack SvelteKit For Beginners](https://joyofcode.xyz/sveltekit-for-beginners)

![svltk-tutorial-lesson02](/static/sveltk-lesson02-home-crunch.png){: width="600px"}
_svltk-tutorial-lesson02 실행화면_

### 1) 구현 기능

- prisma 를 이용한 tweets DB 연동
- `/lesson02` 에서 svelte transition 적용
  - onMount() : 페이지가 로드 이후 visible=true 로 in transition 시작
  - 버튼 클릭시 setTimeout 이후, visible=false 로 out transition 시작
- `/api/tweets/+server.ts` 에서 tweets API 생성 : GET
  - `/lesson02/home/+page.ts` 에서 fetch 로 API 호출
  - `/lesson02/home/+page.svelte` 에서 tweets 출력

### 2) prisma 관련 설정

#### prisma 설치

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

#### Prisma 초기화

- Sqlite 파일 생성 : `prisma/dev.db`

```console
$ pnpx prisma init --datasource-provider sqlite
```

#### Prisma Schema 작성

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

#### prisma 스키마 적용

- `prisma db push` 는 `prisma generate` 까지 수행한다

```console
$ pnpx prisma db push
# ==> Generated Prisma Client

$ pnpx prisma db seed
```

## 3. Lesson#03

참고 : [Progressive Enhancement in SvelteKit (use:enhance)](https://www.youtube.com/watch?v=jXtzWMhdI2U)

- 소스코드 [깃허브/huntabyte/sk-use-enhance](https://github.com/huntabyte/sk-use-enhance)

![svltk-tutorial-lesson03](/static/sveltk-lesson03-crunch.png){: width="600px"}
_svltk-tutorial-lesson03 실행화면_

