import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	// UseState
	const [auth, setAuth] = useState({});
	const [cargando, setCargando] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		const autenticarUsuario = () => {
			const token = localStorage.getItem('token');

			if (!token) {
				setCargando(false);
				return;
			}

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			setTimeout(async () => {
				try {
					const { data } = await clienteAxios('/usuarios/perfil', config);

					setAuth(data);
					// navigate('/proyectos');
				} catch (error) {
					setAuth({});
				} finally {
					setCargando(false);
				}
			}, 2000);
		};

		autenticarUsuario();

		// console.log('Si hay token');
	}, []);

	const cerrarSesionAuth = () => {
		setAuth({});
	};

	return (
		<AuthContext.Provider value={{ setAuth, auth, cargando, cerrarSesionAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };

export default AuthContext;
