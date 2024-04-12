"use client";
import Loader from "@/app/components/Loader";
import SelectOption from "@/app/components/SelectOption";
import useMutateQuestion from "@/app/hooks/useMutateQuestion";
import useSeletOption from "@/app/hooks/useSelectOption";
import useVisible from "@/app/hooks/useVisible";
import {
	ISelectOptions,
	initialSelectOptions,
} from "@/app/interfaces/selectOptions";
import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";

import InputField from "@/app/components/InputField";
import { HiMiniEyeSlash } from "react-icons/hi2";
import Header from "../../components/Header";
import "./preparation.scss";

type Props = {
	params: {
		id: string;
	};
};

const PreparationPage = ({ params: { id } }: Props) => {
	const { isActive, handleChangeActive } = useVisible();
	const [inputValueFilter, setInputValueFilter] = useState<string>("");
	const { selectOption, handleChangeTypeOption } =
		useSeletOption(initialSelectOptions);
	const { randomQuestion, handleNextQuestion, handleFindByName } =
		useMutateQuestion({
			technologyOption: id,
			selectOption,
		});
	const handleChangeInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValueFilter(e.target.value);
		handleFindByName(e.target.value);
	};

	return !randomQuestion?._id ? (
		<>
			<Header />
			<Loader />
		</>
	) : (
		<main className="container-preparation-wrapper">
			<Header />
			<section className="container-preparation-content">
				<h2 className="title-type-question">Вопросы по {id}</h2>
				<section className="section-select-opions">
					<InputField
						textArea={false}
						handleChangeInput={handleChangeInputFilter}
						value={inputValueFilter}
						type="text"
						placeholder="Фильтрация"
						name="filter"
					/>
					{selectOption.map((item: ISelectOptions) => {
						return (
							<SelectOption
								key={item.typeOption}
								typeOption={item.typeOption}
								options={item.options}
								width={{ width: "100%" }}
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
						{randomQuestion.question}
						{isActive ? <AiFillEye /> : <HiMiniEyeSlash />}
					</button>
					<p className={`describe-answer-text ${isActive ? "" : "active"}`}>
						{randomQuestion.answer.split("\n").map((line, index) => (
							<React.Fragment key={index + line}>
								{line}
								{index !== randomQuestion.answer.split("\n").length - 1 && (
									<br />
								)}
							</React.Fragment>
						))}
					</p>
					<button
						onClick={handleNextQuestion}
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
