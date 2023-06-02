import './Spinner.css';

const SpinnerLoader = () => {
	return (
		<div className="lds-ring flex justify-center items-center w-full h-screen ">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default SpinnerLoader;
