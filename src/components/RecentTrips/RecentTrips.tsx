import React from 'react';
import {SnapItem, SnapList} from "react-snaplist-carousel";

const RecentTrips: React.FC = () =>
{
	const [recentTrips, setRecentTrips] = React.useState<any[]>([{}]);

	return (
		<div id={"category-list-slider"} className="flex flex-row my-7">
			<SnapList direction={'horizontal'}>
				{recentTrips.map( ( category ) => (
					<React.Fragment key={category.label}>
						<SnapItem snapAlign={"start"} margin={{left: '8px', right: '8px'}}>
							<TripCard/>
						</SnapItem>
					</React.Fragment>
				) )}
			</SnapList>
		</div>
	);
};

const TripCard: React.FC = () => {
	return (
		<article className={"flex flex-col p-4 min-h-[120px] min-w-[240px] bg-[#489bfc] rounded-[42px]"}>

		</article>
	)
}

export default RecentTrips;
