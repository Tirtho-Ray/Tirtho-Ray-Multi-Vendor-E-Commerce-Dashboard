export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400"></div>
        <p className="mt-4 text-white text-lg">Loading Page...</p>
      </div>
    </div>
  );
}
