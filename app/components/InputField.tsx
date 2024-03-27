import "./styles/inputField.scss";

interface IProps {
	value: string;
	type: string;
	placeholder: string;
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
}

const InputField = ({
	value,
	type,
	placeholder,
	handleChangeInput,
}: IProps) => {
	return (
		<input
			className="elem-input-field"
			onChange={handleChangeInput}
			value={value}
			type={type}
			placeholder={placeholder}
		></input>
	);
};

export default InputField;
