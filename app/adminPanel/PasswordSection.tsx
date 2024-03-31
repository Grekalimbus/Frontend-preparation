import InputField from "../components/InputField";

interface IProps {
	isAccess: boolean;
	inputValue: string;
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleCheckPassword: () => void;
}

const PasswordSection = ({
	isAccess,
	inputValue,
	handleChangeInput,
	handleCheckPassword,
}: IProps) => {
	return (
		!isAccess && (
			<section className="section-check-password">
				<InputField
					value={inputValue}
					type="password"
					placeholder="Введите пароль администратора"
					name="password"
					textArea={false}
					handleChangeInput={handleChangeInput}
				/>
				<button
					className="button-submit-password"
					onClick={handleCheckPassword}
				>
					Submit
				</button>
			</section>
		)
	);
};

export default PasswordSection;
