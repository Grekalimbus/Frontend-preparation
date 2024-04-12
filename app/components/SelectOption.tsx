import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import useVisible from "../hooks/useVisible";
import "./styles/selectOptions.scss";
interface IOptions {
	value: string;
	text: string;
}

interface IProps {
	options: IOptions[];
	typeOption: string;
	width?: { width: string };
	handleChangeTypeOption: (
		updateSelectValue: string,
		selectField: string
	) => void;
}

const SelectOption = ({
	options,
	typeOption,
	width,
	handleChangeTypeOption,
}: IProps) => {
	const { isActive, handleChangeActive } = useVisible();
	return (
		<div style={width} className="wrapper-select-option">
			<button className="button-open-select" onClick={handleChangeActive}>
				{typeOption}
				{isActive ? <CgChevronDown /> : <CgChevronUp />}
			</button>
			<ul className={`container-select-option ${isActive ? "" : "active"}`}>
				{options.map(option => {
					return (
						<li key={option.value} value={option.value}>
							<button
								onClick={() => handleChangeTypeOption(option.text, typeOption)}
							>
								{option.text}
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default SelectOption;
