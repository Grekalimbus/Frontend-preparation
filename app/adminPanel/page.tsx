"use client";
import useSeletOption from "@/app/hooks/useSelectOption";
import { initialAdminOptions } from "@/app/interfaces/selectOptions";
import React, { useState } from "react";
import useAccess from "../hooks/useAccess";
import useComplexVisible from "../hooks/useComplexVisible";
import AccessSection from "./AccessSection";
import PasswordSection from "./PasswordSection";
import "./adminPanel.scss";

const page = () => {
	const [inputValue, setInputValue] = useState<string>("");
	const { isAccess, handleCheckPassword } = useAccess({
		inputValue,
		setInputValue,
	});
	const { selectOption, handleChangeTypeOption } =
		useSeletOption(initialAdminOptions);
	const { isVisibleElem, textSelectOption } = useComplexVisible(
		selectOption[0].typeOption
	);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	return (
		<main className="container-preparation-wrapper">
			<section className="container-admin-panel">
				<PasswordSection
					isAccess={isAccess}
					inputValue={inputValue}
					handleChangeInput={handleChangeInput}
					handleCheckPassword={handleCheckPassword}
				/>
				<AccessSection
					isAccess={isAccess}
					selectOption={selectOption}
					handleChangeTypeOption={handleChangeTypeOption}
					isVisibleElem={isVisibleElem}
					handleChangeInput={handleChangeInput}
					inputValue={inputValue}
					textSelectOption={textSelectOption}
				/>
			</section>
		</main>
	);
};

export default page;
