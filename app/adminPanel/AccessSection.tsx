import InputField from "../components/InputField";
import SelectOption from "../components/SelectOption";
import useComplexSelectOption from "../hooks/useComplexSelectOption";
import useComplexVisible from "../hooks/useComplexVisible";
import useSelectOption from "../hooks/useSelectOption";
import { ISelectHook } from "../interfaces/selectHook";
import {
	ISelectOptions,
	initialAdminOptions,
	initialTechnologies,
} from "../interfaces/selectOptions";
import AddQuestion from "./AddQuestion";
import FlexButtons from "./FlexButtons";

interface IProps {
	isAccess: boolean;
	inputValue: string;
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccessSection = ({ isAccess, handleChangeInput, inputValue }: IProps) => {
	const { selectOptionMutate, handleChangeTypeOption } =
		useSelectOption(initialAdminOptions);
	const selectTechnologies: ISelectHook =
		useComplexSelectOption(initialTechnologies);
	const { isVisibleElem, textSelectOption } = useComplexVisible(
		selectOptionMutate[0].typeOption
	);
	console.log(
		"selectTechnologies.selectOption",
		selectTechnologies.selectOption
	);
	return (
		isAccess && (
			<>
				{selectOptionMutate.map((item: ISelectOptions) => {
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
						<>
							<p className="elem-question-text">
								Это две стратегии веб-разработки, которые подразумевают
							</p>
							<InputField
								textArea={false}
								handleChangeInput={handleChangeInput}
								value={inputValue}
								type="text"
								placeholder="Фильтрация"
								name="filter"
							/>
						</>
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
