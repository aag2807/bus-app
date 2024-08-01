import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {motion} from 'framer-motion';
import {FaCalendarAlt, FaCreditCard, FaLock, FaUser} from 'react-icons/fa';
import TitleBar from "../components/TitleBar";
import {IonContent, IonPage, useIonRouter} from '@ionic/react';
import {useSnapshot} from "valtio";
import {PaymentState} from "../state/payment/payment.store";
import {GlobalStore} from "../state/global.store";
import {useMask} from '@react-input/mask';
import { toast } from 'react-toastify';
import {useParams} from "react-router";

const PaymentForm: React.FC<any> = () =>
{
	const [passengers, setPassengers] = useState<number>(1);

	const {register, handleSubmit, formState: {errors}, control} = useForm();
	const state = useSnapshot( PaymentState );
	const router = useIonRouter();
	const params = useParams()

	const cardNumberRef = useMask( {mask: '____-____-____-____', replacement: {_: /\d/}} );
	const expirationDateRef = useMask( {mask: '__/__', replacement: {_: /\d/}} );

	useEffect(() => {
		const queryParams = new URLSearchParams(router.routeInfo.search);
		const passengersParam = queryParams.get('passengers');
		if (passengersParam) {
			setPassengers(parseInt(passengersParam, 10));
		}
	}, [router.routeInfo.search]);

	const onSubmit = ( data: any ) =>
	{
		GlobalStore.isLoading = true;
		setTimeout( () =>
		{
			GlobalStore.isLoading = false;
			router.push( '/tab1' );
			toast( 'Pago exitoso!', {type:"success", autoClose: 5000} );
		}, 1400 );
	}

	return (
		<IonPage>
			<IonContent fullscreen class={"min-w-full flex flex-col"}>
				<div className="bg-[#08387f] min-h-screen text-white p-6">
					<TitleBar title={'Pagar'} showBackButton={true}/>
					<h1 className="text-2xl font-bold mb-6">Detalles de Pago.</h1>
					<form onSubmit={handleSubmit( onSubmit )} className="space-y-4">
						<div className="rounded-2xl bg-[#489bfc] p-5 space-y-4">
							<div>
								<label htmlFor="cardNumber" className="block mb-1 min-h-[38px]">Numero de Tarjeta</label>
								<div className="relative">
									<FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"/>
									<Controller
										name="cardNumber"
										control={control}
										rules={{
											required: 'Es un campo requerido',
											pattern: {
												value: /^(\d{4}-){3}\d{4}$/,
												message: 'Numero de tarjeta invalido.'
											}
										}}
										render={( {field} ) => (
											<input
												{...field}
												ref={cardNumberRef}
												type="text"
												className="w-full bg-transparent border-b border-white py-2 pl-10 pr-3 text-white placeholder-gray-300 focus:outline-none"
												placeholder="1234-5678-9012-3456"
											/>
										)}
									/>
								</div>
								{errors.cardNumber &&
                                    <p className="text-red-300 text-sm mt-1">{errors.cardNumber.message as string}</p>}
							</div>

							<div className="flex space-x-4">
								<div className="flex-1">
									<label htmlFor="expirationDate" className="block mb-1 min-h-[38px]">Fecha de Expiracion</label>
									<div className="relative">
										<FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"/>
										<Controller
											name="expirationDate"
											control={control}
											rules={{
												required: 'Es un campo requerido',
												pattern: {
													value: /^(0[1-9]|1[0-2])\/\d{2}$/,
													message: 'Formato invalido (MM/YY)'
												}
											}}
											render={( {field} ) => (
												<input
													{...field}
													ref={expirationDateRef}
													type="text"
													className="w-full bg-transparent border-b border-white py-2 pl-10 pr-3 text-white placeholder-gray-300 focus:outline-none"
													placeholder="MM/YY"
												/>
											)}
										/>
									</div>
									{errors.expirationDate &&
                                        <p className="text-red-300 text-sm mt-1">{errors.expirationDate.message as string}</p>}
								</div>
								<div className="flex-1">
									<label htmlFor="cvv" className="block mb-1 min-h-[38px]">CVV</label>
									<div className="relative">
										<FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"/>
										<input
											{...register( 'cvv', {
												required: 'Es un campo requerido',
												pattern: {value: /^\d{3,4}$/, message: 'CVV Invalido'}
											} )}
											type="text"
											className="w-full bg-transparent border-b border-white py-2 pl-10 pr-3 text-white placeholder-gray-300 focus:outline-none"
											placeholder="123"
										/>
									</div>
									{errors.cvv &&
                                        <p className="text-red-300 text-sm mt-1">{errors.cvv.message as string}</p>}
								</div>
							</div>

							<div>
								<label htmlFor="cardholderName" className="block mb-1 min-h-[38px]">Nombre</label>
								<div className="relative">
									<FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"/>
									<input
										{...register( 'cardholderName', {required: 'Es un campo requerido'} )}
										type="text"
										className="w-full bg-transparent border-b border-white py-2 pl-10 pr-3 text-white placeholder-gray-300 focus:outline-none"
										placeholder="John Doe"
									/>
								</div>
								{errors.cardholderName &&
                                    <p className="text-red-300 text-sm mt-1">{errors.cardholderName.message as string}</p>}
							</div>
						</div>

						<div className="text-right mb-4">
							<p className="text-xl font-bold">Total: {state.ticketToPay?.price * passengers} DOP</p>
						</div>

						<motion.button
							whileTap={{scale: 0.95}}
							className="w-full bg-white text-[#08387f] py-3 rounded-full font-bold text-lg"
							type="submit"
						>
							Pagar
						</motion.button>
					</form>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default PaymentForm;
