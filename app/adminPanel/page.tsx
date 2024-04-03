"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import useAccess from "../hooks/useAccess";
import AccessSection from "./AccessSection";
import PasswordSection from "./PasswordSection";
import "./adminPanel.scss";

const queryClient = new QueryClient();

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
		<QueryClientProvider client={queryClient}>
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
		</QueryClientProvider>
	);
};

export default page;
