"use client";
import SelectOption from "@/app/components/SelectOption";
import IQuestion from "@/app/interfaces/question";
import { ISelectOptions } from "@/app/interfaces/selectOptions";
import { useEffect, useState } from "react";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import Header from "../../components/Header";
import QuestionService from "../../services/question.services";
import "./preparation.scss";

const initialSelectOptions: ISelectOptions[] = [
	{
		typeOption: "Категория",
		options: [
			{ value: "easy", text: "Легкие" },
			{ value: "medium", text: "Средние" },
			{ value: "all", text: "Все" },
		],
	},
	{
		typeOption: "Сортировка",
		options: [
			{ value: "random", text: "В разброс" },
			{ value: "order", text: "По порядку" },
			{ value: "fromEnd", text: "С конца" },
		],
	},
];

type Props = {
	params: {
		id: string;
	};
};

const PreparationPage = ({ params: { id } }: Props) => {
	const [dataQuestion, setDataQuestion] = useState<IQuestion[] | []>([]);
	const [isActive, setActive] = useState<boolean>(true);
	const [selectOption, setSelectOption] =
		useState<ISelectOptions[]>(initialSelectOptions);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await QuestionService.getQuestionByType(id);
				setDataQuestion(response.data[id]);
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};

		fetchQuestions();
	}, []);

	const handleChangeActive = () => {
		setActive(prev => !prev);
	};

	const handleChangeTypeOption = (
		updateSelectValue: string,
		selectField: string
	) => {
		const updateSelectOptions = selectOption.map(item => {
			if (item.typeOption === selectField) {
				return {
					typeOption: updateSelectValue,
					options: item.options,
				};
			}
			return item;
		});

		setSelectOption(updateSelectOptions);
	};

	return (
		<main className="container-preparation-wrapper">
			<Header />
			<section className="container-preparation-content">
				<h2 className="title-type-question">{id}</h2>
				<section className="section-select-opions">
					{selectOption.map((item: ISelectOptions) => {
						return (
							<SelectOption
								key={item.typeOption}
								typeOption={item.typeOption}
								options={item.options}
								handleChangeTypeOption={handleChangeTypeOption}
							/>
						);
					})}
				</section>
				<section className="section-question-answer">
					<button
						className={`button-visible-answer ${isActive ? "" : "active"}`}
						onClick={handleChangeActive}
						aria-label="Показать ответ"
					>
						Прогрессивное улучшение, изящная деградация, что это?
						{isActive ? <CgChevronDown /> : <CgChevronUp />}
					</button>

					<p className={`describe-answer-text ${isActive ? "" : "active"}`}>
						Это две стратегии веб-разработки, которые подразумевают поэтапное
						создание веб-страниц с учетом возможностей и ограничений различных
						браузеров и устройств.
						<br />
						<br />
						Это две стратегии веб-разработки, которые подразумевают поэтапное
						создание веб-страниц с учетом возможностей и ограничений различных
						браузеров и устройств.
						<br />
						<br />
						Это две стратегии веб-разработки, которые подразумевают поэтапное
						создание веб-страниц с учетом возможностей и ограничений различных
						браузеров и устройств.
						<br />
						<br />
						Это две стратегии веб-разработки, которые подразумевают поэтапное
						создание веб-страниц с учетом возможностей и ограничений различных
						браузеров и устройств.
						<br />
						<br />
						Это две стратегии веб-разработки, которые подразумевают поэтапное
						создание веб-страниц с учетом возможностей и ограничений различных
						браузеров и устройств.
						<br />
						<br />
					</p>
					<button
						className={`button-next-question ${isActive ? "" : "active"}`}
					>
						Next
					</button>
				</section>
			</section>
		</main>
	);
};

export default PreparationPage;
