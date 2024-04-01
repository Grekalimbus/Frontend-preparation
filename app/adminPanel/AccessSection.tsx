import InputField from "../components/InputField";
import SelectOption from "../components/SelectOption";
import useComplexSelectOption from "../hooks/useComplexSelectOption";
import { ISelectHook } from "../interfaces/selectHook";
import {
	ISelectOptions,
	initialTechnologies,
} from "../interfaces/selectOptions";
import AddQuestion from "./AddQuestion";
import FlexButtons from "./FlexButtons";

interface IProps {
	isAccess: boolean;
	selectOption: ISelectOptions[];
	inputValue: string;
	textSelectOption: string;
	isVisibleElem: boolean;
	handleChangeTypeOption: (
		updateSelectValue: string,
		selectField: string
	) => unknown;
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccessSection = ({
	isAccess,
	selectOption,
	handleChangeTypeOption,
	isVisibleElem,
	handleChangeInput,
	inputValue,
	textSelectOption,
}: IProps) => {
	const selectTechnologies: ISelectHook =
		useComplexSelectOption(initialTechnologies);
	console.log("textSelectOption", textSelectOption);
	return (
		isAccess && (
			<>
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
				{selectTechnologies.selectOption.map((item: ISelectOptions) => (
					<SelectOption
						width={{ width: "100%" }}
						key={item.typeOption}
						typeOption={item.typeOption}
						options={item.options}
						handleChangeTypeOption={selectTechnologies.handleChangeTypeOption}
					/>
				))}
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
					{textSelectOption !== "Добавить" ? null : (
						<AddQuestion selectTechnologies={selectTechnologies.selectOption} />
					)}

					{textSelectOption === "Выбирете: Удалить /Изменить / Добавить" ||
					textSelectOption === "Добавить" ? null : (
						<FlexButtons
							firstValue="Следующий"
							secondValue={textSelectOption}
						/>
					)}
				</section>
			</>
		)
	);
};

export default AccessSection;
