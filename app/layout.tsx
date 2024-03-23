import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Frontend вопросы с собеседований",
	description:
		"Шпаргалка для подготовки к собеседованиям. Вопросы с собеседований на Frontend разработчика. Вопросы HTML / CSS / JS / TS / React / Redux и общие вопросы",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
