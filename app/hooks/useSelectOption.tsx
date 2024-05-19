import { useState } from "react";
import { SelectOptions } from "../interfaces/selectOptions";

const useSelectOption = (initialSelectOptions: SelectOptions[]) => {
	const [selectOption, setSelectOption] =
		useState<SelectOptions[]>(initialSelectOptions);

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
