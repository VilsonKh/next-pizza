import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./Title";
import { Button } from "../ui";
import { PizzaImage } from "./PizzaImage";
import { OptionsGroup } from "./OptionsGroup";
import { pizzaSizes } from "@/shared/constants/pizza";

interface Props {
	imageUrl: string;
	name: string;
	className?: string;
	ingredients: any;
	items?: any;
	onClickAdd?: () => void;
}

 export const ChoosePizzaForm: React.FC<Props> = ({
	imageUrl,
	name,
	className,
	ingredients,
	items,
	onClickAdd,
}) => {

  const textDetails = "30 см, традиционное тесто"
  const totalPrice = 350
  

	return (
		<div className={cn(className, "flex flex-1")}>
      <PizzaImage src={imageUrl} alt={name} size={30}/>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1"/>

        <p className="text-gray-400">{textDetails}</p>

				<OptionsGroup items={pizzaSizes}/>

        <Button className='h-[55px] px-10 text-base rounded-[18px] w-full'>Добавить в корзину за {totalPrice} ₽</Button>
      </div>
		</div>
	);
};

