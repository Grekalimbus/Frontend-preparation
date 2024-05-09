import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import SelectOption from "../components/SelectOption";
import { BASE_URL } from "../config.url";
import useInput from "../hooks/useInput";
import useMutateQuestion from "../hooks/useMutateQuestion";
import useSelectOption from "../hooks/useSelectOption";
import { IQuestion } from "../interfaces/question";
import { ISelectOptions } from "../interfaces/selectOptions";
import { isTrueToDisplay } from "../utils/checkSelectsTypes";
import isDisabled from "../utils/isDisabled";
import FlexButtons from "./FlexButtons";

interface IProps {
	technology: string;
	technologiesSelectOptions: ISelectOptions[];
	actions: string;
	handleChangeToggle: () => void;
}

const ChangeQuestion = ({
	technology,
	technologiesSelectOptions,
	actions,
	handleChangeToggle,
}: IProps) => {
	const [isModalWindow, setModalWindow] = useState<boolean>(false);
	const [inputValueFilter, setInputValueFilter] = useState<string>("");
	const { randomQuestion, handleNextQuestion, handleFindByName } =
		useMutateQuestion({
			technologyOption: technology.toLowerCase(),
			selectOptionType: actions,
		});
	const { selectOption: category, handleChangeTypeOption: changeCategory } =
		useSelectOption([
			{
				typeOption: randomQuestion?.category || "Выберите",
				options: [
					{ value: "easy", text: "Легкий" },
					{ value: "middle", text: "Средний" },
				],
			},
		]);

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
		actions,
		randomQuestion,
	});
	const fetchUpdateQuestion = async (data: IQuestion) => {
		const newData = {
			newQuestion: data.question,
			newAnswer: data.answer,
			newCategory: data.category,
		};
		const response = await axios.put(
			`${BASE_URL}questions/${technologiyEndpoint}Question/${data._id}`,
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
		if (randomQuestion?._id) {
			const data: IQuestion = {
				_id: randomQuestion?._id,
				question: inputValue.nameQuestion,
				answer: inputValue.answer,
				category: category[0].typeOption,
			};
			mutation.mutate(data);
			setInputValue({
				nameQuestion: "",
				answer: "",
			});
			setModalWindow(!isModalWindow);
		}
	};

	useEffect(() => {
		setModalWindow(false);
	}, [actions]);

	const handleChangeInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValueFilter(e.target.value);
		handleFindByName(e.target.value);
	};

	const toggleModalWindow = () => {
		setModalWindow(!isModalWindow);
		setInputValue({
			nameQuestion: randomQuestion?.question,
			answer: randomQuestion?.answer,
		});
		handleChangeToggle();
	};

	const isDisabledState: boolean = isDisabled({
		errorAnswer: errors.answer,
		errorQuestion: errors.nameQuestion,
		technologiesSelectOptions,
		category,
	});

	const isValidDisplay = isTrueToDisplay({
		actions,
		technology,
		randomQuestion,
		currentAction: "Изменить",
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
