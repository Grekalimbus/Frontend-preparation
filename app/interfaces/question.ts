export interface INewQuestion {
	question: string;
	answer: string;
	category: string;
}

export interface IQuestion extends INewQuestion {
	_id: string;
}
export interface IQuestions {
	[key: string]: IQuestion[];
}
