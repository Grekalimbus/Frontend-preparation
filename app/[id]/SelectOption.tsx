import { useState } from "react";
import Down from "../assets/svg/down.svg";
import Up from "../assets/svg/up.svg";
import "./selectOptions.scss";
interface IOptions {
	value: string;
	text: string;
}

interface IProps {
	options: IOptions[];
	typeOption: string;
}

const SelectOption = ({ options, typeOption }: IProps) => {
	const [isActive, setActive] = useState<boolean>(true);
	const [isTypeOption, setTypeOption] = useState<string>(typeOption);
	const handleChangeActive = () => {
		setActive(prev => !prev);
	};
	const handleChangeTypeOption = (value: string) => {
		setTypeOption(value);
	};
	return (
		<div className="wrapper-select-option">
			<button className="button-open-select" onClick={handleChangeActive}>
				{isTypeOption}
				{isActive ? <Down /> : <Up />}
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
