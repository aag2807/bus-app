//@ts-ignore
import {proxy} from 'valtio'

export interface IGlobalStore {
	isLoading: boolean;
}

export const GlobalStore = proxy( {
	isLoading: false,
} )
