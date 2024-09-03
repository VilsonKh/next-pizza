"use client";

import { Trash2Icon } from "lucide-react";
import { CartItemDetailsImage, CartItemDetailsPrice, CartItemInfo } from "./CartItemDetails";
import { CartItemProps } from "./CartItemDetails/CartItemDetails.types";
import { CountButton } from "./CountButton";
import { cn } from "@/shared/lib/utils";

interface Props extends CartItemProps {
	onClickCountButton: (type: "plus" | "minus") => void;
	onClickRemove?: () => void;
}

const CartDrawerItem: React.FC<Props> = ({
	imageUrl,
	details,
	name,
	price,
	quantity,
	onClickRemove,
	onClickCountButton,
	disabled,
}) => {
	return (
		<div
			className={cn("flex bg-white p-5 gap-6", disabled && "opacity-50 pointer-events-none")}
		>
			<CartItemDetailsImage src={imageUrl} />

			<div className="flex-1">
				<CartItemInfo
					name={name}
					details={details}
				/>

				<hr className="my-3" />

				<div className="flex items-center justify-between">
					<CountButton
						onClick={onClickCountButton}
						value={quantity}
					></CountButton>

					<div className="flex items-center gap-3">
						<CartItemDetailsPrice value={price} />
						<Trash2Icon
							onClick={onClickRemove}
							className="text-gray-400 cursor-pointer hover:text-gray-600"
							size={16}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartDrawerItem;
