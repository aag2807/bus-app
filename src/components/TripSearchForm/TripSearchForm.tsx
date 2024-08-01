import React, {useState} from 'react';
import './TripSearchForm.css';
import {useForm} from "react-hook-form";
import {GlobalStore} from "../../state/global.store";
import {FaUserGroup} from "react-icons/fa6";

type TTripSearchFormProps = {}

type TTripSearchFormData = {
	from: string;
	to: string;
	tripDate: string;
	passengers: number;
}

const TripSearchForm: React.FC<TTripSearchFormProps> = ( props ) =>
{
	const {register, handleSubmit} = useForm<TTripSearchFormData>();
	const [selectedIndex, setSelectedIndex] = useState<number>( 1 );

	const onSubmit = ( data: TTripSearchFormData ) =>
	{
		GlobalStore.isLoading = true;
		console.log( data );

		setTimeout( () =>
		{
			GlobalStore.isLoading = false;
		}, 3000 )
	};

	return (
		<div>
			{/* INDICATOR FOR TRIP TYPE JUST TRIP OR GOING AND COMING BACK */}
			<div className=" flex flex-row items-center min-h-[60px] bg-[#3779c5] z-[1] w-full rounded-full relative">
				<div
					id="ida"
					className={"w-full flex items-center justify-center z-[2] " + (selectedIndex == 1 ? "text-[#08387f]" : "")}
					onClick={() => setSelectedIndex( 1 )}
				>
					Ida
				</div>
				<div
					id="ida-vuelta"
					className={"w-full flex items-center justify-center z-[2] " + (selectedIndex == 2 ? "text-[#08387f]" : "")}
					onClick={() => setSelectedIndex( 2 )}
				>
					Ida & Vuelta
				</div>
				<span className={"absolute h-full bg-white w-[50%] rounded-full z-[-1] transition-[200ms] " + (`selected-index-${selectedIndex}`)}></span>
			</div>

			<form className={"flex flex-col mt-5 gap-5"} onSubmit={handleSubmit( onSubmit )}>
				<div className="flex flex-col gap-3">
					<label htmlFor="from">Desde</label>
					<input {...register( "from" )} type="text" name={"from"} id="from" className={"bg-transparent border-b border-white pb-2 font-bold"}/>
				</div>

				<div className="flex flex-col gap-3">
					<label htmlFor="to">Hacia</label>
					<input {...register( "to" )} type="text" name={"to"} id="to" className={"bg-transparent border-b border-white pb-2 font-bold"}/>
				</div>

				<div className="flex flex-row gap-3">
					<div className="flex flex-col gap-3">
						<label htmlFor="">Fecha</label>
						<input {...register( "tripDate" )} type="date" className={"bg-transparent border-b border-white min-h-[45px] font-bold"}/>
					</div>

					<div className="flex flex-col gap-3">
						<label htmlFor="">Cantidad</label>
						<div className={"relative"}>
							<FaUserGroup className={"absolute left-[5px] top-[28%] text-[20px]"} />
							<input {...register( "passengers" )} type="number" className={"max-w-[145px] bg-transparent border-b border-white min-h-[45px] font-bold indent-8"} min={1}/>
						</div>
					</div>

				</div>

				<button className={"mt-4 mb-2 rounded-full bg-white min-h-[50px] font-bold text-black"}>Reserva ahora</button>
			</form>
		</div>
	);
};

export default TripSearchForm;
