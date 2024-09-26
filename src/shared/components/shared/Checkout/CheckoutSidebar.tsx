import React from "react";
import { WhiteBlock } from "../WhiteBlock";
import { CheckoutCostItem } from "./CheckoutCostItem";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../../ui";

interface Props {
	totalAmount: number;
	loading?: boolean;
}

const VAT = 20;
const DELIVERY_PRICE = 250;

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading }) => {
	const vatPrice = (totalAmount * VAT) / 100;
	const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

	return (
		<WhiteBlock className="p-6 sticky top-4">
			<div className="flex flex-col gap-1">
				<span className="text-xl">Итого:</span>
				{loading ? (
					<Skeleton className="h-11 w-full" />
				) : (
					<span className="h-11 text-[34px] font-extrabold">{totalPrice}</span>
				)}
			</div>

			<CheckoutCostItem
				title={
					<div className="flex items-center">
						<Package
							className="mr-2 text-gray-300 "
							size={18}
						/>
						Стоимость корзины:
					</div>
				}
				value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${totalAmount} ₽`}
			/>
			<CheckoutCostItem
				title={
					<div className="flex items-center">
						<Percent
							className="mr-2 text-gray-300 "
							size={18}
						/>
						Налоги:
					</div>
				}
				value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${vatPrice} ₽`}
			/>
			<CheckoutCostItem
				title={
					<div className="flex items-center">
						<Truck
							className="mr-2 text-gray-300 "
							size={18}
						/>
						Доставка:
					</div>
				}
				value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${DELIVERY_PRICE} ₽`}
			/>

			<Button
				type="submit"
				className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
			>
				Перейти к оплате
				<ArrowRight className="w-5 ml-2" />
			</Button>
		</WhiteBlock>
	);
};
