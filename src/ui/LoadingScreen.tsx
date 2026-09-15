export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-linear-to-r from-sky-500 to-red-500 p-1 animate-spin">
          <div className="h-full w-full rounded-full bg-gray-50" />
        </div>

        <p className="mt-6 text-2xl font-bold bg-linear-to-r from-sky-500 to-red-500 bg-clip-text text-transparent">
          Loading Pro Analytics...
        </p>
      </div>
    </div>
  );
}
