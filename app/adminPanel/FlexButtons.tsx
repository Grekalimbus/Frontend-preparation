import React from "react";
import "./adminPanel.scss";

interface IProps {
	firstValue: string;
	secondValue: string;
	disabled?: boolean;
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
	}: IProps) => {
		return (
			<div className="container-flex-box">
				<button onClick={handleNextQuestion}>{firstValue}</button>
				<button onClick={createNewQuestion} disabled={disabled}>
					{secondValue}
				</button>
			</div>
		);
	}
);

export default FlexButtons;
