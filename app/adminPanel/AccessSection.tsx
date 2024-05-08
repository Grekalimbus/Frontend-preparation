import { useState } from "react";
import SelectOption from "../components/SelectOption";
import useSelectOption from "../hooks/useSelectOption";
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
	const [toggleVisibleSelect, setToggleVisibleSelect] = useState<boolean>(true);
	const { selectOption: actions, handleChangeTypeOption: changeAction } =
		useSelectOption(initialAdminOptions);
	const {
		selectOption: technologies,
		handleChangeTypeOption: changeTechnologies,
	} = useSelectOption(initialTechnologies);

	const handleChangeToggle = () => {
		setToggleVisibleSelect(!toggleVisibleSelect);
	};

	return (
		isAccess && (
			<>
				{actions.map((item: ISelectOptions) => {
					return (
						<SelectOption
							key={item.typeOption}
							typeOption={item.typeOption}
							options={item.options}
							handleChangeTypeOption={changeAction}
							width={{ width: "100%" }}
						/>
					);
				})}
				{toggleVisibleSelect &&
					technologies.map((item: ISelectOptions) => (
						<SelectOption
							width={{ width: "100%" }}
							key={item.typeOption}
							typeOption={item.typeOption}
							options={item.options}
							handleChangeTypeOption={changeTechnologies}
						/>
					))}
				<section>
					<DeleteQuestion
						technology={technologies[0].typeOption}
						actions={actions[0].typeOption}
						handleChangeInput={handleChangeInput}
					/>
					<ChangeQuestion
						technology={technologies[0].typeOption}
						technologiesSelectOptions={technologies}
						actions={actions[0].typeOption}
						handleChangeToggle={handleChangeToggle}
					/>
					<AddQuestion
						actions={actions[0].typeOption}
						technologiesSelectOptions={technologies}
					/>
				</section>
			</>
		)
	);
};

export default AccessSection;
