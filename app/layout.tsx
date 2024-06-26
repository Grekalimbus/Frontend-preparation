import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import Provider from "./Provider";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Geologica({ subsets: ["latin"] });

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
			<body className={inter.className}>
				<Provider>{children}</Provider>
				<Footer />
			</body>
		</html>
	);
}
