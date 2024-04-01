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
import DeleteQuestion from "./DeleteQuestion";

interface IProps {
	isAccess: boolean;
	inputValue: string;
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccessSection = ({ isAccess, handleChangeInput, inputValue }: IProps) => {
	const { selectOption, handleChangeTypeOption } =
		useSelectOption(initialAdminOptions);
	const selectTechnologies: ISelectHook =
		useComplexSelectOption(initialTechnologies);
	const { isVisibleElem, textSelectOption } = useComplexVisible(
		selectOption[0].typeOption
	);
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
					<DeleteQuestion
						isVisibleElem={isVisibleElem}
						typeOption={selectTechnologies.selectOption[0].typeOption}
						inputValue={inputValue}
						handleChangeInput={handleChangeInput}
					/>

					<AddQuestion
						textSelectOption={textSelectOption}
						selectTechnologies={selectTechnologies.selectOption}
					/>
				</section>
			</>
		)
	);
};

export default AccessSection;
