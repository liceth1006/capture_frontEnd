import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../config/api";
const CaptureContext = createContext();

export function CaptureProvider({ children }) {
  const [capture, setCapture] = useState(() => {
    const saved = localStorage.getItem("saveCapture");
    return saved ? JSON.parse(saved) : [];
  });

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
      console.warn("Esta URL ya está guardada.");
    }
  };

  const removeCapture = (url) => {
    setCapture(prev => prev.filter(capture => capture.url !== url));
  };

  const postCapturePng = async () => {
    console.log("capture", capture);
    try {
      const response = await api.post('/png', capture, {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'blob', // Asegura recibir binarios
      });
  
      // Crear un blob para descargar el ZIP
      const blob = new Blob([response.data], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'screenshots.zip';
      document.body.appendChild(a);
      a.click();
  
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
  
      console.log('✅ ZIP descargado correctamente');
    } catch (error) {
      console.error('❌ Error al descargar el ZIP:', error);
    }
  };
  
  
  
  
  

  return (
    <CaptureContext.Provider value={{ capture, addCapture, removeCapture,setCapture,postCapturePng }}>
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