import { RiDeleteBin5Fill } from "react-icons/ri";
import { useCapture } from "../context/Context";

function Capture() {
  const { capture, removeCapture, postCapturePng, loading,postCapturePdf } = useCapture();
  const disabled = capture.length === 0 || !capture.some((item) => item.url);

  return (
    <div className=" px-4 sm:px-6 lg:px-8">
      <div className="dark:bg-transparent max-w-5xl mx-auto border shadow border-gray-100 rounded-xl p-2 sm:p-8">
        <div className="mb-3 flex flex-wrap gap-4 justify-center md:justify-end pb-2">
          <button
            disabled={disabled || loading}
            onClick={postCapturePng}
            className={`text-lg font-semibold rounded-md px-6 py-3 transition ${
              disabled
                ? "bg-yellow-500 dark:bg-yellow-200 text-gray-950 cursor-not-allowed"
                : "bg-yellow-400 text-gray-950 hover:bg-yellow-500"
            }`}
          >
            {loading ? "Generando ZIP..." : "Descargar en PNG"}
          </button>
          <button
            disabled={disabled || loading}
            onClick={postCapturePdf}
            className={`text-lg font-semibold rounded-md px-6 py-3 transition ${
              disabled
                ? "bg-green-300 dark:bg-green-200 text-gray-950 cursor-not-allowed"
                : "bg-green-300 text-gray-950 hover:bg-yellow-500"
            }`}
          >
            {loading ? "Generando ZIP..." : "Descargar en PDF"}
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl text-center font-semibold text-gray-900 dark:text-white mb-4">
          URLs a Capturar
        </h2>

        {capture.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No hay URLs. Agrega una para generar la captura.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase">
                    URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                {capture.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.url}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => removeCapture(item.url)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition flex items-center"
                      >
                        <RiDeleteBin5Fill className="mr-2" />
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {loading && (
          <div
            style={{ backgroundColor: "rgba(31, 41, 55, 0.6)" }}
            className="fixed inset-0 z-50 flex justify-center items-center"
          >
            <div
              className="bg-white flex flex-col justify-center items-center p-8 rounded-lg w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="loader mb-4"></div>

              <p className="text-gray-950 text-center font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
                Generando archivo...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Capture;
