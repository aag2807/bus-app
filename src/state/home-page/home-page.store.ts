//@ts-ignore
import {proxy} from 'valtio'

export enum TripType
{
	ONE_WAY = 1,
	ROUND_TRIP = 2
}

export interface IPreviousTrip
{
	from: string;
	to: string;
	tripType: TripType;
	tripDate: string;
	passengers: number;
	tripDepartureTime?: string;
	tripArrivalTime?: string;
}

export interface IHomePageStore
{
	previousSearches: IPreviousTrip[]
}

const dummyPreviousTrips: IPreviousTrip[] = [
	{
		from: "SDQ",
		to: "Santiago",
		tripType: TripType.ONE_WAY,
		tripDate: "2023-07-15",
		passengers: 2,
		tripDepartureTime: "08:00 am",
		tripArrivalTime: "11:30 pm"
	},
	{
		from: "Santiago",
		to: "SDQ",
		tripType: TripType.ONE_WAY,
		tripDate: "2023-08-22",
		passengers: 1,
		tripDepartureTime: "08:00 am",
		tripArrivalTime: "11:30 pm"
	},
	{
		from: "San Cristobal",
		to: "SDQ",
		tripType: TripType.ROUND_TRIP,
		tripDate: "2023-09-10",
		passengers: 3,
		tripDepartureTime: "08:00 am",
		tripArrivalTime: "11:30 pm"
	},
	{
		from: "Santiago",
		to: "San Cristobal",
		tripType: TripType.ONE_WAY,
		tripDate: "2023-10-05",
		passengers: 2,
		tripDepartureTime: "08:00 am",
		tripArrivalTime: "11:30 pm"
	},
	{
		from: "SDQ",
		to: "San Cristobal",
		tripType: TripType.ROUND_TRIP,
		tripDate: "2023-11-18",
		passengers: 4,
		tripDepartureTime: "08:00 am",
		tripArrivalTime: "11:30 pm"
	}
];

export const HomePageStore = proxy( {
	previousSearches: dummyPreviousTrips,
} )
