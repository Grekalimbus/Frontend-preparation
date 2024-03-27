"use client";
import { ISelectOptions } from "@/app/interfaces/selectOptions";
import React, { useState } from "react";
import InputField from "../components/InputField";
import SelectOption from "../components/SelectOption";
import "./adminPanel.scss";

export const selectOptions: ISelectOptions = {
	typeOption: "Выбирете: Удалить /Изменить / Добавить",
	options: [
		{ value: "delete", text: "Удалить" },
		{ value: "change", text: "Изменить" },
		{ value: "add", text: "Добавить" },
	],
};

const page = () => {
	const [isVisible, setVisible] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>("");

	const handleChangeVisible = () => {
		if (inputValue === process.env.SECRET_KEY_ADMIN) {
			setVisible(prev => !prev);
		}
		console.log("inputValue", inputValue);
		console.log("SECRET_KEY_ADMIN", process.env.SECRET_KEY_ADMIN);
	};
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(prev => e.target.value);
		console.log("	inputValue", inputValue);
	};
	return (
		<main className="container-preparation-wrapper">
			<section className="container-admin-panel">
				{/* <section>
				<input
					onChange={handleChangeInput}
					type="password"
					placeholder="Введите пароль доступа"
					value={inputValue}
				/>
				<button onClick={handleChangeVisible}>Submit</button>
			</section> */}
				{/* {isVisible && <section>Админка</section>} */}
				<section>
					<SelectOption
						width={{ width: "100%" }}
						typeOption={selectOptions.typeOption}
						options={selectOptions.options}
					/>
					<p className="elem-question-text">
						Это две стратегии веб-разработки, которые подразумевают
					</p>
					<InputField
						handleChangeInput={handleChangeInput}
						value={inputValue}
						type="text"
						placeholder="Фильтрация"
					/>
					<div className="container-flex-box">
						<button>Следующий</button>
						<button>Удалить</button>
					</div>
				</section>
			</section>
		</main>
	);
};

export default page;
