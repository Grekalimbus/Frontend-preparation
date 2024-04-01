import React from "react";
import "./adminPanel.scss";

interface IProps {
	firstValue: string;
	secondValue: string;
	disabled?: boolean;
	handleDeleteQiestion?: () => void;
	handleNextQuestion?: () => void;
	createNewQuestion?: () => unknown;
}

const FlexButtons = React.memo(
	({
		firstValue,
		secondValue,
		disabled,
		createNewQuestion,
		handleNextQuestion,
		handleDeleteQiestion,
	}: IProps) => {
		return (
			<div className="container-flex-box">
				<button onClick={handleNextQuestion}>{firstValue}</button>
				{secondValue === "Добавить" && (
					<button onClick={createNewQuestion} disabled={disabled}>
						{secondValue}
					</button>
				)}
				{secondValue === "Удалить" && (
					<button onClick={handleDeleteQiestion} disabled={disabled}>
						{secondValue}
					</button>
				)}
			</div>
		);
	}
);

export default FlexButtons;
