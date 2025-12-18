// src/components/ui/LoadingScreen.tsx
export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto" />
        <p className="mt-6 text-2xl font-bold text-blue-600">
          Loading Pro Analytics...
        </p>
      </div>
    </div>
  );
}
