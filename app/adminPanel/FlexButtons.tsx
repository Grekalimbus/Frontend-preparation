import React from "react";
import "./adminPanel.scss";

interface IProps {
	firstValue: string;
	secondValue: string;
	disabled?: boolean;
	isModalWindow?: boolean;
	updateQuestion?: () => unknown;
	handleDeleteQiestion?: () => void;
	handleNextQuestion?: () => void;
	createNewQuestion?: () => unknown;
	toggleModalWindow?: () => void;
}

const FlexButtons = React.memo(
	({
		firstValue,
		secondValue,
		disabled,
		createNewQuestion,
		handleNextQuestion,
		handleDeleteQiestion,
		updateQuestion,
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
					<button disabled={disabled} onClick={updateQuestion}>
						{secondValue}
					</button>
				)}
			</div>
		);
	}
);

export default FlexButtons;
