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
		typeOption: "Выберите технологию",
		options: [
			{ text: "Common", value: "common" },
			{ text: "HTML", value: "html" },
			{ text: "CSS", value: "css" },
			{ text: "JavaScript", value: "javascript" },
			{ text: "TypeScript", value: "typescript" },
			{ text: "React", value: "react" },
			{ text: "Redux", value: "redux" },
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

export const initialTypes: ISelectOptions[] = [
	{
		typeOption: "Выберите категорию",
		options: [
			{ value: "easy", text: "Легкий" },
			{ value: "middle", text: "Средний" },
		],
	},
];
