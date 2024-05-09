export interface IQuestion {
	_id: string;
	question: string;
	answer: string;
	category: string;
}

export interface IQuestions {
	[key: string]: IQuestion[]; // Сигнатура индекса
}

export interface INewQuestion {
	question: string;
	answer: string;
	category: string;
}
