import { formatearFecha } from '../helpers/formatearFecha';
import useProyectos from '../hooks/useProyectos';
import useAdmin from '../hooks/useAdmin';

const Tarea = ({ tarea }) => {
	const { nombre, descripcion, prioridad, fechaEntrega, _id, estado } = tarea;
	const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
		useProyectos();

	const admin = useAdmin();

	return (
		<div className="border-b p-5 flex justify-between items-center">
			<div className="flex flex-col items-start">
				<p className=" mb-1 text-lg font-semibold">{nombre}</p>
				<p className=" mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
				<p className=" mb-1 text-sm font-semibold capitalize">
					{formatearFecha(fechaEntrega)}
				</p>
				<p className=" mb-1 text-gray-600">Prioridad: {prioridad}</p>
				{estado && (
					<p className="text-xs bg-green-600 text-white p-1 px-2 rounded-lg capitalize text-center">
						Completada por :{' '}
						<span className="font-bold capitalize">
							{tarea.completado.nombre}
						</span>
					</p>
				)}
			</div>
			<div className="flex gap-2 flex-col md:flex-row">
				{admin && (
					<button
						onClick={() => handleModalEditarTarea(tarea)}
						className="bg-sky-300 px-4 py-4 text-white uppercase font-bold text-sm rounded-lg transition-all"
					>
						Editar
					</button>
				)}

				<button
					onClick={() => completarTarea(_id)}
					className={`${
						estado ? 'bg-sky-600 ' : 'bg-gray-600'
					} px-4 py-4 text-white uppercase font-bold text-sm rounded-lg transition-all`}
				>
					{estado ? 'Completa' : 'Incompleta'}
				</button>

				{admin && (
					<button
						onClick={() => handleModalEliminarTarea(tarea)}
						className="bg-red-600 px-4 py-4 text-white uppercase font-bold text-sm rounded-lg transition-all"
					>
						Eliminar
					</button>
				)}
			</div>
		</div>
	);
};

export default Tarea;
