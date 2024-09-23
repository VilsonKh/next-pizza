import {
	CheckoutCartItem,
	CheckoutCostItem,
	Container,
	Title,
	WhiteBlock,
} from "@/shared/components/shared";
import { Button, Input, Textarea } from "@/shared/components/ui";
import { useCart } from "@/shared/hooks/useCart";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

export default function CheckoutPage() {

  const {} = useCart();

	return (
		<Container className="mt-10">
			<Title
				text="Оформление заказа"
				className="font-extrabold mb-8 text-[36px]"
			/>

			<div className="flex gap-10">
				{/* Left */}
				<div className="flex flex-col gap-10 flex-1 mb-20">
					<WhiteBlock title="1. Корзина">
						<div className="flex flex-col gap-5">
							<CheckoutCartItem
								quantity={1}
								name="Пепперони"
								price={1000}
								imageUrl="https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
								details="Моцералла, Пепперони, Салями, Чеддер, Грибы"
								id={1}
							/>
						</div>
					</WhiteBlock>

					<WhiteBlock title="2. Персональные данные">
						<div className="grid grid-cols-2 gap-5">
							<Input
								name="firstName"
								className="text-base"
								placeholder="Имя"
							/>
							<Input
								name="lastName"
								className="text-base"
								placeholder="Фамилия"
							/>
							<Input
								name="email"
								className="text-base"
								placeholder="Email"
							/>
							<Input
								name="phone"
								className="text-base"
								placeholder="Телефон"
							/>
						</div>
					</WhiteBlock>

					<WhiteBlock title="3. Адрес доставки">
						<div className="flex flex-col gap-5">
							<Input
								name="address"
								className="text-base"
								placeholder="Адрес"
							/>
							<Textarea
								rows={5}
								className="text-base"
								placeholder="Комментарий к заказу"
							/>
						</div>
					</WhiteBlock>
				</div>

				{/* Right */}
				<div className="w-[450px]">
					<WhiteBlock className="p-6 sticky top-4">
						<div className="flex flex-col gap-1">
							<span className="text-xl">Итого:</span>
							<span className="text-[34px] font-extrabold">23 000 ₽</span>
						</div>

						<CheckoutCostItem
							title={
								<div className="flex items-center">
									<Package
										className="mr-2 text-gray-300 "
										size={18}
									/>
									Стоимость товаров:
								</div>
							}
							value="3 000 ₽"
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
							value="3 000 ₽"
						/>
						<CheckoutCostItem
							title={
								<div className="flex items-center">
									<Truck
										className="mr-2 text-gray-300 "
										size={18}
									/>
									Налоги:
								</div>
							}
							value="3 000 ₽"
						/>

						<Button
							type="submit"
							className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
						>
							Перейти к оплате
							<ArrowRight className="w-5 ml-2" />
						</Button>
					</WhiteBlock>
				</div>
			</div>
		</Container>
	);
}
