import './Spinner.css';

const Spinner = () => {
	return (
		<div className="lds-ring flex justify-center items-center w-full h-screen bg-gray-200">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default Spinner;
