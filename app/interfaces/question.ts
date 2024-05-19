export type Question = {
	_id: string;
	question: string;
	answer: string;
	category: string;
};

export type Questions = {
	[key: string]: Question[];
};

export type INewQuestion = Omit<Question, "_id">;
