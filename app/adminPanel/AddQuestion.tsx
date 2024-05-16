import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import InputField from "../components/InputField";
import SelectOption from "../components/SelectOption";
import { BASE_URL } from "../config.url";
import useInput from "../hooks/useInput";
import useSelectOption from "../hooks/useSelectOption";
import { INewQuestion } from "../interfaces/question";
import { ISelectOptions } from "../interfaces/selectOptions";
import isDisabled from "../utils/isDisabledToAdd";
import FlexButtons from "./FlexButtons";
import "./adminPanel.scss";

interface IProps {
	technologiesSelectOptions: ISelectOptions[];
	actions: string;
}

const AddQuestion = ({ technologiesSelectOptions, actions }: IProps) => {
	const queryClient = useQueryClient();
	const technologiyEndpoint: string =
		technologiesSelectOptions[0].typeOption.toLowerCase();
	const { selectOption: category, handleChangeTypeOption: changeCategory } =
		useSelectOption([
			{
				typeOption: "Выберите",
				options: [
					{ value: "easy", text: "Легкий" },
					{ value: "middle", text: "Средний" },
				],
			},
		]);
	const {
		errors,
		inputValue,
		handleChangeInput,
		handleChangeTextArea,
		setInputValue,
	} = useInput({
		initialValue: {
			nameQuestion: "",
			answer: "",
		},
		actions,
	});

	const fetchCreateQuestion = async (data: INewQuestion) => {
		const response = await axios.post(
			`${BASE_URL}questions/${technologiyEndpoint}Question`,
			data
		);
		return response.data;
	};
	const mutation = useMutation({
		mutationFn: fetchCreateQuestion,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["questions"] }),
	});
	const createNewQuestion = () => {
		const data: INewQuestion = {
			question: inputValue.nameQuestion,
			answer: inputValue.answer,
			category: category[0].typeOption,
		};
		mutation.mutate(data);
		setInputValue({
			nameQuestion: "",
			answer: "",
		});
	};

	const isDisabledState: boolean = isDisabled({
		errorAnswer: errors.answer,
		errorQuestion: errors.nameQuestion,
		technologiesSelectOptions,
		category,
	});

	return (
		actions === "Добавить" && (
			<>
				{category.map((item: ISelectOptions) => {
					return (
						<SelectOption
							width={{ width: "100%" }}
							key={item.typeOption}
							typeOption={item.typeOption}
							options={item.options}
							handleChangeTypeOption={changeCategory}
						/>
					);
				})}
				<InputField
					name="nameQuestion"
					textArea={false}
					value={inputValue.nameQuestion}
					type="text"
					placeholder="Название вопроса"
					handleChangeInput={handleChangeInput}
					error={errors.nameQuestion}
				/>
				<InputField
					textArea={true}
					name="answer"
					value={inputValue.answer}
					type="text"
					placeholder="Ответ"
					handleChangeTextArea={handleChangeTextArea}
					error={errors.answer}
				/>
				<FlexButtons
					firstValue="Следующий"
					secondValue="Добавить"
					disabled={isDisabledState}
					createNewQuestion={createNewQuestion}
				/>
			</>
		)
	);
};

export default AddQuestion;
