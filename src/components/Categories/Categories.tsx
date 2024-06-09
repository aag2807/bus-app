import React from 'react';
import {SnapItem, SnapList} from "react-snaplist-carousel";

type TCategory = {
	value: string;
	label: string;
	isSelected: boolean;
}

interface ICategoriesProps {
	onCategoryChange: ( category: string ) => void;
}

const categories: TCategory[] = [
	{
		isSelected: true,
		label: "Todos",
		value: "all"
	},
	{
		isSelected: false,
		label: "Santo Domingo",
		value: "santo-domingo"
	},
	{
		isSelected: false,
		label: "Santiago",
		value: "santiago"
	},
	{
		isSelected: false,
		label: "San Cristobal",
		value: "san-cristobal"
	}
];

const Categories: React.FC<ICategoriesProps> = ( props ) =>
{
	const [categoryList, setCategoryList] = React.useState<TCategory[]>( categories );

	const handleCategoryChange = ( categoryValue: string ) =>
	{
		const newCategoryList = categoryList.map( ( category ) =>
		{
			category.isSelected = category.value === categoryValue;
			return category;
		} );

		setCategoryList( newCategoryList );
		props.onCategoryChange( categoryValue );
	}

	return (
		<div id={"category-list-slider"} className="flex flex-row my-7">
			<SnapList direction={'horizontal'}>
				{categories.map( ( category ) => (
					<React.Fragment key={category.label}>
						<SnapItem snapAlign={"start"} margin={{left: '8px', right: '8px'}}>
							<div className={`w-[120px] h-[30px] rounded-full text-[14px] border border-1 border-white py-4 bg-[#08387f] flex items-center justify-center transition ${category.isSelected ? "bg-white text-[#08387f] font-semibold" : ""}`} onClick={() => handleCategoryChange( category.value )}>
								{category.label}
							</div>
						</SnapItem>
					</React.Fragment>
				) )}
			</SnapList>
		</div>
	);
};

export default Categories;
