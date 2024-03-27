"use client";
import React, { useState } from "react";

// {process.env.SECRET_KEY_ADMIN}
const page = () => {
	console.log(process.env.SECRET_KEY_ADMIN);

	const [isVisible, setVisible] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>("");
	const handleChangeVisible = () => {
		if (inputValue === process.env.SECRET_KEY_ADMIN) {
			setVisible(prev => !prev);
		}
		console.log("inputValue", inputValue);
		console.log("SECRET_KEY_ADMIN", process.env.SECRET_KEY_ADMIN);
		// console.log("inputValue", inputValue === process.env.SECRET_KEY_ADMIN);
	};
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(prev => e.target.value);
		console.log("	inputValue", inputValue);
	};
	return (
		<main>
			<section>
				<input
					onChange={handleChangeInput}
					type="password"
					placeholder="Введите пароль доступа"
					value={inputValue}
				/>
				<button onClick={handleChangeVisible}>Submit</button>
			</section>
			{isVisible && <section>Админка</section>}
		</main>
	);
};

export default page;
