import { useCapture } from "../context/Context";

function Capture() {
  const { capture, removeCapture } = useCapture();

  return (
    <div className="dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="dark:bg-transparent max-w-5xl mx-auto border shadow border-gray-100 rounded-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl text-center font-semibold text-gray-900 dark:text-white mb-4">
          URLs a Capturar
        </h2>

        {capture.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No hay URLs. Ingresa al menos una URL para generar las capturas.
          </p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider w-2/3"
                >
                  URL
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider w-1/3"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
              {capture.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100 truncate">
                      {item.url}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <button
                      onClick={() => removeCapture(item.url)}
                      className="ml-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-500"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Capture;
