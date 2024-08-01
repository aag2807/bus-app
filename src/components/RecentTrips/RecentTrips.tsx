import React from 'react';
import {SnapItem, SnapList} from "react-snaplist-carousel";
import {useSnapshot} from "valtio";
import {HomePageStore, IHomePageStore, IPreviousTrip} from "../../state/home-page/home-page.store";
import {IoArrowForward, IoChevronForward} from "react-icons/io5";

const RecentTrips: React.FC = () =>
{
	const store = useSnapshot<IHomePageStore>( HomePageStore );

	return (
		<div id={"category-list-slider"} className="flex flex-row my-7">
			<SnapList direction={'horizontal'}>
				{store.previousSearches.map( ( trip ) => (
					<React.Fragment key={`${trip.from} - ${trip.to}`}>
						<SnapItem snapAlign={"start"} margin={{left: '8px', right: '8px'}}>
							<TripCard trip={trip}/>
						</SnapItem>
					</React.Fragment>
				) )}
			</SnapList>
		</div>
	);
};

interface ITripCardProps {
	trip: IPreviousTrip
}

const TripCard: React.FC<ITripCardProps> = ( {trip} ) =>
{
	return (
		<article className={"flex flex-col p-4 min-h-[120px] min-w-[250px] bg-[#489bfc] rounded-[32px]"}>
			<div className="flex flex-row h-full">
				<div className="flex flex-col w-full h-full">
					<div className="flex flex-row justify-between">
						<span className={"text-white font-bold text-[15px]"}>{trip.from}</span>
						<span className="inline-flex items-center justify-center">
							<IoArrowForward color={'#ffdd6a'} size={20}/>
						</span>
						<span className={"text-white font-bold text-[15px]"}>{trip.to}</span>
					</div>
					<div className="flex flex-row justify-between">
						<span className={"text-white font-bold text-[#8ec8fd] text-[13px] font-[500]"}>{trip.tripDepartureTime}</span>
						<span className={"text-white font-bold text-[#8ec8fd] text-[13px] font-[500]"}>{trip.tripArrivalTime}</span>
					</div>
				</div>
				<div className="flex flex-col justify-center align-center items-center h-full">
					<IoChevronForward color={'#ffdd6a'} size={20}/>
				</div>
			</div>
			<div className="flex flex-row justify-around items-center">
				<span className={"text-white font-bold text-[#98cdfd] text-[13px] font-[500]"}>{trip.tripDate}</span>
				<span className={"h-2 w-2 rounded-full bg-[#ffdd6a] mx-auto"}></span>
				<span className={"text-white font-bold text-[#98cdfd] text-[13px] font-[500]"}>{trip.passengers} Passengers</span>
			</div>
		</article>
	)
}

export default RecentTrips;
