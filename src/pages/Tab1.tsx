import {IonContent, IonPage} from '@ionic/react';
import './Tab1.css';
import TitleBar from "../components/TitleBar";

const Tab1: React.FC = () =>
{
	return (
		<IonPage>
			<IonContent fullscreen class={"min-h-full min-w-full flex flex-col"}>
				<div className="bg-[#08387f] flex-1 min-h-screen min-w-screen px-6 text-white pt-4">
					<TitleBar title={"Book Your trip with us"} showBackButton={false}/>
					<div className=""></div>
					
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Tab1;
