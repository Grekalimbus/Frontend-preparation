import { useState } from "react";
import "./styles/inputField.scss";

interface IProps {
	value: string;
	type: string;
	placeholder: string;
	name: string;
	textArea: boolean;
	error?: string;
	handleChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
	handleChangeTextArea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => unknown;
}

const InputField = ({
	value,
	type,
	placeholder,
	name,
	textArea,
	error,
	handleChangeInput,
	handleChangeTextArea,
}: IProps) => {
	const [focusedInput, setFocusedInput] = useState<null | string>(null);
	const handleInputFocus = (name: string | null) => {
		setFocusedInput(name);
	};
	return !textArea ? (
		<>
			{focusedInput ? <span className="error-label-item">{error}</span> : null}
			<input
				onFocus={() => handleInputFocus(name)}
				className="elem-input-field"
				onChange={handleChangeInput}
				value={value}
				type={type}
				placeholder={placeholder}
				name={name}
			/>
		</>
	) : (
		<>
			{focusedInput ? <span className="error-label-item">{error}</span> : null}
			<textarea
				onFocus={() => handleInputFocus(name)}
				className="text-area-field"
				onChange={handleChangeTextArea} // Обработчик изменения для textarea
				value={value}
				placeholder={placeholder}
				name={name}
			/>
		</>
	);
};

export default InputField;
