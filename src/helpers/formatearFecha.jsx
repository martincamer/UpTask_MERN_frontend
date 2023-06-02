export const formatearFecha = fecha => {
	const nuevaFecha = new Date(fecha.split('T')[0].split('-'));

	const opciones = {
		weekday: 'long',
		numeric: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	return nuevaFecha.toLocaleDateString('es-Es', opciones);
};
