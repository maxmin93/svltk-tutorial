// PageData 로 감싸버리기 때문에 export 할 필요가 없음
type Guide = {
	id: string;
	title: string;
	price: number;
};

export class GuidesRepo {
	getAll = async (): Promise<Guide[]> => {
		return [
			{ id: 'sport1', title: 'Baseball', price: 9.99 },
			{ id: 'sport2', title: 'Basketball', price: 14.99 },
			{ id: 'sport3', title: 'Golf', price: 19.99 },
			{ id: 'sport4', title: 'Football', price: 24.99 },
			{ id: 'intro', title: 'About Sports', price: 99.99 },
			{ id: 'guides', title: 'Sports Guides', price: 0.0 }
		];
	};

	getById = async (id: string): Promise<Guide | undefined> => {
		const guides = await this.getAll();
		return guides.find((g) => g.id === id);
	};
}
