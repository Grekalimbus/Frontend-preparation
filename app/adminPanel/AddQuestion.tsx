import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import InputField from "../components/InputField";
import SelectOption from "../components/SelectOption";
import { BASE_URL } from "../config.url";
import useComplexSelectOption from "../hooks/useComplexSelectOption";
import useInput from "../hooks/useInput";
import IQuestion from "../interfaces/question";
import { ISelectHook } from "../interfaces/selectHook";
import { ISelectOptions, initialTypes } from "../interfaces/selectOptions";
import isDisabled from "../utils/isDisabledToAdd";
import FlexButtons from "./FlexButtons";
import "./adminPanel.scss";

interface IProps {
	technologiesSelectOptions: ISelectOptions[];
	selectOption: string;
}

const AddQuestion = ({ technologiesSelectOptions, selectOption }: IProps) => {
	const selectTypes: ISelectHook = useComplexSelectOption(initialTypes);
	const queryClient = useQueryClient();
	const technologiyEndpoint: string =
		technologiesSelectOptions[0].typeOption.toLowerCase();
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
		selectOption,
	});

	const fetchCreateQuestion = async (data: IQuestion) => {
		const response = await axios.post(
			`${BASE_URL}${technologiyEndpoint}Question`,
			data
		);
		return response.data;
	};
	const mutation = useMutation({
		mutationFn: fetchCreateQuestion,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [technologiyEndpoint] }),
	});
	const createNewQuestion = () => {
		const data: IQuestion = {
			question: inputValue.nameQuestion,
			answer: inputValue.answer,
			category: selectTypes.selectOption[0].typeOption,
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
		selectTypes: selectTypes.selectOption,
	});

	return (
		selectOption === "Добавить" && (
			<>
				{selectTypes.selectOption.map((item: ISelectOptions) => {
					return (
						<SelectOption
							width={{ width: "100%" }}
							key={item.typeOption}
							typeOption={item.typeOption}
							options={item.options}
							handleChangeTypeOption={selectTypes.handleChangeTypeOption}
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
