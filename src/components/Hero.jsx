import { useState } from "react";
import { useCapture } from "../context/Context";
import toast from "react-hot-toast";
import { BiHelpCircle } from "react-icons/bi";
import Swal from "sweetalert2";

function Hero() {
  const { addCapture, setCapture } = useCapture();
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);

  const showJson = () => {
    Swal.fire({
      title: "Ejemplo de formato JSON",
      html: `
        <pre class="text-left bg-gray-100 p-4 rounded-lg text-sm sm:text-base overflow-x-auto">
  [
    {"url": "https://ejemplo.com" },
    {"url": "https://ejemplo.com/contacto"}
  ]
        </pre>
      `,
      icon: "info",
      confirmButtonText: "Entendido",
      confirmButtonColor: "#95ff00",
      customClass: {
        popup: "max-w-[90%] sm:max-w-[500px]", 
        confirmButton: "swal-confirm-button",
      },
    });
  };

  // Validar URL
  const validateUrl = (value) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-zA-Z0-9-]{1,63}\\.)+[a-zA-Z]{2,63})|" +
        "localhost|" +
        "([0-9]{1,3}\\.){3}[0-9]{1,3})" +
        "(\\:[0-9]{1,5})?" +
        "(\\/.*)?$",
      "i"
    );
    return urlPattern.test(value);
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    setIsValidUrl(validateUrl(value));
  };

  const normalizeUrls = (data) => {
    const possibleKeys = ["url", "link", "href", "website", "urlss", "title"];

    if (Array.isArray(data)) {
      // Si es un array, normaliza cada objeto
      return data.map((item) => {
        const urlKey = Object.keys(item).find((key) =>
          possibleKeys.includes(key)
        );
        return {
          ...item,
          url: urlKey ? item[urlKey] : "",
        };
      });
    } else if (typeof data === "object" && data !== null) {
      const urlKey = Object.keys(data).find((key) =>
        possibleKeys.includes(key)
      );
      return {
        ...data,
        url: urlKey ? data[urlKey] : "",
      };
    }
    return data;
  };
  const handleJsonUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          let jsonData = JSON.parse(event.target.result);

          jsonData = normalizeUrls(jsonData);

          // Validar las URLs
          if (Array.isArray(jsonData)) {
            const invalidUrls = jsonData.filter(
              (item) => item.url && !validateUrl(item.url)
            );
            if (invalidUrls.length > 0) {
              console.error("Se encontraron URLs inválidas:", invalidUrls);
              toast.success(
                `Se encontraron URLs inválidas:\n${invalidUrls
                  .map((i) => i.url)
                  .join("\n")}`
              );

              return;
            }
          } else if (jsonData.url && !validateUrl(jsonData.url)) {
            console.error("URL inválida en el archivo JSON:", jsonData.url);
            toast.error(`URL inválida: ${jsonData.url}`);

            return;
          }

          // Guardar el JSON transformado
          setCapture(jsonData);
          toast.success("Archivo cargado y validado correctamente.");
        } catch (error) {
          console.error("Error al leer el archivo JSON:", error);
          toast.error("Error al leer el archivo JSON. Verifica su formato.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className=" px-4">
      <div className="dark:bg-transparent max-w-5xl mx-auto mb-3">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black ">
            Explora,{" "}
            <span className="text-[#00b712]  dark:text-[#C8FF00]">Captura</span>{" "}
            y Guarda Cualquier Página Web en un Clic
          </h1>
          <p className="mt-5 sm:mt-8 text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:w-3/4">
            Ingresa una URL y obtén una vista previa, captura o guarda el
            contenido que necesitas de manera sencilla y rápida.
          </p>

          <div className="mt-8 w-full max-w-2xl flex flex-col sm:flex-row items-center gap-3">
            <div className="flex w-full">
              <label className="inline-flex items-center bg-[#a3ff61] dark:bg-[#C8FF00] text-gray-950 text-lg font-semibold px-4 py-3 rounded-l-md">
                URL
              </label>
              <input
                type="text"
                name="q"
                value={url}
                onChange={handleUrlChange}
                className={`w-full p-3 border border-[#C8FF00] 
                  dark:bg-gray-800 dark:text-gray-200 rounded-none`}
                placeholder="https://example.com"
                aria-label="Ingrese la URL para capturar"
              />
              <button
                onClick={() => addCapture(url)}
                disabled={!isValidUrl || url.trim() === ""}
                className={`px-6 py-3 text-lg font-semibold rounded-r-md transition ${
                  !isValidUrl || url.trim() === ""
                    ? " bg-[#a3ff61] dark:bg-[#e5ff89] text-gray-950 cursor-not-allowed"
                    : "bg-[#a5f830]  dark:bg-[#C8FF00] text-gray-950 hover:bg-[#99ff00]"
                }`}
                aria-label="Adicionar URL"
              >
                Adicionar
              </button>
            </div>
          </div>
          {!isValidUrl && url && (
            <p className="text-red-400  mt-2">⚠️ URL inválida</p>
          )}

          <div className="mt-6 ">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300">
              Si prefieres, sube un archivo JSON:
            </h2>
            <div className="flex items-center justify-center">
              <button
                onClick={showJson}
                className="flex items-center justify-center text-[#C8FF00] hover:text-[#95ff00]"
              >
                <BiHelpCircle size={20} />
              </button>
            </div>

            <input
              type="file"
              onChange={handleJsonUpload}
              className="mt-2 p-2 bg-[#f8ffdd] dark:bg-gray-700 border border-[#C8FF00] rounded-md w-1/2 md:w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
