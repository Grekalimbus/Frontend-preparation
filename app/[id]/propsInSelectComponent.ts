interface IOptions {
	value: string;
	text: string;
}
interface IPropsInSelectComponent {
	label: string;
	typeOption: string;
	options: IOptions[];
}
const propsInSelectComponent: IPropsInSelectComponent[] = [
	{
		label: "category",
		typeOption: "Категория",
		options: [
			{ value: "easy", text: "Легкие" },
			{ value: "medium", text: "Средние" },
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

export default propsInSelectComponent;
