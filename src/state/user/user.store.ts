//@ts-ignore
import {proxy} from 'valtio';
import {ITicket} from '../tickets/tickets.store';

export interface IUserStore {
	name: string;
	email: string;
	phoneNumber: string;
	purchases: ITicket[];
}

export const UserStore = proxy<IUserStore>( {
	name: 'Pedro Medina',
	email: 'pedro.medina@email.com',
	phoneNumber: '+1 234 567 8900',
	purchases: [
		{
			from: 'SDQ',
			to: 'Santiago',
			tripType: 'ONE_WAY',
			tripDate: '2024-08-15',
			passengers: 1,
			tripDepartureTime: '09:00',
			tripArrivalTime: '12:00',
			price: 500.00,
			company: 'Expresos Bavaro',
			duration: '2h 30m'
		},
		{
			from: 'Santiago',
			to: 'San Cristobal',
			tripType: 'ROUND_TRIP',
			tripDate: '2024-08-16',
			passengers: 2,
			tripDepartureTime: '14:00',
			tripArrivalTime: '16:30',
			price: 500.00,
			company: 'Caribe Tours',
			duration: '2h 30m'
		},
		{
			from: 'San Cristobal',
			to: 'SDQ',
			tripType: 'ONE_WAY',
			tripDate: '2024-08-17',
			passengers: 3,
			tripDepartureTime: '08:30',
			tripArrivalTime: '10:00',
			price: 500.00,
			company: 'Metro',
			duration: '2h 30m'
		}
	]
} );
