//@ts-ignore
import {proxy} from 'valtio'
import {TripType} from "../home-page/home-page.store";

type companies = 'Expresos Bavaro'|'Caribe Tours'|'Metro';

type destinations = 'SDQ'|'Santiago'|'San Cristobal';

export interface ITicket {
	from: destinations;
	to: destinations;
	tripType: TripType;
	tripDate: string;
	passengers: number;
	tripDepartureTime?: string;
	tripArrivalTime?: string;
	company: companies;
	price: number;
	duration: string;
}


const dummyTicketData: ITicket[] = [
	{
		from: 'SDQ',
		to: 'Santiago',
		tripType: TripType.ONE_WAY,
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
		tripType: TripType.ROUND_TRIP,
		tripDate: '2024-08-16',
		passengers: 2,
		tripDepartureTime: '14:00',
		price: 500.00,
		tripArrivalTime: '16:30',
		duration: '2h 30m',
		company: 'Caribe Tours'
	},
	{
		from: 'San Cristobal',
		to: 'SDQ',
		duration: '2h 30m',
		tripType: TripType.ONE_WAY,
		tripDate: '2024-08-17',
		passengers: 3,
		tripDepartureTime: '08:30',
		price: 500.00,
		tripArrivalTime: '10:00',
		company: 'Metro'
	},
	{
		from: 'SDQ',
		duration: '2h 30m',
		to: 'San Cristobal',
		tripType: TripType.ROUND_TRIP,
		tripDate: '2024-08-18',
		passengers: 1,
		tripDepartureTime: '11:00',
		tripArrivalTime: '12:30',
		price: 500.00,
		company: 'Expresos Bavaro'
	},
	{
		from: 'Santiago',
		duration: '2h 30m',
		to: 'SDQ',
		tripType: TripType.ONE_WAY,
		tripDate: '2024-08-19',
		passengers: 2,
		tripDepartureTime: '13:00',
		price: 500.00,
		tripArrivalTime: '16:00',
		company: 'Caribe Tours'
	},
	{
		from: 'San Cristobal',
		to: 'Santiago',
		duration: '2h 30m',
		tripType: TripType.ROUND_TRIP,
		tripDate: '2024-08-20',
		passengers: 4,
		price: 500.00,
		tripDepartureTime: '10:00',
		tripArrivalTime: '12:30',
		company: 'Metro'
	}
];

export interface ITicketsStore {
	tickets: ITicket[];
	companies: {
		isSelected: boolean;
		value: companies;
	}[];
	selectedCategoryValue: string;
}

export const TicketStore = proxy( {
	tickets: dummyTicketData,
	companies: [
		{
			isSelected: true,
			value: 'Expresos Bavaro'
		},
		{
			isSelected: false,
			value: 'Caribe Tours'
		},
		{
			isSelected: false,
			value: 'Metro'
		}
	],
	selectedCategoryValue: ''
} )
