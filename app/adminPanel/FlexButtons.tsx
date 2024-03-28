import React from "react";
import "./adminPanel.scss";

interface IProps {
	firstValue: string;
	secondValue: string;
	disabled?: boolean;
	createNewQuestion?: () => unknown;
}

const FlexButtons = React.memo(
	({ firstValue, secondValue, disabled, createNewQuestion }: IProps) => {
		return (
			<div className="container-flex-box">
				<button>{firstValue}</button>
				<button onClick={createNewQuestion} disabled={disabled}>
					{secondValue}
				</button>
			</div>
		);
	}
);

export default FlexButtons;
