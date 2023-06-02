import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
	const [proyectos, setProyectos] = useState([]);
	const [alerta, setAlerta] = useState({});
	const [proyecto, setProyecto] = useState({});
	const [cargando, setCargando] = useState(false);
	const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
	const [tarea, setTarea] = useState({});
	const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
	const [colaborador, setColaborador] = useState({});
	const [modalEliminarColaborador, setModalEliminarColaborador] =
		useState(false);
	const [buscador, setBuscador] = useState(false);

	const navigate = useNavigate();
	const { auth } = useAuth();
	useEffect(() => {
		const obtenerProyectos = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) return;

				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				};

				const { data } = await clienteAxios.get('/proyectos', config);

				setProyectos(data);
			} catch (error) {
				console.log(error);
			}
		};
		obtenerProyectos();
	}, [auth]);

	const mostrarAlerta = alerta => {
		setAlerta(alerta);

		setTimeout(() => {
			setAlerta({});
		}, 5000);
	};

	//funcion de crear proyecto y editar
	const submitProyecto = async proyecto => {
		if (proyecto.id) {
			await editarProyecto(proyecto);
		} else {
			await nuevoProyecto(proyecto);
		}
	};

	//funcion de editar proyecto
	const editarProyecto = async proyecto => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.put(
				`/proyectos/${proyecto.id}`,
				proyecto,
				config
			);

			// console.log(data);

			//sincronizar el state
			const proyectosActualizados = proyectos.map(proyectoState =>
				proyectoState._id === data._id ? data : proyectoState
			);

			setProyectos(proyectosActualizados);
			//Mostrar la alerta
			setAlerta({
				msg: 'Proyecto Actualizado correctamente',
				error: false,
			});
			//redireccionar
			setTimeout(() => {
				setAlerta({});
				navigate('/proyectos');
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	};

	//funcion de nuevo proyecto
	const nuevoProyecto = async proyecto => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post('/proyectos', proyecto, config);

			// console.log(data);

			setProyectos([...proyectos, data]);

			setAlerta({
				msg: 'Proyecto creado correctamente',
				error: false,
			});

			setTimeout(() => {
				setAlerta({});
				navigate('/proyectos');
			}, 3000);
		} catch (error) {
			console.log(error);
		}
	};

	const obtenerProyectos = id => {
		setCargando(true);
		setTimeout(async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) return;

				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				};

				const { data } = await clienteAxios.get(`/proyectos/${id}`, config);

				setProyecto(data);
				setAlerta({});
			} catch (error) {
				navigate('/proyectos');
				setAlerta({
					msg: error.response.data.msg,
					error: true,
				});

				setTimeout(() => {
					setAlerta({});
				}, 3000);
			} finally {
				setCargando(false);
			}
		}, 3000);
	};

	//Eliminar un proyecto
	const eliminarProyecto = async id => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);

			//sincronizar el state

			const proyectosActualizados = proyectos.filter(
				proyectoState => proyectoState._id !== id
			);

			setProyectos(proyectosActualizados);

			setAlerta({
				msg: data.msg,
				error: false,
			});

			//redireccionar
			setTimeout(() => {
				setAlerta({});
				navigate('/proyectos');
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalTarea = () => {
		setModalFormularioTarea(!modalFormularioTarea);
		setTarea({});
	};

	const submitTarea = async tarea => {
		if (tarea?.id) {
			await editarTarea(tarea);
		} else {
			await crearTarea(tarea);
		}
	};

	const editarTarea = async tarea => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.put(
				`/tareas/${tarea.id}`,
				tarea,
				config
			);

			const proyectosActualizado = { ...proyecto };
			proyectosActualizado.tareas = proyectosActualizado.tareas.map(
				tareaState => (tareaState._id === data._id ? data : tareaState)
			);

			setProyecto(proyectosActualizado);
			setAlerta({});
			setModalFormularioTarea(false);
		} catch (error) {
			console.log(error);
		}
	};

	const crearTarea = async tarea => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post(`/tareas`, tarea, config);

			// console.log(data);
			//Agrega tarea al state
			const proyectosActualizado = { ...proyecto };
			proyectosActualizado.tareas = [...proyecto.tareas, data];

			setProyecto(proyectosActualizado);
			setAlerta({});
			setModalFormularioTarea(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalEditarTarea = tarea => {
		setTarea(tarea);
		setModalFormularioTarea(true);
	};

	const handleModalEliminarTarea = tarea => {
		setTarea(tarea);
		setModalEliminarTarea(!modalEliminarTarea);
	};

	const eliminarTarea = async id => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.delete(
				`/tareas/${tarea._id}`,
				config
			);
			setAlerta({
				msg: data.msg,
				error: false,
			});

			const proyectosActualizado = { ...proyecto };

			proyectosActualizado.tareas = proyectosActualizado.tareas.filter(
				tareaState => tareaState._id !== tarea._id
			);

			setProyecto(proyectosActualizado);

			setModalEliminarTarea(false);
			setTarea({});
			setTimeout(() => {
				setAlerta({});
			}, 3000);
		} catch (error) {
			console.log(error);
		}
	};

	const submitColaborador = async email => {
		setCargando(true);
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post(
				'/proyectos/colaboradores',
				{ email },
				config
			);

			setColaborador(data);
			setAlerta({});
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		} finally {
			setCargando(false);
		}
	};

	const agregarColaborador = async email => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post(
				`/proyectos/colaboradores/${proyecto._id}`,
				email,
				config
			);

			setAlerta({
				msg: data.msg,
				error: false,
			});

			setColaborador({});
			setAlerta({});
			navigate(`/proyectos/${proyecto._id}`);
			setTimeout(() => {
				setAlerta({});
			}, 3000);
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};

	const handleModalEliminarColaborador = colaborador => {
		setModalEliminarColaborador(!modalEliminarColaborador);

		setColaborador(colaborador);
	};

	const eliminarColaborador = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post(
				`/proyectos/eliminar-colaborador/${proyecto._id}`,
				{ id: colaborador._id },
				config
			);
			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.colaboradores =
				proyectoActualizado.colaboradores.filter(
					colaboradorState => colaborador._id !== colaboradorState._id
				);

			setProyecto(proyectoActualizado);

			setAlerta({
				msg: data.msg,
				error: false,
			});
			setColaborador({});
			setModalEliminarColaborador(false);

			setTimeout(() => {
				setAlerta({});
			}, 3000);
		} catch (error) {
			console.log(error.response);
		}
	};

	const completarTarea = async id => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clienteAxios.post(
				`/tareas/estado/${id}`,
				{},
				config
			);

			// console.log(data);
			const proyectoActualizado = { ...proyecto };
			proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState =>
				tareaState._id === data._id ? data : tareaState
			);

			setProyecto(proyectoActualizado);
			setTarea({});
			setAlerta({});
		} catch (error) {
			console.log(error);
		}
	};

	const handleBuscador = () => {
		setBuscador(!buscador);
	};

	const cerrarSesionProyectos = () => {
		setProyectos([]);
		setProyecto({});
		setAlerta({});
	};

	return (
		<ProyectosContext.Provider
			value={{
				proyectos,
				mostrarAlerta,
				alerta,
				submitProyecto,
				obtenerProyectos,
				proyecto,
				cargando,
				eliminarProyecto,
				handleModalTarea,
				modalFormularioTarea,
				submitTarea,
				handleModalEditarTarea,
				tarea,
				handleModalEliminarTarea,
				modalEliminarTarea,
				eliminarTarea,
				submitColaborador,
				colaborador,
				agregarColaborador,
				handleModalEliminarColaborador,
				modalEliminarColaborador,
				eliminarColaborador,
				completarTarea,
				handleBuscador,
				buscador,
				cerrarSesionProyectos,
			}}
		>
			{children}
		</ProyectosContext.Provider>
	);
};

export { ProyectosProvider };

export default ProyectosContext;
