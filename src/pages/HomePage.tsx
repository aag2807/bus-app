import {IonContent, IonPage} from '@ionic/react';
import './HomePage.css';
import TitleBar from "../components/TitleBar";
import Categories from "../components/Categories/Categories";
import React from "react";
import Card from "../components/Card";
import TripSearchForm from "../components/TripSearchForm/TripSearchForm";
import RecentTrips from "../components/RecentTrips/RecentTrips";
import {useSnapshot} from "valtio";
import {HomePageStore, IHomePageStore} from "../state/home-page/home-page.store";


const HomePage: React.FC = () =>
{
	const store = useSnapshot<IHomePageStore>( HomePageStore );

	return (
		<IonPage>
			<IonContent fullscreen class={"min-h-full min-w-full flex flex-col"}>
				<div className="bg-[#08387f] flex-1 min-h-screen min-w-screen px-6 text-white pt-4">
					<TitleBar title={"Agenda tu viaje <br/> con nosotros"} showBackButton={false}/>
					<Categories onCategoryChange={( value ) => console.log( value )}/>
					<div className="mt-5 w-full">
						<Card>
							<TripSearchForm/>
						</Card>
					</div>
					<div className="flex flex-col mt-5">
						<div className="flex flex-row items-center">
							<h5 className={"text-white font-bold"}>Vistos Recientemente</h5>
							<h6 className={"text-white font-bold ms-auto"}>Ver Todos</h6>
						</div>

						<RecentTrips/>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default HomePage;
