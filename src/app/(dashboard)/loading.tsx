
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-400"></div>
      <p className="ml-4 text-white">Loading Page...</p>
    </div>
  );
}
