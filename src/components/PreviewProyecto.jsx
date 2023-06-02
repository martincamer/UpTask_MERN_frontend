import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
const PreviewProyecto = ({ proyecto }) => {
	const { auth } = useAuth();
	const { nombre, _id, cliente, creador } = proyecto;
	return (
		<div className="border-b p-5 flex flex-col md:flex-row justify-between gap-4 md:gap-0">
			<div className="flex items-center gap-y-[20px] md:gap-2">
				<p className="font-bold max-md:flex max-md:flex-col max-md:gap-5">
					{nombre}{' '}
					<span className="text-sm text-gray-500 capitalize font-bold">
						{'|'} Cliente: {cliente}
					</span>
				</p>
				{auth._id !== creador && (
					<div className="flex items-center gap-4">
						{'|'}
						<p className="text-sm text-white bg-green-500 font-bold capitalize p-1 rounded-lg">
							Colaborador
						</p>
					</div>
				)}
			</div>

			<Link
				className="font-bold uppercase text-gray-600"
				to={`${_id}`}
			>
				Ver Proyecto
			</Link>
		</div>
	);
};

export default PreviewProyecto;
