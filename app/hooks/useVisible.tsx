import { useState } from "react";

const useVisible = () => {
	const [isActive, setActive] = useState<boolean>(true);

	const handleChangeActive = () => {
		setActive(prev => !prev);
	};
	return { isActive, handleChangeActive };
};

export default useVisible;
