import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

const OlvidePassword = () => {
	const [email, setEmail] = useState('');
	const [alerta, setAlerta] = useState({});

	const handleSubmit = async e => {
		e.preventDefault();

		if (email === '' || email.length < 6) {
			setAlerta({
				msg: 'El email es obligatorio',
				error: true,
			});

			return;
		}

		try {
			const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {
				email,
			});

			setAlerta({
				msg: data.msg,
				error: false,
			});
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const { msg } = alerta;

	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl capitalize">
				Recupera tu acceso y no pierdas tus
				<span className="text-slate-700">proyectos</span>
			</h1>

			{msg && <Alerta alerta={alerta} />}

			<form
				onSubmit={handleSubmit}
				className="my-10 bg-white shadow rounded-lg p-10"
			>
				<div className="my-5 ">
					<label
						htmlFor="email"
						className="uppercase text-gray-600 block text-xl font-bold"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Tu email para el registro"
						className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-none text-gray-700 font-semibold"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>

				<input
					type="submit"
					value={'Enviar instrucciones'}
					className="bg-sky-700 w-full py-3 text-white rounded uppercase font-bold hover:cursor-pointer hover:bg-sky-800 transition-all duration-150 mb-5"
				/>
			</form>

			<nav className="lg:flex lg:justify-between">
				<Link
					className="block text-center my-5 text-slate-500 uppercase text-sm font-semibold"
					to={'/'}
				>
					¿Ya tienes una cuenta? Inicia Sesión
				</Link>
				<Link
					className="block text-center my-5 text-slate-500 uppercase text-sm font-semibold"
					to={'/registrar'}
				>
					¿No tienes una cuenta? Regístrate
				</Link>
			</nav>
		</>
	);
};

export default OlvidePassword;
