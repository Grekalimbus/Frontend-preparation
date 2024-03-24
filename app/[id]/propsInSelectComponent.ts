interface IOptions {
	value: string;
	text: string;
}
export interface IPropsInSelectComponent {
	label: string;
	typeOption: string;
	options: IOptions[];
}
export const propsInSelectComponent: IPropsInSelectComponent[] = [
	{
		label: "category",
		typeOption: "Категория",
		options: [
			{ value: "easy", text: "Легкие" },
			{ value: "medium", text: "Средние" },
			{ value: "all", text: "Все" },
		],
	},
	{
		label: "sort",
		typeOption: "Сортировка",
		options: [
			{ value: "random", text: "В разброс" },
			{ value: "order", text: "По порядку" },
		],
	},
];
