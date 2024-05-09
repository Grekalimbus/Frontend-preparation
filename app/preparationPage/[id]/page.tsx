"use client";
import Header from "@/app/components/Header";
import InputField from "@/app/components/InputField";
import Loader from "@/app/components/Loader";
import SelectOption from "@/app/components/SelectOption";
import useSeletOption from "@/app/hooks/useSelectOption";
import useVisible from "@/app/hooks/useVisible";
import { initialSelectOptions } from "@/app/interfaces/selectOptions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchQuestions } from "@/redux/reducers/ActionCreators";
import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { HiMiniEyeSlash } from "react-icons/hi2";
import "./preparation.scss";

type Props = {
	params: {
		id: string;
	};
};

const PreparationPage = ({ params: { id } }: Props) => {
	const dispatch = useAppDispatch();
	const { questions, isLoading, error } = useAppSelector(
		state => state.questionReducer
	);
	const { isActive, handleChangeActive } = useVisible();

	const [inputValueFilter, setInputValueFilter] = useState<string>("");
	const { selectOption, handleChangeTypeOption } =
		useSeletOption(initialSelectOptions);
	useEffect(() => {
		dispatch(fetchQuestions());
		console.log("questions", questions);
	}, []);

	const handleChangeInputFilter = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {};

	if (isLoading) {
		return (
			<>
				<Header />
				<Loader />
			</>
		);
	}
	if (error) {
		return <h2>ОШИБКА {error}</h2>;
	}
	const renderQuestion = () => {
		return (
			<>
				<button
					className={`button-visible-answer ${isActive ? "" : "active"}`}
					onClick={handleChangeActive}
					aria-label="Показать ответ"
				>
					{questions[id][0]?.question}
					{isActive ? <AiFillEye /> : <HiMiniEyeSlash />}
				</button>
				<p className={`describe-answer-text ${isActive ? "" : "active"}`}>
					{questions["common"][0]?.answer.split("\n").map((line, index) => (
						<React.Fragment key={index + line}>
							{line}
							{index !==
								questions["common"][0]?.answer.split("\n").length - 1 && <br />}
						</React.Fragment>
					))}
				</p>
				<div className={`wrapper-switch-buttons ${isActive ? "" : "active"}`}>
					{/* <button onClick={handleBackQuestion}>Back</button>
					<button onClick={handleNextQuestion}>Next</button> */}
				</div>
			</>
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

// const PreparationPage = ({ params: { id } }: Props) => {
// 	const { count } = useAppSelector(state => state.userReducer);
// 	const { increment } = userSlice.actions;
// 	const dispatch = useAppDispatch();
// 	return (
// 		<>
// 			<Header />
// 			<h2>{count}</h2>
// 			<button onClick={() => dispatch(increment(1))}>increment</button>
// 		</>
// 	);
// };
// export default PreparationPage;
