import CircularProgress from "@/components/shared/circularProgress";

export default function Loading() {
  return (
    <div
      id="full_app_loader"
      className="h-full flex flex-col items-center justify-center"
    >
      <div id="circular_progress_container">
        <CircularProgress color="primary" size="xlarge" />
      </div>
      <div id="loader_message">
        <h2 className="font-semibold text-lg">Loading. Please wait...</h2>
      </div>
    </div>
  );
}
