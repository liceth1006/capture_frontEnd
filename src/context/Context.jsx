import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import api from "../config/api";

const CaptureContext = createContext();

export function CaptureProvider({ children }) {
  const [capture, setCapture] = useState(() => {
    const saved = localStorage.getItem("saveCapture");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("saveCapture", JSON.stringify(capture));
  }, [capture]);

  const addCapture = (url) => {
    const captureResources = JSON.parse(localStorage.getItem("saveCapture")) || [];
    const existingResource = captureResources.find(saved => saved.url === url);

    if (!existingResource) {
      const newResource = { url, id: Date.now() };
      const updatedResources = [...captureResources, newResource];
      localStorage.setItem("saveCapture", JSON.stringify(updatedResources));
      setCapture(updatedResources);
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Recurso duplicado',
        text: 'Esta URL ya está guardada.',
        confirmButtonColor: '#C8FF00',
        customClass: {
          confirmButton: 'swal-confirm-button',
        }
      });
    }
  };

  const removeCapture = (url) => {
    setCapture(prev => prev.filter(capture => capture.url !== url));
    Swal.fire({
      icon: 'success',
      title: 'Eliminado',
      text: 'Captura eliminada correctamente.',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const postCapturePng = async () => {
    setLoading(true);
    try {
      const result = await Swal.fire({
        title: '¿Deseas descargar las capturas?',
        text: 'Se descargará un archivo ZIP con todas las capturas.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, descargar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        confirmButtonColor: '#C8FF00',
        cancelButtonColor: '#d33',
        customClass: {
          confirmButton: 'swal-confirm-button', 
          cancelButton : 'swal-confirm-button'
        }
      });

      if (result.isConfirmed) {
        const response = await api.post('/png', capture, {
          headers: { 'Content-Type': 'application/json' },
          responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'application/zip' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'screenshots.zip';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);

        Swal.fire({
          icon: 'success',
          title: '¡Descarga exitosa!',
          text: '📂 Las capturas se descargaron correctamente.',
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Descarga cancelada',
          text: '🚫 No se realizó ninguna descarga.',
          timer: 2000,
          showConfirmButton: false,
        });
      }

      console.log('✅ ZIP preparado correctamente');
    } catch (error) {
      console.error('❌ Error al generar el ZIP:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al generar el ZIP',
        text: 'Ocurrió un error al procesar las capturas.',
        
      });
    } finally {
      setLoading(false);
    }
  };

  const postCapturePdf = async () => {
    setLoading(true);
    try {
      const result = await Swal.fire({
        title: '¿Deseas descargar las capturas?',
        text: 'Se descargará un archivo ZIP con todas las capturas.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, descargar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        confirmButtonColor: '#C8FF00',
        cancelButtonColor: '#d33',
        customClass: {
          confirmButton: 'swal-confirm-button', 
          cancelButton : 'swal-confirm-button'
        }
      });

      if (result.isConfirmed) {
        const response = await api.post('/pdf', capture, {
          headers: { 'Content-Type': 'application/json' },
          responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'application/zip' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'screenshots.zip';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);

        Swal.fire({
          icon: 'success',
          title: '¡Descarga exitosa!',
          text: '📂 Las capturas se descargaron correctamente.',
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Descarga cancelada',
          text: '🚫 No se realizó ninguna descarga.',
          timer: 2000,
          showConfirmButton: false,
          
        });
      }

      console.log('✅ ZIP preparado correctamente');
    } catch (error) {
      console.error('❌ Error al generar el ZIP:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al generar el ZIP',
        text: 'Ocurrió un error al procesar las capturas.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CaptureContext.Provider value={{
      capture,
      addCapture,
      removeCapture,
      setCapture,
      postCapturePng,
      postCapturePdf,
      loading
    }}>
      {children}
    </CaptureContext.Provider>
  );
}

CaptureProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCapture() {
  return useContext(CaptureContext);
}
