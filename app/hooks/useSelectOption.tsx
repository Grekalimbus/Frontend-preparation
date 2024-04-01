import { useState } from "react";
import { ISelectOptions } from "../interfaces/selectOptions";

const useSelectOption = (initialSelectOptions: ISelectOptions[]) => {
	const [selectOptionMutate, setSelectOptionMutate] =
		useState<ISelectOptions[]>(initialSelectOptions);

	const handleChangeTypeOption = (
		updateSelectValue: string,
		selectField: string
	) => {
		const updateSelectOptions = selectOptionMutate.map(item => {
			if (item.typeOption === selectField) {
				return {
					typeOption: updateSelectValue,
					options: item.options,
				};
			}
			return item;
		});

		setSelectOptionMutate(updateSelectOptions);
	};
	return { selectOptionMutate, handleChangeTypeOption };
};

export default useSelectOption;
