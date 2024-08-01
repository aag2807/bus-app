//@ts-ignore
import {proxy} from 'valtio'
import {ITicket} from "../tickets/tickets.store";

export interface IPaymentState {
	ticketToPay: ITicket | null
}

export const PaymentState = proxy<IPaymentState>( {
	ticketToPay: null
} )
