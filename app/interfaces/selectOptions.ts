type Options = {
	value: string;
	text: string;
};
export type SelectOptions = {
	typeOption: string;
	options: Options[];
};

export enum Technologies {
	common = "common",
	html = "html",
	css = "css",
	javascript = "javascript",
	typescript = "typescript",
	react = "react",
	redux = "redux",
}

export const initialSelectOptions: SelectOptions[] = [
	{
		typeOption: "Категория",
		options: [
			{ value: "easy", text: "Легкий" },
			{ value: "medium", text: "Средний" },
			{ value: "all", text: "Все" },
		],
	},
];

export const initialTechnologies: SelectOptions[] = [
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
export const initialAdminOptions: SelectOptions[] = [
	{
		typeOption: "Выберите: Удалить /Изменить / Добавить",
		options: [
			{ value: "delete", text: actionsForQuestions.delete },
			{ value: "change", text: actionsForQuestions.change },
			{ value: "add", text: actionsForQuestions.add },
		],
	},
];

export const initialTypes: SelectOptions[] = [
	{
		typeOption: "Выберите категорию",
		options: [
			{ value: "easy", text: "Легкий" },
			{ value: "middle", text: "Средний" },
		],
	},
];
