"use client";

import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "@/app/@types/prisma";
import { ChooseItemForm } from "../ChooseItemForm";

interface Props {
	className?: string;
	product: ProductWithRelations;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
	const router = useRouter();

	return (
		<Dialog
			open={Boolean(product)}
			onOpenChange={() => router.back()}
		>
			<DialogContent
				className={cn(
					"p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
					className
				)}
			>
				{<ChooseItemForm product={product} onNavigationBack={() => router.back()}/>}
			</DialogContent>
		</Dialog>
	);
};
