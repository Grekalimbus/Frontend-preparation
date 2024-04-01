"use client";
import React, { useState } from "react";
import useAccess from "../hooks/useAccess";
import AccessSection from "./AccessSection";
import PasswordSection from "./PasswordSection";
import "./adminPanel.scss";

const page = () => {
	const [inputValue, setInputValue] = useState<string>("");
	const { isAccess, handleCheckPassword } = useAccess({
		inputValue,
		setInputValue,
	});

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
					handleChangeInput={handleChangeInput}
					inputValue={inputValue}
				/>
			</section>
		</main>
	);
};

export default page;
