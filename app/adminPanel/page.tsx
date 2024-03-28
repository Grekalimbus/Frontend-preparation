"use client";
import { ISelectOptions } from "@/app/interfaces/selectOptions";
import React, { useState } from "react";
import InputField from "../components/InputField";
import SelectOption from "../components/SelectOption";
import AddQuestion from "./AddQuestion";
import FlexButtons from "./FlexButtons";
import "./adminPanel.scss";

const initialSelectOptions: ISelectOptions[] = [
	{
		typeOption: "Выбирете: Удалить /Изменить / Добавить",
		options: [
			{ value: "delete", text: "Удалить" },
			{ value: "change", text: "Изменить" },
			{ value: "add", text: "Добавить" },
		],
	},
];

const page = () => {
	const [isVisible, setVisible] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>("");
	const [selectOption, setSelectOption] =
		useState<ISelectOptions[]>(initialSelectOptions);

	const textSelectOption = selectOption[0].typeOption;

	const checkVisibleForTextAndFilter = () =>
		!(
			textSelectOption === "Выбирете: Удалить /Изменить / Добавить" ||
			textSelectOption === "Добавить"
		);

	const isVisibleElem = checkVisibleForTextAndFilter();

	const handleChangeVisible = () => {
		if (inputValue === process.env.SECRET_KEY_ADMIN) {
			setVisible(prev => !prev);
		}
	};
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(prev => e.target.value);
	};

	const handleChangeTypeOption = (
		updateSelectValue: string,
		selectField: string
	) => {
		const updateSelectOptions = selectOption.map(item => {
			if (item.typeOption === selectField) {
				return {
					typeOption: updateSelectValue,
					options: item.options,
				};
			}
			return item;
		});

		setSelectOption(updateSelectOptions);
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
				{selectOption.map((item: ISelectOptions) => {
					return (
						<SelectOption
							key={item.typeOption}
							typeOption={item.typeOption}
							options={item.options}
							handleChangeTypeOption={handleChangeTypeOption}
							width={{ width: "100%" }}
						/>
					);
				})}
				<section>
					{isVisibleElem && (
						<p className="elem-question-text">
							Это две стратегии веб-разработки, которые подразумевают
						</p>
					)}
					{isVisibleElem && (
						<InputField
							textArea={false}
							handleChangeInput={handleChangeInput}
							value={inputValue}
							type="text"
							placeholder="Фильтрация"
							name="filter"
						/>
					)}
					{textSelectOption !== "Добавить" ? null : <AddQuestion />}

					{textSelectOption === "Выбирете: Удалить /Изменить / Добавить" ||
					textSelectOption === "Добавить" ? null : (
						<FlexButtons
							firstValue="Следующий"
							secondValue={textSelectOption}
						/>
					)}
				</section>
			</section>
		</main>
	);
};

export default page;
