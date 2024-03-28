import "./adminPanel.scss";
interface IProps {
	firstValue: string;
	secondValue: string;
	disabled?: boolean;
}

const FlexButtons = ({ firstValue, secondValue, disabled }: IProps) => {
	return (
		<div className="container-flex-box">
			<button>{firstValue}</button>
			<button disabled={disabled}>{secondValue}</button>
		</div>
	);
};

export default FlexButtons;
