"use client";
import InputField from "@/app/components/InputField";
import Loader from "@/app/components/Loader";
import SelectOption from "@/app/components/SelectOption";
import useMutateQuestion from "@/app/hooks/useMutateQuestion";
import useSeletOption from "@/app/hooks/useSelectOption";
import useVisible from "@/app/hooks/useVisible";
import { initialSelectOptions } from "@/app/interfaces/selectOptions";
import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
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
	const data = useMutateQuestion(id);

	const handleChangeInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValueFilter(e.target.value);
		data.filterQuestions(e.target.value);
	};

	if (data.isLoading) {
		return (
			<>
				<Header />
				<Loader />
			</>
		);
	}
	if (data.error) {
		return (
			<>
				<Header />
				<h2>Ошибка </h2>
			</>
		);
	}
	const renderQuestion = () => {
		return (
			data.currentQuestion && (
				<>
					<button
						className={`button-visible-answer ${isActive ? "" : "active"}`}
						onClick={handleChangeActive}
						aria-label="Показать ответ"
					>
						{data.currentQuestion.question}
						{isActive ? <AiFillEye /> : <HiMiniEyeSlash />}
					</button>
					<p className={`describe-answer-text ${isActive ? "" : "active"}`}>
						{data.currentQuestion.answer.split("\n").map((line, index) => (
							<React.Fragment key={index + line}>
								{line}
								{data.currentQuestion &&
									index !==
										data.currentQuestion.answer.split("\n").length - 1 && (
										<br />
									)}
							</React.Fragment>
						))}
					</p>
					{!inputValueFilter.length ? (
						<div
							className={`wrapper-switch-buttons ${isActive ? "" : "active"}`}
						>
							<button onClick={data.prevQuestion}>Back</button>
							<button onClick={data.nextQuestion}>Next</button>
						</div>
					) : (
						<div
							className={`wrapper-switch-buttons ${isActive ? "" : "active"}`}
						>
							<button onClick={data.prevFilteredQuestion}>Back</button>
							<button onClick={data.nextFilteredQuestion}>Next</button>
						</div>
					)}
				</>
			)
		);
	};

	return (
		<main className="container-preparation-wrapper">
			<Header />
			<section className="container-preparation-content">
				<h2 className="title-type-question">Вопросы по {id}</h2>
				<section className="section-select-options">
					<InputField
						textArea={false}
						handleChangeInput={handleChangeInputFilter}
						value={inputValueFilter}
						type="text"
						placeholder="Фильтрация"
						name="filter"
					/>
					{selectOption.map(({ typeOption, options }) => (
						<SelectOption
							key={typeOption}
							typeOption={typeOption}
							options={options}
							width={{ width: "100%" }}
							handleChangeTypeOption={handleChangeTypeOption}
						/>
					))}
				</section>
				<section className="section-question-answer">
					<h4 className="describe-section-title">
						Секция взаимодействия с вопросом
					</h4>
					{renderQuestion()}
				</section>
			</section>
		</main>
	);
};

export default PreparationPage;
