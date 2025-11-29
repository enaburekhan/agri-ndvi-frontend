import { useGetReportsQuery, useCreateReportMutation } from "./reportsApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const ReportSchema = Yup.object().shape({
  project_id: Yup.number().required("Project is required"),
  title: Yup.string().required("Title is required"),
  summary: Yup.string().required("Summary is required"),
});

export default function ReportsList() {
  const { data: reports, isLoading } = useGetReportsQuery();
  const [createReport] = useCreateReportMutation();

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-gray-500">Loading reports...</p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      {/* Create Report Form */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="font-semibold mb-3">Create Report</h2>

        <Formik
          initialValues={{
            project_id: "",
            title: "",
            summary: "",
          }}
          validationSchema={ReportSchema}
          onSubmit={async (values, { resetForm }) => {
            await createReport({
              project_id: Number(values.project_id),
              title: values.title,
              summary: values.summary,
            });
            resetForm();
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label
                  className="block text-sm font-semibold"
                  htmlFor="project_id"
                >
                  Project ID
                </label>
                <Field
                  name="project_id"
                  type="number"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="project_id"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold" htmlFor="title">
                  Title
                </label>
                <Field
                  name="title"
                  type="string"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="title"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold"
                  htmlFor="summary"
                >
                  Summary
                </label>
                <Field
                  name="summary"
                  type="string"
                  className="w-full border p-2 rounded"
                />
                <ErrorMessage
                  name="summary"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 "
              >
                Create Report
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {/* Reports List */}
      <div>
        {reports?.map((report) => (
          <Link
            to={`/reports/${report.id}`}
            key={report.id}
            className="block bg-white p-4 rounded-lg shadow hover:bg-gray-50"
          >
            <h3 className="font-semibold">{report.title}</h3>
            <p className="text-sm text-gray-600">
              {report.summary.slice(0, 80)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
