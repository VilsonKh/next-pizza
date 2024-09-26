import React from "react";
import { RequiredSymbol } from "../RequiredSymbol";
import { Input } from "../../ui";
import { ErrorText } from "./ErrorText";
import { ClearButton } from "./ClearButton";
import { useFormContext } from "react-hook-form";
import { IMaskInput } from "react-imask";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	required?: boolean;
	className?: string;
	mask?: string;
}
export const FormInput: React.FC<Props> = ({
	name,
	label,
	required,
	className,
	mask,
	...props
}) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext();

	const value = watch(name);
	const errorText = errors[name]?.message as string;
	const onClickClear = () => {
		setValue(name, "", { shouldValidate: true });
	};

	return (
		<div className={className}>
			{label && (
				<p className="font-medium mb-2">
					{label} {required && <RequiredSymbol />}
				</p>
			)}

			<div className="relative">
				{mask ? (
					<IMaskInput
						className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						mask={mask}
            unmask={true}
            onAccept={(value) => setValue(name, value, {shouldValidate: true})}
            value={value}
						{...register(name)}
            {...props}
					/>
				) : (
					<Input
						className="h-12 text-md"
						{...register(name)}
						{...props}
					/>
				)}

				{value && <ClearButton onClick={onClickClear} />}
			</div>

			{errorText && (
				<ErrorText
					text={errorText}
					className="mt-2"
				/>
			)}
		</div>
	);
};
