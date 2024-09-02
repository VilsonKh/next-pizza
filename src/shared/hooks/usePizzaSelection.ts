import React from "react";
import { PizzaSize, pizzaSizes, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { ProductItem } from "@prisma/client";

export const usePizzaSelection = (items: ProductItem[]) => {
  const [size, setSize] = React.useState<PizzaSize>(20);
	const [type, setType] = React.useState<PizzaType>(1);

  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);

	const availablePizzas = pizzaSizes.map((item) => ({
		name: item.name,
		value: item.value,
		disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
	}))

	const  currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id


	React.useEffect(() => {
		const availableSizes = filteredPizzasByType.map((pizza) => Number(pizza.size))
		if(!availableSizes.includes(size)) {
			setSize(availableSizes[0] as PizzaSize || 20)
		}
		
	}, [type, size, filteredPizzasByType])

  return {size, setSize, type, setType, availablePizzas, currentItemId}
}