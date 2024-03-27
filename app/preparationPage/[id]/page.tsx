"use client";
import SelectOption from "@/app/components/SelectOption";
import { ISelectOptions } from "@/app/interfaces/selectOptions";
import { useState } from "react";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import Header from "../../components/Header";
import "./preparation.scss";

type Props = {
	params: {
		id: string;
	};
};

const propsInSelectComponent: ISelectOptions[] = [
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

const PreparationPage = ({ params: { id } }: Props) => {
	const [isActive, setActive] = useState<boolean>(true);

	const handleChangeActive = () => {
		setActive(prev => !prev);
	};

	return (
		<main className="container-preparation-wrapper">
			<Header />
			<section className="container-preparation-content">
				<h2 className="title-type-question">{id} Вопросы</h2>
				<section className="section-select-opions">
					{propsInSelectComponent.map((item: ISelectOptions) => {
						return (
							<SelectOption
								key={item.typeOption}
								typeOption={item.typeOption}
								options={item.options}
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
