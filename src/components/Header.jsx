import { Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import useAuth from '../hooks/useAuth';
import ModalBuscador from './ModalBuscador';

const Header = () => {
	const { handleBuscador, cerrarSesionProyectos } = useProyectos();
	const { cerrarSesionAuth } = useAuth();

	const handleCerrarSesion = () => {
		cerrarSesionAuth();
		cerrarSesionProyectos();
		localStorage.removeItem('token');
	};

	return (
		<header className="px-4 py-5 bg-white border-b">
			<div className="md:flex md:justify-between ">
				<h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
					UpTask
				</h2>

				<div className="flex flex-col md:flex-row gap-4 items-center">
					<button
						className="text-white text-sm bg-sky-600 rounded-md p-3  uppercase font-bold"
						type="button"
						onClick={handleBuscador}
					>
						Buscar Proyectos
					</button>
					<Link
						to={'/proyectos'}
						className="font-bold uppercase text-gray-600"
					>
						Proyectos
					</Link>

					<button
						className="text-white text-sm bg-sky-600 rounded-md p-3  uppercase font-bold"
						type="button"
						onClick={handleCerrarSesion}
					>
						Cerrar Sesión
					</button>

					<ModalBuscador />
				</div>
			</div>
		</header>
	);
};

export default Header;
