import {
	Container,
	Filters,
	ProductCard,
	ProductsGroupList,
	Title,
	Topbar,
} from "@/components/shared";

export default function Home() {
	return (
		<>
			<Container className="mt-10">
				<Title
					text="Все пиццы"
					size="lg"
					className="font-extrabold"
				/>
			</Container>
			<Topbar />
			<Container className="pb-14 mt-10">
				<div className="flex gap-[60px]">
					{/* Filters */}
					<div className="w-[250px]">
						<Filters />
					</div>

					{/* Products */}
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							<ProductsGroupList
								title="Пиццы"
								items={[
									{
										id: 1,
										name: "Пицца 1",
										price: 1000,
										imageUrl:
											"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
										items: [{ price: 550 }],
									},
									{
										id: 1,
										name: "Пицца 1",
										price: 1000,
										imageUrl:
											"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
										items: [{ price: 550 }],
									},
									{
										id: 1,
										name: "Пицца 1",
										price: 1000,
										imageUrl:
											"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
										items: [{ price: 550 }],
									},
									{
										id: 1,
										name: "Пицца 1",
										price: 1000,
										imageUrl:
											"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
										items: [{ price: 550 }],
									},
								]}
								categoryId={1}
							/>
              <ProductsGroupList
								title="Закуски"
								items={[
									{
										id: 1,
										name: "Пицца 1",
										price: 1000,
										imageUrl:
											"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
										items: [{ price: 550 }],
									},
									{
										id: 1,
										name: "Пицца 1",
										price: 1000,
										imageUrl:
											"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
										items: [{ price: 550 }],
									},
									{
										id: 1,
										name: "Пицца 1",
										price: 1000,
										imageUrl:
											"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
										items: [{ price: 550 }],
									},
									{
										id: 1,
										name: "Пицца 1",
										price: 1000,
										imageUrl:
											"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
										items: [{ price: 550 }],
									},
								]}
								categoryId={2}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
