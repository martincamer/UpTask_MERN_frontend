import { useState } from 'react';
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';

const FormularioColaborador = () => {
	const [email, setEmail] = useState('');
	const { mostrarAlerta, alerta, submitColaborador } = useProyectos();

	const handleSubmit = async e => {
		e.preventDefault();

		if (email === '') {
			mostrarAlerta({
				msg: 'El email es obligatorio',
				error: true,
			});

			return;
		}
		submitColaborador(email);

		setEmail('');
		mostrarAlerta({});
	};

	const { msg } = alerta;

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-10 px-5 md:w-1/2 w-full rounded-lg shadow"
		>
			{msg && <Alerta alerta={alerta} />}

			<div className="mb-5">
				<label
					htmlFor="email"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Email Colaborador
				</label>
				<input
					className="border-none shadow-md outline-none w-full p-2 mt-2 bg-gray-100 text-gray-600 font-bold placeholder-gray-400 rounded-md"
					type="email"
					id="email"
					placeholder="Email del usuario"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
			</div>

			<input
				type="submit"
				className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white font-bold uppercase cursor-pointer transition-all rounded text-sm"
				value={'Buscar Colaborador'}
			/>
		</form>
	);
};

export default FormularioColaborador;
