import { useState } from "react";
import { ISelectOptions } from "../interfaces/selectOptions";

const useSelectOption = (initialSelectOptions: ISelectOptions[]) => {
	const [selectOption, setSelectOption] =
		useState<ISelectOptions[]>(initialSelectOptions);

	const handleChangeTypeOption = (
		updateSelectValue: string,
		selectField: string
	) => {
		const updatedSelectOptions = selectOption.map(item => {
			if (item.typeOption === selectField) {
				return {
					typeOption: updateSelectValue,
					options: item.options,
				};
			}
			return item;
		});
		setSelectOption(updatedSelectOptions);
	};
	return { selectOption, handleChangeTypeOption };
};

export default useSelectOption;
