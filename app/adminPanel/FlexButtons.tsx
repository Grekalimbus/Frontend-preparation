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
	handleChangeQiestion?: () => void;
	handleBack?: () => void;
}

const FlexButtons = React.memo(
	({
		firstValue,
		secondValue,
		disabled,
		createNewQuestion,
		handleNextQuestion,
		handleDeleteQiestion,
		handleChangeQiestion,
		isModalWindow,
		handleBack,
	}: IProps) => {
		console.log("isModalWindow", isModalWindow);
		return (
			<div className="container-flex-box">
				{!isModalWindow && (
					<button onClick={handleNextQuestion}>{firstValue}</button>
				)}
				{isModalWindow && (
					<button onClick={handleChangeQiestion}>{firstValue}</button>
				)}
				{secondValue === "Добавить" && (
					<button onClick={createNewQuestion} disabled={disabled}>
						{secondValue}
					</button>
				)}
				{secondValue === "Удалить" && (
					<button onClick={handleDeleteQiestion}>{secondValue}</button>
				)}
				{secondValue === "Изменить" && (
					<button disabled={disabled} onClick={handleChangeQiestion}>
						{secondValue}
					</button>
				)}
			</div>
		);
	}
);

export default FlexButtons;
