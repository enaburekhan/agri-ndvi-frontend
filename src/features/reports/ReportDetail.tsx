import { useParams } from "react-router-dom";
import { useGetReportByIdQuery } from "./reportsApi";

export default function ReportDetail() {
  const { id } = useParams();
  const { data: report, isLoading } = useGetReportByIdQuery(Number(id));

  if (isLoading) {
    return <p className="text-center mt-10 text-gray-500">Loading report...</p>;
  }

  if (!report) {
    return <p className="text-center mt-10 text-red-500">Report not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-2">{report.title}</h1>
      <p className="text-gray-500 mb-6">Project ID: {report.project_id}</p>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Summary</h2>
        <p>{report.summary}</p>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Insights</h2>
        <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
          {JSON.stringify(report.insights, null, 2)}
        </pre>
      </div>
    </div>
  );
}
