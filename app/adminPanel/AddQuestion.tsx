import InputField from "../components/InputField";
import SelectOption from "../components/SelectOption";
import useInput from "../hooks/useInput";
import useMutateQuestion from "../hooks/useMutateQuestion";
import useSelectOption from "../hooks/useSelectOption";
import { INewQuestion } from "../interfaces/question";
import { SelectOptions } from "../interfaces/selectOptions";
import isDisabled from "../utils/isDisabledToAdd";
import FlexButtons from "./FlexButtons";
import "./adminPanel.scss";

interface IProps {
	technologiesSelectOptions: SelectOptions[];
	actions: string;
}

const AddQuestion = ({ technologiesSelectOptions, actions }: IProps) => {
	const technologiyEndpoint: string =
		technologiesSelectOptions[0].typeOption.toLowerCase();
	const data = useMutateQuestion(technologiyEndpoint);
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
	const input = useInput({
		initialValue: {
			nameQuestion: "",
			answer: "",
		},
		actions,
	});

	const createNewQuestion = () => {
		const newQuestion: INewQuestion = {
			question: input.inputValue.nameQuestion,
			answer: input.inputValue.answer,
			category: category[0].typeOption,
		};
		data.createNewQuestion(newQuestion);
		input.setInputValue({
			nameQuestion: "",
			answer: "",
		});
	};

	const isDisabledState: boolean = isDisabled({
		errorAnswer: input.errors.answer,
		errorQuestion: input.errors.nameQuestion,
		technologiesSelectOptions,
		category,
	});

	return (
		actions === "Добавить" && (
			<>
				{category.map((item: SelectOptions) => {
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
					value={input.inputValue.nameQuestion}
					type="text"
					placeholder="Название вопроса"
					handleChangeInput={input.handleChangeInput}
					error={input.errors.nameQuestion}
				/>
				<InputField
					textArea={true}
					name="answer"
					value={input.inputValue.answer}
					type="text"
					placeholder="Ответ"
					handleChangeTextArea={input.handleChangeTextArea}
					error={input.errors.answer}
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
