import TitleBar from "../components/TitleBar";
import React, {useEffect} from "react";
import {IonContent, IonPage, useIonRouter} from "@ionic/react";
import {useSnapshot} from "valtio";
import {ITicketsStore, TicketStore} from "../state/tickets/tickets.store";
import {motion} from "framer-motion";
import {Controller, useForm} from "react-hook-form";
import {FaUserGroup} from "react-icons/fa6";
import {formatDate} from "./Tickets";
import {useParams} from "react-router";
import {PaymentState} from "../state/payment/payment.store";

export const TicketDetail: React.FC<any> = () =>
{
	const router = useIonRouter();
	const {index} = useParams<{index: string}>();

	const {register, handleSubmit, control, watch} = useForm( {
		defaultValues: {
			passengers: 1,
			selectedSeats: []
		}
	} );
	const passengers = watch( "passengers" );

	const routeIndex = parseInt( index );

	const store = useSnapshot<ITicketsStore>( TicketStore );
	const ticket = store.tickets[routeIndex];

	const onSubmit = ( data: any ) =>
	{
		PaymentState.ticketToPay = ticket;
		router.push( `/payment-form?passengers=${data.passengers}` );
	}

	return (
		<IonPage>
			<IonContent fullscreen class={"min-w-full flex flex-col"}>
				<div className="bg-[#08387f] flex-1 min-h-screen min-w-screen px-6 text-white pt-4 pb-4 flex-col flex">
					<TitleBar title={`${ticket.from} - ${ticket.to}`} showBackButton={true}/>

					<div className="flex-1 flex flex-col mt-5">
						<p>
							<span className={"font-bold"}>Fecha:</span> {formatDate( ticket.tripDate )} <br/>
							<span className={"font-bold"}>Hora:</span> {ticket.tripDepartureTime}
							<span className={"font-bold"}> - {ticket.tripArrivalTime}</span> <br/>
							<span className={"font-bold"}> Duración:</span> {ticket.duration}
						</p>
					</div>

					<form onSubmit={handleSubmit( onSubmit )} className={"rounded-2xl bg-[#489bfc] p-5 flex flex-col mt-5 gap-5"}>
						<div className="flex flex-col gap-3">
							<div className="flex flex-col gap-3">
								<label htmlFor="">Cantidad</label>
								<div className={"relative"}>
									<FaUserGroup className={"absolute left-[5px] top-[28%] text-[20px]"}/>
									<select
										{...register( "passengers" )}
										className="bg-transparent border-b border-white min-h-[45px] w-full font-bold indent-8 appearance-none focus:outline-none"
										defaultValue="1"
									>
										<option value="" disabled>Select passengers</option>
										{[...Array( 10 )].map( ( _, i ) => (
											<option className={"text-[18px]"} key={i + 1} value={i + 1}>
												{i + 1}
											</option>
										) )}
									</select>
									<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
										<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
											<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
										</svg>
									</div>
								</div>
							</div>
						</div>

						<Controller
							name="selectedSeats"
							control={control}
							render={( {field} ) => (
								<SeatChart
									maxSelectableSeats={Number( passengers )}
									selectedSeats={field.value}
									onChange={field.onChange}
								/>
							)}
						/>

						<motion.button
							whileTap={{scale: 0.95, opacity: 0.8}}
							transition={{type: 'spring', duration: 0.125}}
							className={"mb-2 rounded-full bg-white min-h-[50px] font-bold text-black w-full mt-5"}
							type="submit"
						>
							Comprar
						</motion.button>
					</form>

				</div>
			</IonContent>
		</IonPage>
	);
}

interface SeatChartProps {
	maxSelectableSeats: number;
	selectedSeats: number[];
	onChange: ( selectedSeats: number[] ) => void;
}

const SeatChart: React.FC<SeatChartProps> = ( {maxSelectableSeats, selectedSeats, onChange} ) =>
{
	const toggleSeat = ( seatNumber: number ) =>
	{
		let newSelectedSeats;
		if( selectedSeats.includes( seatNumber ) )
		{
			newSelectedSeats = selectedSeats.filter( seat => seat !== seatNumber );
		}
		else if( selectedSeats.length < maxSelectableSeats )
		{
			newSelectedSeats = [...selectedSeats, seatNumber];
		}
		else
		{
			return;
		}
		onChange( newSelectedSeats );
	};

	useEffect( () =>
	{
		onChange( [] );
	}, [maxSelectableSeats, onChange] );

	const renderSeat = ( seatNumber: number ) =>
	{
		const isMiddle = seatNumber % 5 === 3;
		const isSelected = selectedSeats.includes( seatNumber );
		const isSelectable = selectedSeats.length < maxSelectableSeats || isSelected;

		return (
			<motion.button
				whileHover={{opacity: 0.8, scale: 0.9}}
				whileTap={{opacity: 0.8, scale: 0.9}}
				transition={{type: 'spring', duration: 0.125}}
				key={seatNumber}
				type={"button"}
				className={`w-8 h-8 m-1 rounded-md ${
					isMiddle
						? 'bg-gray-300 cursor-not-allowed'
						: isSelected
							? 'bg-blue-500 text-white'
							: isSelectable
								? 'bg-white border border-gray-300 hover:bg-blue-100'
								: 'bg-gray-200 cursor-not-allowed'
				}`}
				onClick={() => !isMiddle && isSelectable && toggleSeat( seatNumber )}
				disabled={isMiddle || !isSelectable}
			>
				{!isMiddle && seatNumber}
			</motion.button>
		);
	};

	return (
		<div className="px-4 pb-4 rounded-lg">
			<h2 className="text-xl font-bold mb-4 mt-0">Seleccione su Asiento</h2>
			<div className="grid grid-cols-5 gap-1 text-gray-800">
				{[...Array( 50 )].map( ( _, index ) => renderSeat( index + 1 ) )}
			</div>
			<div className="mt-4 text-gray-800">
				<p><strong>Asientos Seleccionados</strong>: <br/> {selectedSeats.join( ', ' ) || "Ninguno"}</p>
				<p><strong>Faltantes por seleccionar</strong>: <br/> {maxSelectableSeats - selectedSeats.length}</p>
			</div>
		</div>
	);
}
