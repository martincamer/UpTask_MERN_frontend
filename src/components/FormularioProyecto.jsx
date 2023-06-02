import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import Alerta from '../components/Alerta';

const FormularioProyecto = () => {
	const [id, setId] = useState(null);
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [fechaEntrega, setFechaEntrega] = useState('');
	const [cliente, setCliente] = useState('');
	const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();
	const params = useParams();

	useEffect(() => {
		if (params.id) {
			setId(proyecto._id);
			setNombre(proyecto.nombre);
			setDescripcion(proyecto.descripcion);
			setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
			setCliente(proyecto.cliente);
		}
	}, [params]);

	const handleSubmit = async e => {
		e.preventDefault();

		if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
			mostrarAlerta({
				msg: 'Todos los campos son obligatorios',
				error: true,
			});

			return;
		}

		//pasar los datos hacia el provider
		await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });

		setId(null);
		setNombre('');
		setDescripcion('');
		setFechaEntrega('');
		setCliente('');
	};

	const { msg } = alerta;

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-lg"
			>
				{msg && <Alerta alerta={alerta} />}
				<div className="mb-5">
					<label
						className="text-gray-700 uppercase font-bold text-sm"
						htmlFor="nombre"
					>
						Nombre Proyecto
					</label>
					<input
						id="nombre"
						type="text"
						placeholder="Nombre del proyecto"
						className="w-full p-2 mt-2 border placeholder-gray-400 rounded-md bg-gray-100  outline-none text-gray-600 font-semibold"
						value={nombre}
						onChange={e => setNombre(e.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label
						className="text-gray-700 uppercase font-bold text-sm"
						htmlFor="descripcion"
					>
						Descripción
					</label>
					<textarea
						id="descripcion"
						placeholder="Descripcion del proyecto"
						className="w-full p-2 mt-2 border placeholder-gray-400 rounded-md bg-gray-100  outline-none text-gray-600 font-semibold"
						value={descripcion}
						onChange={e => setDescripcion(e.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label
						className="text-gray-700 uppercase font-bold text-sm"
						htmlFor="fecha-entrega"
					>
						Fecha de Entrega
					</label>
					<input
						id="fecha-entrega"
						type="date"
						className="w-full p-2 mt-2 border placeholder-gray-400 rounded-md bg-gray-100  outline-none text-gray-600 font-semibold"
						value={fechaEntrega}
						onChange={e => setFechaEntrega(e.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label
						className="text-gray-700 uppercase font-bold text-sm"
						htmlFor="cliente"
					>
						Cliente del Proyecto
					</label>
					<input
						id="cliente"
						type="text"
						placeholder="Nombre del cliente"
						className="w-full p-2 mt-2 border placeholder-gray-400 rounded-md bg-gray-100  outline-none text-gray-600 font-semibold"
						value={cliente}
						onChange={e => setCliente(e.target.value)}
					/>
				</div>

				<input
					type="submit"
					value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
					className="bg-sky-600 text-white p-3 w-full uppercase font-bold rounded cursor-pointer hover:bg-sky-700 transition-all"
				/>
			</form>
		</>
	);
};

export default FormularioProyecto;
