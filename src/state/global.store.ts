//@ts-ignore
import {proxy} from 'valtio'

export interface IGlobalStore {
	isLoading: boolean;
	showToast: boolean;
	toastMessage: string;
}

export const GlobalStore = proxy<IGlobalStore>( {
	isLoading: false,
	showToast: false,
	toastMessage: ''
} )
