import { Container, Filters, ProductsGroupList, Title, Topbar } from "@/shared/components/shared";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/lib/findPizzas";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
	const categories = await findPizzas(searchParams);

	return (
		<>
			<Container className="mt-10">
				<Title
					text="Все пиццы"
					size="lg"
					className="font-extrabold"
				/>
			</Container>
			<Topbar items={categories.filter((category) => category.products.length > 0)} />
			<Container className="pb-14 mt-10">
				<div className="flex gap-[60px]">
					{/* Filters */}
					<div className="w-[250px]">
						<Suspense>
							<Filters />
						</Suspense>
					</div>

					{/* Products */}
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							{categories.map(
								(category) =>
									category.products.length > 0 && (
										<ProductsGroupList
											key={category.id}
											title={category.name}
											categoryId={category.id}
											items={category.products}
										/>
									)
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
