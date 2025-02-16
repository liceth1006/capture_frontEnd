# Frontend - React, Vite, Tailwind

👉 Visítala aquí: https://screenzip.vercel.app

## 📌 Descripción
Este proyecto frontend, desarrollado con **React**, **Vite** y **Tailwind CSS**, consume un servicio de captura de pantallas en formatos PNG y PDF, gestionando capturas localmente y permitiendo su descarga en formato ZIP.

## 🛠️ Tecnologías utilizadas
- **React**: Framework para interfaces de usuario.
- **Vite**: Herramienta rápida para proyectos React.
- **Tailwind CSS**: Framework de estilos.
- **Axios**: Cliente HTTP.
- **SweetAlert2**: Alertas personalizadas.
- **PropTypes**: Validación de props.

## ⚙️ Configuración
### Variables de entorno
Crea un archivo `.env`:
```env
VITE_API_URL="api de captura"
```
### Instalación de dependencias
```bash
npm install
```
### Ejecución en desarrollo
```bash
npm run dev
```


## 🚀 Funcionalidades principales
- ✅ **Gestión de capturas:** Guardadas en `localStorage`.
- ✅ **Descarga en ZIP:** PNG o PDF.
- ✅ **Alertas:** Con `SweetAlert2`.
- ✅ **Soporte de temas:** Personalizado según el equipo.


## Backend
https://github.com/liceth1006/capture_backend.git 

## 📝 Comandos útiles
- Iniciar proyecto: `npm run dev`
- Construir: `npm run build`

## 📞 Contacto
- Desarrollado por: **Liceth Olmos**  
- 📧 Contacto: [https://www.licetholmos.com/] 






Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
