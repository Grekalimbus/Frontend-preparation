"use client";
import { useState } from "react";
import Down from "../assets/svg/down.svg";
import Up from "../assets/svg/up.svg";
import Footer from "../components/Footer";
import SelectOption from "./SelectOption";

import "./preparation.scss";
import {
	IPropsInSelectComponent,
	propsInSelectComponent,
} from "./propsInSelectComponent";

type Props = {
	params: {
		id: string;
	};
};

const PreparationPage = ({ params: { id } }: Props) => {
	const [isActive, setActive] = useState<boolean>(true);

	const handleChangeActive = () => {
		setActive(prev => !prev);
	};

	return (
		<main className="container-preparation-wrapper">
			<section className="container-preparation-content">
				<h2 className="title-type-question">{id} Вопросы</h2>
				<section className="section-select-opions">
					{propsInSelectComponent.map((item: IPropsInSelectComponent) => {
						return (
							<SelectOption
								key={item.label}
								typeOption={item.typeOption}
								options={item.options}
							/>
						);
					})}
				</section>
				<section className="section-question-answer">
					<p className="describe-question-text">
						Прогрессивное улучшение, изящная деградация, что это?
						<button onClick={handleChangeActive} aria-label="Показать ответ">
							{isActive ? <Down /> : <Up />}
						</button>
					</p>
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
					</p>
					<button
						className={`button-next-question ${isActive ? "" : "active"}`}
					>
						Next
					</button>
				</section>
			</section>

			<Footer />
		</main>
	);
};

export default PreparationPage;
