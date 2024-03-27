import { useState } from "react";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import "./styles/selectOptions.scss";
interface IOptions {
	value: string;
	text: string;
}

interface IProps {
	options: IOptions[];
	typeOption: string;
	width?: { width: string };
}

const SelectOption = ({ options, typeOption, width }: IProps) => {
	const [isActive, setActive] = useState<boolean>(true);
	const [isTypeOption, setTypeOption] = useState<string>(typeOption);
	const handleChangeActive = () => {
		setActive(prev => !prev);
	};
	const handleChangeTypeOption = (value: string) => {
		setTypeOption(value);
	};
	return (
		<div style={width} className="wrapper-select-option">
			<button className="button-open-select" onClick={handleChangeActive}>
				{isTypeOption}
				{isActive ? <CgChevronDown /> : <CgChevronUp />}
			</button>
			<ul className={`container-select-option ${isActive ? "" : "active"}`}>
				{options.map(option => {
					return (
						<li key={option.value} value={option.value}>
							<button onClick={() => handleChangeTypeOption(option.text)}>
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
