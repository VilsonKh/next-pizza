import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./Title";
import { Button } from "../ui";
import { PizzaImage } from "./PizzaImage";
import { OptionsGroup } from "./OptionsGroup";
import {
	mapPizzaType,
	PizzaSize,
	PizzaType,
	pizzaTypes,
} from "@/shared/constants/pizza";
import { Ingredient as IngredientItem } from "./Ingredient";
import { Ingredient, ProductItem } from "@prisma/client";
import { useSet } from "react-use";
import { calcTotalPizzaPrice } from "@/shared/lib/calcPizzaPrice";
import { usePizzaSelection } from "@/shared/hooks/usePizzaSelection";

interface Props {
	imageUrl: string;
	name: string;
	className?: string;
	ingredients: Ingredient[];
	items: ProductItem[];
	loading?: boolean;
	onSubmit: (itemId: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm: React.FC<Props> = ({
	imageUrl,
	name,
	className,
	ingredients,
	items,
	loading,
	onSubmit,
}) => {
	const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

	const { size, setSize, type, setType, availablePizzas, currentItemId } =
		usePizzaSelection(items);

	const totalPrice = calcTotalPizzaPrice(items, type, size, ingredients, selectedIngredients);

	const textDetails = `${size} см, ${mapPizzaType[type].toLowerCase()} тесто`;

	console.log("ChoosePizzaForm",Array.from(selectedIngredients))

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredients));
		}
	};

	return (
		<div className={cn(className, "flex flex-1")}>
			<PizzaImage
				src={imageUrl}
				alt={name}
				size={size}
			/>

			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title
					text={name}
					size="md"
					className="font-extrabold mb-1"
				/>

				<p className="text-gray-400">{textDetails}</p>

				<div className="flex flex-col gap-2 mt-5">
					<OptionsGroup
						items={availablePizzas}
						value={String(size)}
						onClick={(value) => setSize(Number(value) as PizzaSize)}
					/>

					<OptionsGroup
						items={pizzaTypes}
						value={String(type)}
						onClick={(value) => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
					<div className="grid grid-cols-3 gap-3">
						{ingredients.map((ingredient) => (
							<IngredientItem
								key={ingredient.id}
								name={ingredient.name}
								price={ingredient.price}
								imageUrl={ingredient.imageUrl}
								onClick={() => addIngredient(ingredient.id)}
								active={selectedIngredients.has(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					loading={loading}
					onClick={handleClickAdd}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
				>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};
