
import { useState } from "react";
import {useCapture} from "../context/Context"

function Hero() {
   const { addCapture,setCapture,postCapturePng,} = useCapture();
   const [url, setUrl] = useState("");
   const handleJsonUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target.result);
          setCapture(jsonData);
        } catch (error) {
          console.error("Error al leer el archivo JSON", error);
        }
      };
      reader.readAsText(file);
    }
  };
    return (
      <div className="dark:bg-gray-800 px-4">
        <div className="dark:bg-transparent max-w-5xl mx-auto py-8 sm:py-24">
          {/* Contenedor principal */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-800 dark:text-white">
              Explora, <span className="text-violet-800 dark:text-violet-500">Captura</span> y Guarda Cualquier Página Web en un Clic
            </h1>
            <p className="mt-5 sm:mt-8 text-gray-600 dark:text-gray-300 text-lg sm:text-xl lg:w-3/4">
              Ingresa una URL y obtén una vista previa, captura o guarda el contenido que necesitas de manera sencilla y rápida.
            </p>
  
            {/* Input y botones */}
            <div className="mt-8 w-full max-w-2xl flex flex-col sm:flex-row items-center gap-3">
              <div className="flex w-full">
                <label className="inline-flex items-center bg-violet-700 text-white text-lg font-semibold px-4 py-3 rounded-l-md">
                  URL
                </label>
                <input
                  type="text"
                  name="q"
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:bg-gray-700 dark:text-gray-200 rounded-none"
                  placeholder="https://example.com"
                  aria-label="Ingrese la URL para capturar"
                />
                <button
                 onClick={() => addCapture(url)}
                  className="bg-violet-700 text-white text-lg font-semibold px-6 py-3 rounded-r-md hover:bg-violet-800 transition"
                  aria-label="Adicionar URL"
                >
                  Adicionar
                </button>
              </div>
            </div>
  
            {/* Subir archivo JSON */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Si prefieres, sube un archivo JSON:
              </h2>
              <input type="file" onChange={handleJsonUpload} className="mt-2 p-2 border border-gray-300 rounded-md" />
            </div>
  
          
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <button 
              onClick={()=>postCapturePng()}
              className="bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-900 transition">
              Capturar en JPG
              </button>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                Capturar en JPG
              </button>
              <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition">
                Capturar en PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Hero;
  