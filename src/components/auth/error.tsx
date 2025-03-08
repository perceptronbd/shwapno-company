"use client";

export default function LoginError({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center space-y-4 rounded-lg border border-red-300 bg-red-50 p-4">
      <h2 className="text-lg font-semibold text-red-600">
        Something went wrong!
      </h2>

      {error?.message && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}

      <button
        onClick={reset}
        className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}
