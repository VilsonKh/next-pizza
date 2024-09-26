"use client";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
	onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions
			token="d95798b7f81f9941e9f850b07f6c84304ff39784"
			onChange={(data) => onChange?.(data?.value)}
		/>
	);
};
