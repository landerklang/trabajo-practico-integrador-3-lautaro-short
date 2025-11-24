export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 font-medium text-lg">Cargando...</p>
      </div>
    </div>
  );
};
