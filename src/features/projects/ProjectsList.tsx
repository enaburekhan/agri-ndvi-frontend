import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreateProjectMutation, useGetProjectsQuery } from "./projectApi";

const ProjectSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  latitude: Yup.number()
    .required("Latitude is required")
    .min(-90, "Min -90")
    .max(90, "Max 90"),
  longitude: Yup.number()
    .required("Longitude is required")
    .min(-180, "Min -180")
    .max(180, "Max 180"),
});

export default function ProjectsList() {
  const { data: projects, isLoading } = useGetProjectsQuery();
  console.log("data", projects);

  const [createProject] = useCreateProjectMutation();

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Projects</h1>
      <div className="bg-white shadow p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-3">Create New Project</h2>

        <Formik
          initialValues={{
            name: "",
            description: "",
            latitude: 0,
            longitude: 0,
          }}
          validationSchema={ProjectSchema}
          onSubmit={async (values, { resetForm }) => {
            await createProject({
              name: values.name,
              description: values.description,
              latitude: values.latitude,
              longitude: values.longitude,
            });
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 gap-4">
              <div>
                <label className="font-medium" htmlFor="name">
                  Name
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className="mt-1 w-full border rounded-lg p-2 focus:ring-green"
                  placeholder="Project Name"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="font-medium" htmlFor="description">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows={3}
                  className="mt-1 w-full border rounded-lg p-2 focus:ring-green"
                  placeholder="Suirvey of wheat farm in northern UK"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="font-medium" htmlFor="latitude">
                  Latitude
                </label>
                <Field
                  id="latitude"
                  name="latitude"
                  type="number"
                  className="mt-1 w-full border rounded-lg p-2 focus:ring-green"
                  placeholder="52.485"
                />
                <ErrorMessage
                  name="latitude"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="font-medium" htmlFor="longitude">
                  Longitude
                </label>
                <Field
                  id="longitude"
                  name="longitude"
                  type="number"
                  className="mt-1 w-full border rounded-lg p-2 focus:ring-green"
                  placeholder="-1.890"
                />
                <ErrorMessage
                  name="longitude"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {isSubmitting ? "Creating..." : "Create Project"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {/* List Projects */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Your Projects</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3">
            {projects?.map((project) => (
              <a
                key={project.id}
                href={`/projects/${project.id}`}
                className="block bg-gray-100 p-4 rounded shadow hover:bg-gray-200"
              >
                <p className="font-semibold">{project.name}</p>
                <p className="text-sm text-gray-700">{project.description}</p>
                <p className="text-xs text-gray-500">
                  {project.latitude}, {project.longitude}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
