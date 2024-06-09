import React from 'react';
import Lottie from "lottie-react";
import BusAnimation from "../../public/animations/bus-animation.json";

const LoadingOverlay: React.FC = () =>
{
	return (
		<div className={"min-h-screen min-w-screen z-[2] flex items-center justify-center"} style={{background: "rgba(255,255,255,0.4)"}}>
			<Lottie animationData={BusAnimation} autoplay={true}  />
		</div>
	);
};

export default LoadingOverlay;
