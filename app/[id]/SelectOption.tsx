interface IOptions {
	value: string;
	text: string;
}

interface IProps {
	label: string;
	options: IOptions[];
	typeOption: string;
}

const SelectOption = ({ label, options, typeOption }: IProps) => {
	return (
		<div>
			<label htmlFor={label}>{typeOption}</label>
			<select id={label}>
				{options.map(option => {
					return <option value={option.value}>{option.text}</option>;
				})}
			</select>
		</div>
	);
};

export default SelectOption;
