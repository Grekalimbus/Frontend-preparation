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
			{ value: "easy", text: "Легкий" },
			{ value: "medium", text: "Средний" },
			{ value: "all", text: "Все" },
		],
	},
];

export enum technologies {
	common = "common",
	html = "html",
	css = "css",
	javascript = "javascript",
	typescript = "typescript",
	react = "react",
	redux = "redux",
}

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
export enum actionsForQuestions {
	delete = "Удалить",
	change = "Изменить",
	add = "Добавить",
}
export const initialAdminOptions: ISelectOptions[] = [
	{
		typeOption: "Выберите: Удалить /Изменить / Добавить",
		options: [
			{ value: "delete", text: actionsForQuestions.delete },
			{ value: "change", text: actionsForQuestions.change },
			{ value: "add", text: actionsForQuestions.add },
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
