import React from "react";
import { WhiteBlock } from "../WhiteBlock";
import { FormInput } from "../FormComponents";

interface Props {
	className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({className}) => {
	return (
		<WhiteBlock title="2. Персональные данные" className={className}>
			<div className="grid grid-cols-2 gap-5">
				<FormInput
					name="firstName"
					className="text-base"
					placeholder="Имя"
				/>
				<FormInput
					name="lastName"
					className="text-base"
					placeholder="Фамилия"
				/>
				<FormInput
					name="email"
					className="text-base"
					placeholder="Email"
				/>
				<FormInput
								name="phone"
								className="text-base"
								mask="+{7} (000) 000-00-00"
								placeholder="Телефон +7"
							/>
			</div>
		</WhiteBlock>
	);
};
