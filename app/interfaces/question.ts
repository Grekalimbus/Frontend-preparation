export type IQuestion = {
	_id: string;
	question: string;
	answer: string;
	category: string;
};

export type Questions = {
	[key: string]: IQuestion[];
};

export type INewQuestion = Omit<IQuestion, "_id">;
