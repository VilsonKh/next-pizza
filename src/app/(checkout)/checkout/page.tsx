"use client";

import { Container, Title } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks/useCart";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CheckoutCart,
	CheckoutDeliveryForm,
	CheckoutPersonalForm,
	CheckoutSidebar,
} from "@/shared/components/shared/Checkout";
import {
	checkoutFormSchema,
	TCheckoutFormValues,
} from "@/shared/constants/Schemas/CheckoutFormSchema";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useState } from "react";

export default function CheckoutPage() {
	const { totalAmount, items, removeCartItem, onClickCountButton, initialLoading, loading } = useCart();
	const [submiting, setSubmiting] = useState(false);
	const form = useForm<TCheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			phone: "",
			address: "",
			comment: "",
		},
	});

	const onSubmit: SubmitHandler<TCheckoutFormValues> = async (data) => {
		try {
			setSubmiting(true);
			const url = await createOrder(data);

			toast.success("Заказ успешно оформлен! Переход на оплату...", {
				icon: "✅",
			});

			if (url) {
				location.href = url;
			}
		} catch (err) {
			console.log(err);
			setSubmiting(false)
			toast.error("Не удалось создать заказ", {
				icon: "❌",
			});
		} 
	};

	return (
		<Container className="mt-10">
			<Title
				text="Оформление заказа"
				className="font-extrabold mb-8 text-[36px]"
			/>

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex gap-10">
						{/* Left */}
						<div className="flex flex-col gap-10 flex-1 mb-20">
							<CheckoutCart
								items={items}
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								loading={initialLoading}
							/>
							<CheckoutPersonalForm
								className={initialLoading ? "opacity-40 pointer-events-none" : ""}
							/>
							<CheckoutDeliveryForm
								className={initialLoading ? "opacity-40 pointer-events-none" : ""}
							/>
						</div>

						{/* Right */}
						<div className="w-[450px]">
							<CheckoutSidebar
								totalAmount={totalAmount}
								loading={loading || submiting}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
