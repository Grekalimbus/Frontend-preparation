import SelectOption from "../components/SelectOption";
import useComplexSelectOption from "../hooks/useComplexSelectOption";
import useSelectOption from "../hooks/useSelectOption";
import { ISelectHook } from "../interfaces/selectHook";
import {
	ISelectOptions,
	initialAdminOptions,
	initialTechnologies,
} from "../interfaces/selectOptions";
import AddQuestion from "./AddQuestion";
import ChangeQuestion from "./ChangeQuestion";
import DeleteQuestion from "./DeleteQuestion";

interface IProps {
	isAccess: boolean;
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccessSection = ({ isAccess, handleChangeInput }: IProps) => {
	const { selectOption, handleChangeTypeOption } =
		useSelectOption(initialAdminOptions);
	const technologiesOptions: ISelectHook =
		useComplexSelectOption(initialTechnologies);

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
				{technologiesOptions.selectOption.map((item: ISelectOptions) => (
					<SelectOption
						width={{ width: "100%" }}
						key={item.typeOption}
						typeOption={item.typeOption}
						options={item.options}
						handleChangeTypeOption={technologiesOptions.handleChangeTypeOption}
					/>
				))}
				<section>
					<DeleteQuestion
						technologiesOptions={technologiesOptions.selectOption[0].typeOption}
						selectOption={selectOption[0].typeOption}
						handleChangeInput={handleChangeInput}
					/>
					<ChangeQuestion
						technologiesOptions={technologiesOptions.selectOption[0].typeOption}
						technologiesSelectOptions={technologiesOptions.selectOption}
						selectOption={selectOption[0].typeOption}
					/>
					<AddQuestion
						selectOption={selectOption[0].typeOption}
						technologiesSelectOptions={technologiesOptions.selectOption}
					/>
				</section>
			</>
		)
	);
};

export default AccessSection;
