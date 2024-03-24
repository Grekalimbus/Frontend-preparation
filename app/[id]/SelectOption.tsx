import Image from "next/image";
import { useState } from "react";
import Down from "../assets/downVectorWhite.png";
import Up from "../assets/upVectorWhite.png";
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
				<Image
					alt="arrowButtonIcon"
					height={20}
					width={20}
					src={isActive ? Down : Up}
				/>
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
