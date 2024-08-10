import { Input } from "../ui";
import CheckboxFiltersGroup from "./CheckboxFiltersGroup";
import { FilterCheckbox } from "./FilterCheckbox";
import { RangeSlider } from "./RangeSlider";
import { Title } from "./Title";

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	return (
		<div className={className}>
			<Title
				text="Фильтрация"
				size="sm"
				className="mb-5 font-bold"
			/>
			<div className="flex flex-col gap-4">
				<FilterCheckbox
					text="Можно собирать"
					value="1"
				/>
				<FilterCheckbox
					text="Новинки"
					value="2"
				/>
			</div>
			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={1000}
						defaultValue={0}
					/>
					<Input
						type="number"
						min={100}
						max={1000}
						placeholder="1000"
					/>
				</div>
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[0, 1000]}
				/>
			</div>

			<CheckboxFiltersGroup
				title="Ингредиенты"
				className={"mt-5"}
				limit={6}
				defaultItems={[
					{ value: "1", text: "Бекон" },
					{ value: "2", text: "Сыр" },
					{ value: "3", text: "Курица" },
          { value: "4", text: "Помидоры" },
          { value: "5", text: "Огурцы" },
          { value: "6", text: "Лук" },
				]}
				items={[
          { value: "7", text: "Бекон" },
					{ value: "8", text: "Сыр" },
					{ value: "9", text: "Курица" },
          { value: "10", text: "Помидоры" },
          { value: "11", text: "Огурцы" },
          { value: "12", text: "Лук" },
          { value: "13", text: "Лук" },
          { value: "14", text: "Лук" },
          { value: "15", text: "Лук" },
        ]}
			/>
		</div>
	);
};
