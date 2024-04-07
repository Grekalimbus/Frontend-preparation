import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import SelectOption from "../components/SelectOption";
import useComplexSelectOption from "../hooks/useComplexSelectOption";
import useInput from "../hooks/useInput";
import useMutateQuestion from "../hooks/useMutateQuestion";
import IQuestion from "../interfaces/question";
import { ISelectHook } from "../interfaces/selectHook";
import { ISelectOptions, initialTypes } from "../interfaces/selectOptions";
import { isTrueToDisplay } from "../utils/checkSelectsTypes";
import isDisabled from "../utils/isDisabledToAdd";
import FlexButtons from "./FlexButtons";

interface IProps {
	technologiesOptions: string;
	technologiesSelectOptions: ISelectOptions[];
	selectOption: string;
	handleChangeToggle: () => void;
}

const ChangeQuestion = ({
	technologiesOptions,
	technologiesSelectOptions,
	selectOption,
	handleChangeToggle,
}: IProps) => {
	const [isModalWindow, setModalWindow] = useState<boolean>(false);
	const [inputValueFilter, setInputValueFilter] = useState<string>("");
	const { randomQuestion, handleNextQuestion, handleFindByName } =
		useMutateQuestion(technologiesOptions.toLowerCase());
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
		randomQuestion,
	});
	const fetchUpdateQuestion = async (data: IQuestion) => {
		const newData = {
			newQuestion: data.question,
			newAnswer: data.answer,
			newCategory: data.category,
		};
		const response = await axios.put(
			`http://localhost:3000/api/${technologiyEndpoint}Question/${data._id}`,
			newData
		);
		return response.data;
	};
	const mutation = useMutation({
		mutationFn: fetchUpdateQuestion,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [technologiyEndpoint] }),
	});
	const updateQuestion = () => {
		const data: IQuestion = {
			_id: randomQuestion?._id,
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

	useEffect(() => {
		setModalWindow(false);
	}, [selectOption]);

	const handleChangeInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValueFilter(e.target.value);
		handleFindByName(e.target.value);
	};

	const toggleModalWindow = () => {
		setModalWindow(!isModalWindow);
		handleChangeToggle();
	};

	const isDisabledState: boolean = isDisabled({
		errorAnswer: errors.answer,
		errorQuestion: errors.nameQuestion,
		technologiesSelectOptions,
		selectTypes: selectTypes.selectOption,
	});

	const isValidDisplay = isTrueToDisplay({
		selectOption,
		technologiesOptions,
		randomQuestion,
		currentSelectOption: "Изменить",
	});
	return (
		isValidDisplay && (
			<>
				{!isModalWindow && (
					<section>
						<p className="elem-question-text">
							{randomQuestion?.question || "Вопросов нет"}
						</p>
						<InputField
							textArea={false}
							handleChangeInput={handleChangeInputFilter}
							value={inputValueFilter}
							type="text"
							placeholder="Фильтрация"
							name="filter"
						/>
						<FlexButtons
							firstValue="Следующий"
							secondValue="Изменить"
							disabled={randomQuestion?.question === "Вопросы закончились"}
							handleNextQuestion={handleNextQuestion}
							toggleModalWindow={toggleModalWindow}
						/>
					</section>
				)}
				{isModalWindow && randomQuestion && (
					<section className="change-modal-window">
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
							placeholder="Введите текст для изменения ответа на вопрос"
							handleChangeTextArea={handleChangeTextArea}
							error={errors.answer}
						/>
						<FlexButtons
							firstValue="Назад"
							secondValue="Изменить"
							disabled={!isModalWindow ? false : isDisabledState}
							toggleModalWindow={toggleModalWindow}
							updateQuestion={updateQuestion}
							isModalWindow={isModalWindow}
						/>
					</section>
				)}
			</>
		)
	);
};

export default ChangeQuestion;
