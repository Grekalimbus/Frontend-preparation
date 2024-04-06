import React from "react";
import "./adminPanel.scss";

interface IProps {
	firstValue: string;
	secondValue: string;
	disabled?: boolean;
	isModalWindow?: boolean;
	handleDeleteQiestion?: () => void;
	handleNextQuestion?: () => void;
	createNewQuestion?: () => unknown;
	toggleModalWindow?: () => void;
	handleChangeQuestion?: () => void;
}

const FlexButtons = React.memo(
	({
		firstValue,
		secondValue,
		disabled,
		createNewQuestion,
		handleNextQuestion,
		handleDeleteQiestion,
		handleChangeQuestion,
		toggleModalWindow,
		isModalWindow,
	}: IProps) => {
		return (
			<div className="container-flex-box">
				{!isModalWindow && (
					<button onClick={handleNextQuestion}>{firstValue}</button>
				)}
				{isModalWindow && (
					<button onClick={toggleModalWindow}>{firstValue}</button>
				)}
				{secondValue === "Добавить" && (
					<button onClick={createNewQuestion} disabled={disabled}>
						{secondValue}
					</button>
				)}
				{secondValue === "Удалить" && (
					<button onClick={handleDeleteQiestion}>{secondValue}</button>
				)}
				{secondValue === "Изменить" && !isModalWindow && (
					<button disabled={disabled} onClick={toggleModalWindow}>
						{secondValue}
					</button>
				)}
				{secondValue === "Изменить" && isModalWindow && (
					<button disabled={disabled} onClick={handleChangeQuestion}>
						{secondValue}
					</button>
				)}
			</div>
		);
	}
);

export default FlexButtons;
