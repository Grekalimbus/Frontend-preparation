"use client";
import Image from "next/image";
import { useState } from "react";
import Down from "../assets/downVector.png";
import Up from "../assets/upVector.png";
import Header from "../components/Header";
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
			<Header />
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
					<button
						className="button-visible-answer"
						onClick={handleChangeActive}
						aria-label="Показать ответ"
					>
						Прогрессивное улучшение, изящная деградация, что это?
						{
							<Image
								width={40}
								height={40}
								alt="vectorToHide"
								src={isActive ? Down : Up}
							/>
						}
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
