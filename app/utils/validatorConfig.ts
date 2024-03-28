type ValidatorConfig = {
	[key: string]: {
		[key: string]: {
			message: string;
		};
	};
};

const validatorConfig: ValidatorConfig = {
	nameQuestion: {
		isRequired: { message: "Обязательно для заполнения" },
		isLength: {
			message: "Минимальная длина 4",
		},
	},
	answer: {
		isRequired: { message: "Обязательно для заполнения" },
		isLength: { message: "Минимальная длина 4" },
	},
};

export default validatorConfig;
