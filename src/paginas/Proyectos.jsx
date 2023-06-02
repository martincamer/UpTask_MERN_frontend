import PreviewProyecto from '../components/PreviewProyecto';
import useProyectos from '../hooks/useProyectos';
import Alerta from '../components/Alerta';

const Proyectos = () => {
	const { proyectos, alerta } = useProyectos();

	const { msg } = alerta;
	// console.log(proyectos);
	return (
		<>
			<h1 className="text-4xl font-black">Proyectos</h1>

			{msg && <Alerta alerta={alerta} />}
			<div className="bg-white shadow-lg mt-10 rounded-lg">
				{proyectos.length ? (
					proyectos.map(proyecto => (
						<PreviewProyecto
							key={proyecto._id}
							proyecto={proyecto}
						/>
					))
				) : (
					<p className="text-center text-gray-600 uppercase font-semibold p-5">
						No hay proyectos aún
					</p>
				)}
			</div>
		</>
	);
};

export default Proyectos;
