import { useState } from "react";

interface IProps {
	inputValue: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const useAccess = ({ inputValue, setInputValue }: IProps) => {
	const [isAccess, setAccess] = useState<boolean>(false);
	const handleCheckPassword = () => {
		if (inputValue === process.env.SECRET_KEY_ADMIN) {
			setAccess(prev => !prev);
		}
		setInputValue("");
	};
	return { isAccess, handleCheckPassword };
};

export default useAccess;
