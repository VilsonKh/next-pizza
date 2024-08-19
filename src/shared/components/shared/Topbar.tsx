import { cn } from "@/shared/lib/utils";
import { Container } from "./Container";
import { Categories } from "./Categories";
import { SortPopup } from "./SortPopup";
import { Category } from "@prisma/client";

interface Props {
	items: Category[];
	className?: string;
}

export const Topbar: React.FC<Props> = ({items, className }) => {
	return (
		<div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
			<Container className="flex items-center justify-between">
				<Categories categories={items}/>
				<SortPopup />
			</Container>
		</div>
	);
};
