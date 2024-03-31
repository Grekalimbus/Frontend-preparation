interface IOptions {
	value: string;
	text: string;
}
export interface ISelectOptions {
	typeOption: string;
	options: IOptions[];
}

export const initialSelectOptions: ISelectOptions[] = [
	{
		typeOption: "Категория",
		options: [
			{ value: "easy", text: "Легкие" },
			{ value: "medium", text: "Средние" },
			{ value: "all", text: "Все" },
		],
	},
	{
		typeOption: "Сортировка",
		options: [
			{ value: "random", text: "В разброс" },
			{ value: "order", text: "По порядку" },
			{ value: "fromEnd", text: "С конца" },
		],
	},
];

export const initialTechnologies: ISelectOptions[] = [
	{
		typeOption: "Выбирете технологию",
		options: [
			{ text: "Общие", value: "commonQuestion" },
			{ text: "HTML", value: "htmlQuestion" },
			{ text: "CSS", value: "cssQuestion" },
			{ text: "JavaScript", value: "javascriptQuestion" },
			{ text: "TypeScript", value: "typescriptQuestion" },
			{ text: "React", value: "reactQuestion" },
			{ text: "Redux", value: "reduxQuestion" },
		],
	},
];

export const initialAdminOptions: ISelectOptions[] = [
	{
		typeOption: "Выбирете: Удалить /Изменить / Добавить",
		options: [
			{ value: "delete", text: "Удалить" },
			{ value: "change", text: "Изменить" },
			{ value: "add", text: "Добавить" },
		],
	},
];
