import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import LoaderProyecto from '../components/LoaderProyecto';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import ModalEliminarTarea from '../components/ModalEliminarTarea';
import Tarea from '../components/Tarea';
import Colaborador from '../components/Colaborador';
import ModalEliminarColaborador from '../components/ModalEliminarColaborador';
import useAdmin from '../hooks/useAdmin';

const Proyecto = () => {
	const {
		obtenerProyectos,
		proyecto,
		cargando,
		handleModalTarea,
		submitTareasProyecto,
	} = useProyectos();

	const params = useParams();

	const admin = useAdmin();

	useEffect(() => {
		obtenerProyectos(params.id);
	}, []);

	const { nombre } = proyecto;

	if (cargando) return <LoaderProyecto />;

	return (
		<>
			<div className="flex justify-between items-center">
				<h1 className="font-black text-4xl">{nombre}</h1>
				{/* icons pincel */}
				{admin && (
					<div className="flex gap-2 items-center text-gray-600 hover:text-black transition-all">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
							/>
						</svg>
						<Link
							className="uppercase font-bold"
							to={`/proyectos/editar/${params.id}`}
						>
							Editar
						</Link>
					</div>
				)}
			</div>

			{admin && (
				<button
					onClick={handleModalTarea}
					type="button"
					className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-7 h-7"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					Nueva Tarea
				</button>
			)}

			<p className="font-bold mt-10 text-xl">Tareas del proyecto</p>

			<div className="bg-white shadow mt-10 rounded-lg">
				{proyecto.tareas?.length ? (
					proyecto.tareas?.map(tarea => (
						<Tarea
							tarea={tarea}
							key={tarea._id}
						/>
					))
				) : (
					<p className="text-center my-5 p-10 text-gray-600 font-bold">
						No hay tareas en este proyecto
					</p>
				)}
			</div>

			{admin && (
				<>
					<div className="flex items-center justify-between mt-10">
						<p className="font-bold text-xl">Colaboradores</p>

						<Link
							className="text-gray-600 uppercase font-bold hover:text-black transition-all"
							to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
						>
							Añadir
						</Link>
					</div>

					<div className="bg-white shadow mt-10 rounded-lg">
						{proyecto.colaboradores?.length ? (
							proyecto.colaboradores?.map(colaborador => (
								<Colaborador
									colaborador={colaborador}
									key={colaborador._id}
								/>
							))
						) : (
							<p className="text-center my-5 p-10 text-gray-600 font-bold">
								No hay Colaboradores en este proyecto
							</p>
						)}
					</div>
				</>
			)}

			<ModalFormularioTarea />
			<ModalEliminarTarea />
			<ModalEliminarColaborador />
		</>
	);
};

export default Proyecto;
