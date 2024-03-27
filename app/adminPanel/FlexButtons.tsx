import "./adminPanel.scss";
interface IProps {
	firstValue: string;
	secondValue: string;
}

const FlexButtons = ({ firstValue, secondValue }: IProps) => {
	return (
		<div className="container-flex-box">
			<button>{firstValue}</button>
			<button>{secondValue}</button>
		</div>
	);
};

export default FlexButtons;
