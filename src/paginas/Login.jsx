import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [alerta, setAlerta] = useState({});

	const { setAuth } = useAuth();

	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();

		if ([email, password].includes('')) {
			setAlerta({
				msg: 'Todos los campos son obligatorios',
				error: true,
			});

			return;
		}

		try {
			const { data } = await clienteAxios.post('/usuarios/login', {
				email,
				password,
			});
			setAlerta({});
			localStorage.setItem('token', data.token);
			setAuth(data);

			navigate('/proyectos');
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	// console.log(auth);
	// console.log(cargando);

	const { msg } = alerta;

	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl capitalize">
				Inicia sesión y administra tus{' '}
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
						placeholder="Email del registro"
						className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-none text-gray-700 font-semibold"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>

				<div className="my-5 ">
					<label
						htmlFor="password"
						className="uppercase text-gray-600 block text-xl font-bold"
					>
						Password
					</label>
					<input
						id="password"
						type="password"
						placeholder="Password del registro"
						className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-none text-gray-700 font-semibold"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>

				<input
					type="submit"
					value={'Inicia Sesión'}
					className="bg-sky-700 w-full py-3 text-white rounded uppercase font-bold hover:cursor-pointer hover:bg-sky-800 transition-all duration-150 mb-5"
				/>
			</form>

			<nav className="lg:flex lg:justify-between">
				<Link
					className="block text-center my-5 text-slate-500 uppercase text-sm font-semibold"
					to={'/registrar'}
				>
					¿No tienes una cuenta? Regístrate
				</Link>
				<Link
					className="block text-center my-5 text-slate-500 uppercase text-sm font-semibold"
					to={'/olvide-password'}
				>
					Olvide Mi Password
				</Link>
			</nav>
		</>
	);
};

export default Login;
