"use client";
import Loader from "@/app/components/Loader";
import SelectOption from "@/app/components/SelectOption";
import { useQuestionFetch } from "@/app/hooks/useQuestionFetch";
import useSeletOption from "@/app/hooks/useSelectOption";
import useVisible from "@/app/hooks/useVisible";
import {
	ISelectOptions,
	initialSelectOptions,
} from "@/app/interfaces/selectOptions";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import Header from "../../components/Header";
import "./preparation.scss";

type Props = {
	params: {
		id: string;
	};
};

const PreparationPage = ({ params: { id } }: Props) => {
	const { randomItem, handleNextQuestion } = useQuestionFetch(id);
	const { isActive, handleChangeActive } = useVisible();
	const { selectOption, handleChangeTypeOption } =
		useSeletOption(initialSelectOptions);

	return !randomItem?._id ? (
		<>
			<Header />
			<Loader />
		</>
	) : (
		<main className="container-preparation-wrapper">
			<Header />
			<section className="container-preparation-content">
				<h2 className="title-type-question">Вопросы по {id}</h2>
				<section className="section-select-opions">
					{selectOption.map((item: ISelectOptions) => {
						return (
							<SelectOption
								key={item.typeOption}
								typeOption={item.typeOption}
								options={item.options}
								handleChangeTypeOption={handleChangeTypeOption}
							/>
						);
					})}
				</section>
				<section className="section-question-answer">
					<button
						className={`button-visible-answer ${isActive ? "" : "active"}`}
						onClick={handleChangeActive}
						aria-label="Показать ответ"
					>
						{randomItem.question}
						{isActive ? <CgChevronDown /> : <CgChevronUp />}
					</button>
					<pre className={`describe-answer-text ${isActive ? "" : "active"}`}>
						{randomItem.answer}
					</pre>
					<button
						onClick={handleNextQuestion}
						className={`button-next-question ${isActive ? "" : "active"}`}
					>
						Next
					</button>
				</section>
			</section>
		</main>
	);
};

export default PreparationPage;
