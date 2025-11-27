import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreateProjectMutation, useGetProjectsQuery } from "./projectApi";
import { Link } from "react-router-dom";
import { useState } from "react";

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

  const [createProject] = useCreateProjectMutation();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Create Project Form */}
      <div className="bg-white shadow-md p-6 rounded-xl mb-12">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Your Projects
        </h2>
      
        <button
          onClick={() => setOpen(!open)}
          className="mb-6 bg-green-600 text-white px-8 py-2 
                      rounded-md shadow hover:bg-green-700"
        >
          + New Project
        </button>
        

        {open && (
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-xl animate-fadeIn z-10">
            <h2 className="text-2xl font-semibold mb-4 text-center">Create New Project</h2>
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
                <Form className="grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-8 w-1/2 mx-auto">
                  <div className="sm:col-span-6">
                    <label
                      className="block text-sm font-medium text-gray-900"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <div
                        className="flex items-center rounded-md bg-white pl-3 
                      outline outline-1 -outline-offset-1 outline-gray-300 
                      focus-within:outline-2 focus-within:-outline-offset-2 
                      focus-within:outline-indigo-600"
                      >
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          className="block grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 
                                 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                          placeholder="Wheat Farm Survey..."
                        />
                      </div>
                    </div>
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="col-span-full">
                    <label
                      className="block text-sm font-medium text-gray-900"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <Field
                        as="textarea"
                        name="description"
                        rows={3}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 
                               outline outline-1 -outline-offset-1 outline-gray-300 
                               placeholder:text-gray-400 
                               focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 
                               sm:text-sm"
                        placeholder="Survey of wheat farm in northern UK"
                      />
                    </div>
                    <ErrorMessage
                      name="description"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="sm:col-soan-3">
                    <label
                      className="block text-sm font-medium text-gray-900"
                      htmlFor="latitude"
                    >
                      Latitude
                    </label>
                    <div className="mt-2">
                      <div
                        className="rounded-md bg-white px-3 py-1.5 
                      outline outline-1 -outline-offset-1 outline-gray-300 
                      focus-within:outline-2 focus-within:-outline-offset-2 
                      focus-within:outline-indigo-600"
                      >
                        <Field
                          id="latitude"
                          name="latitude"
                          type="number"
                          className="block w-full bg-white text-base text-gray-900 
                                 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                          placeholder="52.485"
                        />
                      </div>
                    </div>

                    <ErrorMessage
                      name="latitude"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="sm:col-soan-3">
                    <label
                      className="block text-sm font-medium text-gray-900"
                      htmlFor="longitude"
                    >
                      Longitude
                    </label>
                    <div className="mt-2">
                      <div
                        className="rounded-md bg-white px-3 py-1.5 
                      outline outline-1 -outline-offset-1 outline-gray-300 
                      focus-within:outline-2 focus-within:-outline-offset-2 
                      focus-within:outline-indigo-600"
                      >
                        <Field
                          id="longitude"
                          name="longitude"
                          type="number"
                          className="block w-full bg-white text-base text-gray-900 
                                 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                          placeholder="52.485"
                        />
                      </div>
                    </div>

                    <ErrorMessage
                      name="longitude"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md 
                            hover:bg-blue-700"
                    >
                      {isSubmitting ? "Creating..." : "Create Project"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
      {/* List Projects */}
      <div>

        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects?.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="block p-5 bg-white rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition border border-gray-100"
              >
                <p className="font-bold text-lg">{project.name}</p>
                <p className="text-sm text-gray-700 mt-1">
                  {project.description}
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  {project.latitude}, {project.longitude}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
