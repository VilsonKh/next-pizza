'use client'

import { Trash2Icon } from "lucide-react";
import { CartItemDetailsImage, CartItemDetailsPrice, CartItemInfo } from "./CartItemDetails";
import { CartItemProps } from "./CartItemDetails/CartItemDetails.types";
import { CountButton } from "./CountButton";

const CartDrawerItem: React.FC<CartItemProps> = ({
	id,
	imageUrl,
	details,
	name,
	price,
	quantity,
}) => {

	return (
		<div className="flex bg-white p-5 gap-6">
			<CartItemDetailsImage src={imageUrl} />

			<div className="flex-1">
				<CartItemInfo
					name={name}
					details={details}
				/>

				<hr className="my-3" />

				<div className="flex items-center justify-between">
					<CountButton
						onClick={(type) => console.log(type)}
						value={quantity}
					></CountButton>

					<div className="flex items-center gap-3">
						<CartItemDetailsPrice value={price} />
						<Trash2Icon className="text-gray-400 cursor-pointer hover:text-gray-600" size={16} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartDrawerItem;
