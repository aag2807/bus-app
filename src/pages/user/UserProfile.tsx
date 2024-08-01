import React from 'react';
import {IonContent, IonIcon, IonPage} from '@ionic/react';
import {useSnapshot} from 'valtio';
import {business, call, mail, peopleOutline, timeOutline} from 'ionicons/icons';
import TitleBar from "../../components/TitleBar";
import {IUserStore, UserStore} from "../../state/user/user.store";

const UserProfile: React.FC = () =>
{
	const user = useSnapshot<IUserStore>( UserStore );

	return (
		<IonPage>
			<IonContent fullscreen className="bg-[#08387f]">
				<div className="flex flex-col h-full mb-20">
					<div className="bg-[#072e6f] rounded-b-2xl p-6 pb-8">
						<TitleBar title="Perfil" showBackButton={true}/>

						<div className="flex items-center mt-4">
							<div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center mr-4">
								<span className="text-white text-2xl font-bold">JD</span>
							</div>
							<div className="text-white">
								<h2 className="text-2xl font-bold">{user.name}</h2>
								<div className="flex items-center mt-1">
									<IonIcon icon={mail} className="mr-2 text-sm"/>
									<p className="text-sm">{user.email}</p>
								</div>
								<div className="flex items-center mt-1">
									<IonIcon icon={call} className="mr-2 text-sm"/>
									<p className="text-sm">{user.phoneNumber}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex-1 bg-[#489bfc] rounded-2xl mt-4 p-6">
						<h3 className="text-xl font-bold mb-4 text-white">Compras Recientes</h3>
						{user.purchases.map( ( purchase, index ) => (
							<div key={index} className="bg-white rounded-lg p-4 mb-3">
								<div className="flex justify-between items-center mb-2">
									<div>
										<p className="font-bold text-[#08387f]">{purchase.from} - {purchase.to}</p>
										<p className="text-sm text-gray-600">{purchase.tripDate}</p>
									</div>
									<p className="font-bold text-[#08387f]">${purchase.price.toFixed( 2 )}</p>
								</div>
								<div className="flex justify-between text-sm text-gray-600">
									<div className="flex items-center">
										<IonIcon icon={business} className="mr-1"/>
										<p>{purchase.company}</p>
									</div>
									<div className="flex items-center">
										<IonIcon icon={timeOutline} className="mr-1"/>
										<p>{purchase.tripDepartureTime} - {purchase.tripArrivalTime}</p>
									</div>
									<div className="flex items-center">
										<IonIcon icon={peopleOutline} className="mr-1"/>
										<p>{purchase.passengers}</p>
									</div>
								</div>
							</div>
						) )}
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default UserProfile;
