import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact} from '@ionic/react';
import {IonReactHashRouter, IonReactRouter} from '@ionic/react-router';
import {bus, home, person} from 'ionicons/icons';
import HomePage from './pages/HomePage';
import Tickets from './pages/Tickets';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/high-contrast.css';

/* Theme variables */
import './theme/variables.css';
import './theme/tabs.css';
import './theme/overrides.css';
import {useSnapshot} from "valtio";
import {GlobalStore, IGlobalStore} from "./state/global.store";
import LoadingOverlay from "./components/LoadingOverlay";
import {TicketDetail} from "./pages/TicketDetail";
import PaymentForm from "./pages/PaymentForm";
import React from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from "./pages/user/UserProfile";

setupIonicReact();

const App: React.FC = () =>
{
	const globalStore = useSnapshot<IGlobalStore>( GlobalStore );

	return (
		<IonApp className={"relative z-[1]"}>
			{globalStore.isLoading && <LoadingOverlay/>}
			<ToastContainer/>

			<IonReactHashRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Route exact path="/tab1">
							<HomePage/>
						</Route>
						<Route exact path="/tab2">
							<Tickets/>
						</Route>
						<Route path="/tab3">
							<UserProfile/>
						</Route>
						<Route path="/detail/:index">
							<TicketDetail/>
						</Route>
						<Route path="/payment-form">
							<PaymentForm/>
						</Route>
						<Route exact path="/">
							<Redirect to="/tab1"/>
						</Route>
					</IonRouterOutlet>
					<IonTabBar slot="bottom" className={"mb-[20px] mt-[10px] mx-[20px] rounded-full py-4 bg-white"}>
						<IonTabButton tab="tab1" href="/tab1" className={"flex ion-align-items-center min-h-[60px] bg-white"}>
							<IonIcon aria-hidden="true" icon={home} size={'small'}/>
						</IonTabButton>
						<IonTabButton tab="tab2" href="/tab2" className={"flex ion-align-items-center min-h-[60px] bg-white"}>
							<IonIcon aria-hidden="true" icon={bus} size={'small'}/>
						</IonTabButton>
						<IonTabButton tab="tab3" href="/tab3" className={"flex ion-align-items-center min-h-[60px] bg-white"}>
							<IonIcon aria-hidden="true" icon={person} size={'small'}/>
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
			</IonReactHashRouter>
		</IonApp>
	);
}

export default App;
