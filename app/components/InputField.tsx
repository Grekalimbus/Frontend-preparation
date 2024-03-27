import "./styles/inputField.scss";

interface IProps {
	value: string;
	type: string;
	placeholder: string;
	name: string;
	textArea: boolean;
	handleChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
	handleChangeTextArea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => unknown;
}

const InputField = ({
	value,
	type,
	placeholder,
	name,
	textArea,
	handleChangeInput,
	handleChangeTextArea,
}: IProps) => {
	return !textArea ? (
		<input
			className="elem-input-field"
			onChange={handleChangeInput}
			value={value}
			type={type}
			placeholder={placeholder}
			name={name}
		/>
	) : (
		<textarea
			className="text-area-field"
			onChange={handleChangeTextArea} // Обработчик изменения для textarea
			value={value}
			placeholder={placeholder}
			name={name}
		/>
	);
};

export default InputField;
