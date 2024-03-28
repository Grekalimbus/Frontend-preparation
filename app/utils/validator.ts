interface Data {
	[key: string]: string;
}

interface Config {
	[key: string]: {
		[key: string]: {
			message: string;
		};
	};
}

interface Errors {
	[key: string]: string;
}

export function validator(data: Data, config: Config): Errors {
	const errors: Errors = {};

	function validate(
		validateMethod: string,
		data: string,
		config: { message: string }
	): string | undefined {
		switch (validateMethod) {
			case "isRequired":
				if (data.trim() === "") return config.message;
				break;
			case "isLength":
				if (data.length < 4) {
					return config.message;
				}
				break;
		}
		return undefined;
	}

	for (const fieldName in data) {
		if (Object.prototype.hasOwnProperty.call(data, fieldName)) {
			const fieldConfig = config[fieldName];
			for (const validateMethod in fieldConfig) {
				if (Object.prototype.hasOwnProperty.call(fieldConfig, validateMethod)) {
					const error = validate(
						validateMethod,
						data[fieldName],
						fieldConfig[validateMethod]
					);
					if (error && !errors[fieldName]) {
						errors[fieldName] = error;
					}
				}
			}
		}
	}

	return errors;
}
