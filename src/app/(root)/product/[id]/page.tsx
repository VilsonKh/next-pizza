import { notFound } from "next/navigation";

import { Container, OptionsGroup, ProductImage, Title } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
	// const product = await prisma.product.findFirst({ where: { id: Number(id) } });

	// if (!product) {
	// 	return notFound();
	// }

	// return (
	// 	<Container className="flex flex-col my-10">
	// 		<div className="flex flex-1">
	// 			<ProductImage
	// 				src={product.imageUrl}
	// 				alt={product.name}
	// 				size={40}
	// 			/>

	// 			<div className="w-[490px] bg-[#FCFCFC] p-7">
	// 				<Title
	// 					text={product.name}
	// 					size="md"
	// 					className="font-extrabold mb-1"
	// 				/>

	// 				<p className="text-gray-400">
	// 					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam dolore in
	// 					modi perferendis deleniti autem, hic aut porro odio beatae aliquam, sit et
	// 					iusto placeat accusamus magnam maiores quod provident.
	// 				</p>

	// 				<OptionsGroup
	// 					items={[
	// 						{
	// 							name: "Маленькая",
	// 							value: "1",
	// 						},
	// 						{ name: "Средняя", value: "2" },
	// 						{ name: "Большая", value: "3", disabled: true },
	// 					]}
  //           selectedValue="1"
    
	// 				/>
	// 			</div>
	// 		</div>
	// 	</Container>
	// );
	return null
}
