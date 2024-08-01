import React from 'react';
import {IonIcon, useIonRouter} from "@ionic/react";
import {arrowBack} from 'ionicons/icons';
import './TitleBar.css';

type TitleBarProps = {
	title: string;
	showBackButton?: boolean;
}

const TitleBar: React.FC<TitleBarProps> = ( props ) =>
{
	const router = useIonRouter();

	return (
		<div className={"flex flex-row items-center"}>
			{props.showBackButton && (
				<button onClick={() => router.goBack()} className={"bg-white p-1 rounded-full transition cursor-pointer"}>
					<IonIcon icon={arrowBack} color={"primary"} className={"text-[18px] p-2"}></IonIcon>
				</button>)
			}

			{props.showBackButton ?
				<h4 className={"text-white text-[24px] font-[600] ms-[20px] my-0 me-0 t"} dangerouslySetInnerHTML={{__html: props.title}}></h4> :
				<h4 className={"text-white text-[28px] font-[600] my-0 me-0 t"} dangerouslySetInnerHTML={{__html: props.title}}></h4>
			}
		</div>
	);
};

export default TitleBar;
