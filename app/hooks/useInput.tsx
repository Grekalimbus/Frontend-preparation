import { useEffect, useState } from "react";
import { Question } from "../interfaces/question";
import { validator } from "../utils/validator";
import validatorConfig from "../utils/validatorConfig";

interface IDataInput {
	[key: string]: any;
}

interface IProps {
	initialValue: IDataInput;
	actions: string;
	question?: Question | null;
}

const useInput = ({ initialValue, actions, question }: IProps) => {
	const [errors, setErrors] = useState<IDataInput>({});
	const [inputValue, setInputValue] = useState<IDataInput>(initialValue);

	const validate = () => {
		const errors = validator(inputValue, validatorConfig);
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};
	useEffect(() => {
		setInputValue({ nameQuestion: "", answer: "" });
	}, [actions, question]);

	useEffect(() => {
		validate();
	}, [inputValue]);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	return {
		errors,
		inputValue,
		handleChangeInput,
		handleChangeTextArea,
		setInputValue,
	};
};

export default useInput;
