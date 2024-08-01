import {IonContent, IonPage, useIonRouter} from '@ionic/react';
import './Tickets.css';
import TitleBar from "../components/TitleBar";
import React from "react";
import {useSnapshot} from "valtio";
import {ITicketsStore, TicketStore} from "../state/tickets/tickets.store";
import {SnapItem, SnapList} from "react-snaplist-carousel";
import {motion} from "framer-motion";
import dayjs from 'dayjs';

export function formatDate( date: string )
{
	return dayjs( date ).format( 'DD-MMM-YYYY' );
}

const Tickets: React.FC<any> = ( ) =>
{
	const router = useIonRouter();
	const store = useSnapshot<ITicketsStore>( TicketStore );

	const navigate = ( index: number ) =>
	{
		router.push('/detail/' + index );
	}

	return (
		<IonPage>
			<IonContent fullscreen class={"min-w-full flex flex-col"}>
				<div className="bg-[#08387f] flex-1 min-h-screen min-w-screen px-6 text-white pt-4">
					<TitleBar title={"Tickets"} showBackButton={true}/>
					<CompanySlider/>
					<div className="flex flex-col my-8 gap-5">
						{store.tickets.map( ( ticket, index ) => (
							<React.Fragment key={`${ticket.from} - ${ticket.to}`}>
								<motion.article
									onClick={() => navigate( index )}
									whileHover={{scale: 1.1, opacity: 0.8}}
									whileTap={{scale: 0.9, opacity: 0.8}}
									transition={{type: 'spring'}}
									className={"flex flex-col p-4 min-h-[205px] min-w-[250px] bg-[#489bfc] rounded-2xl"}>
									<div className="flex flex-row">
										<article className="flex flex-col">
											<h4 className={"mb-0 mt-1 text-[20px] text-white font-bold"}>{ticket.company}</h4>
											<h5 className={"mb-0 mt-2 text-[#a1d1fd] text-[13px] font-semibold"}>{ticket.from} - {ticket.to}</h5>
										</article>

										<div className="flex justify-center items-center ml-auto text-[22px] font-bold">
											{ticket.price} DOP
										</div>
									</div>

									<div className="flex flex-row mt-4 ">
										<div className="flex flex-col">
											<span className="inline-block text-[#a1d1fd] text-[13px] font-semibold">
												{formatDate( ticket.tripDate )}
											</span>
											<span className="inline-block  text-[20px] text-white font-bold">
												{ticket.tripDepartureTime}am
											</span>
										</div>

										<div className="flex flex-row relative mx-auto items-center justify-center">
											<span className="inline-block w-[30px] h-[2px] bg-white"></span>
											<span className="inline-block mx-3">
												{ticket.duration}
											</span>
											<span className="inline-block w-[30px] h-[2px] bg-white"></span>
										</div>

										<div className="flex flex-col">
											<span className="inline-block text-[#a1d1fd] text-[13px] font-semibold">
												{formatDate( ticket.tripDate )}
											</span>
											<span className="inline-block  text-[20px] text-white font-bold">
												{ticket.tripArrivalTime}pm
											</span>
										</div>
									</div>

									<div className="flex flex-row justify-between">
										<h5 className={"text-[22px] text-white font-bold"}>
											{ticket.from}
										</h5>

										<h5 className={"text-[22px] text-white font-bold"}>
											{ticket.to}
										</h5>
									</div>
								</motion.article>
							</React.Fragment>
						) )}
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

const CompanySlider: React.FC = () =>
{
	const store = useSnapshot<ITicketsStore>( TicketStore );

	const handleCategorySelection = ( value: string ) =>
	{
		const isRepeated = TicketStore.selectedCategoryValue === value;
		if( isRepeated )
		{
			TicketStore.selectedCategoryValue = '';
			return;
		}

		TicketStore.selectedCategoryValue = value;
	}

	return (
		<div id="category-list-slider" className="flex flex-row my-7">
			<SnapList direction="horizontal">
				{store.companies.map( ( category ) => (
					<React.Fragment key={category.value}>
						<SnapItem snapAlign="start" margin={{left: '8px', right: '8px'}}>
							<div
								className={`w-[120px] h-[30px] rounded-full text-[14px] border border-1 border-white py-4 bg-[#08387f] flex items-center justify-center transition ${store.selectedCategoryValue === category.value ? "bg-white text-[#08387f] font-semibold" : ""}`}
								onClick={() => handleCategorySelection( category.value )}
							>
								{category.value}
							</div>
						</SnapItem>
					</React.Fragment>
				) )}
			</SnapList>
		</div>
	)
}


export default Tickets;
