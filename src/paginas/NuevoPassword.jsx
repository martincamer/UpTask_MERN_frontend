import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

const NuevoPassword = () => {
	const [tokenValido, setTokenValido] = useState(false);
	const [alerta, setAlerta] = useState({});
	const [password, setPassword] = useState('');
	const [passwordModificado, setPasswordModificado] = useState(false);
	const params = useParams();

	const { token } = params;

	useEffect(() => {
		const comprobarToken = async () => {
			try {
				await clienteAxios.get(`/usuarios/olvide-password/${token}`);
				setTokenValido(true);
			} catch (error) {
				setAlerta({
					msg: error.response.data.msg,
					error: true,
				});
			}
		};
		comprobarToken();
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();

		if ([password].includes('')) {
			setAlerta({
				msg: 'El campo no debe estar vacio',
				error: true,
			});

			return;
		}
		if (password.length < 6) {
			setAlerta({
				msg: 'El password debe ser minimo de 6 caracteres',
				error: true,
			});

			return;
		}
		try {
			const url = `/usuarios/olvide-password/${token}`;

			const { data } = await clienteAxios.post(url, {
				password,
			});

			setAlerta({
				msg: data.msg,
				error: false,
			});

			setPasswordModificado(true);

			// console.log(data);
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}

		setPassword('');
	};

	const { msg } = alerta;

	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl capitalize">
				Restablece tus password y no pierdas acceso a tus{' '}
				<span className="text-slate-700">proyectos</span>
			</h1>

			{msg && <Alerta alerta={alerta} />}

			{tokenValido && (
				<form
					onSubmit={handleSubmit}
					className="my-10 bg-white shadow rounded-lg p-10"
				>
					<div className="my-5 ">
						<label
							htmlFor="password2"
							className="uppercase text-gray-600 block text-xl font-bold"
						>
							Nuevo password
						</label>
						<input
							id="password2"
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							placeholder="Escribe  tu nuevo password"
							className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-none text-gray-700 font-semibold"
						/>
					</div>

					<input
						type="submit"
						value={'Guardar nuevo password'}
						className="bg-sky-700 w-full py-3 text-white rounded uppercase font-bold hover:cursor-pointer hover:bg-sky-800 transition-all duration-150 mb-5"
					/>
				</form>
			)}
			{passwordModificado && (
				<>
					<Link
						className="block text-center my-5 text-slate-500 uppercase text-sm font-semibold"
						to={'/'}
					>
						Inicia Sesión
					</Link>
				</>
			)}
		</>
	);
};

export default NuevoPassword;
