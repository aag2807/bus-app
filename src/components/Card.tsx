import React from 'react';

type TCardProps = {
	children: React.ReactNode;
}

const Card: React.FC<TCardProps> = ( props ) =>
{
	return (
		<div className={"bg-[#489bfc] rounded-[42px] p-5 flex flex-col"}>
			{props.children}
		</div>
	);
};

export default Card;
