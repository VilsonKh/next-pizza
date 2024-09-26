import React from "react";
import { WhiteBlock } from "../WhiteBlock";
import { Input } from "../../ui";
import { AddressInput, ErrorText, FormTextarea } from "../FormComponents";
import { Controller, useFormContext } from "react-hook-form";


interface Props {
	className?: string;
}

export const CheckoutDeliveryForm: React.FC<Props> = ({className}) => {
	const { control } = useFormContext();

	return (
		<WhiteBlock title="3. Адрес доставки" className={className}>
			<div className="flex flex-col gap-5">
				<Controller
					control={control}
					name="address"
					render={({ field, fieldState }) => (
						<>
							<AddressInput onChange={field.onChange} />
							{fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
						</>
					)}
				/>

				<FormTextarea
					name="comment"
					rows={5}
					className="text-base"
					placeholder="Комментарий к заказу"
				/>
			</div>
		</WhiteBlock>
	);
};
