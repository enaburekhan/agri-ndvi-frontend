import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Project } from "./types";

const ProjectSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  latitude: Yup.number().required("Required").min(-90).max(90),
  longitude: Yup.number().required("Required").min(-180).max(180),
});

export const ProjectModal: React.FC<{
  open: boolean;
  onClose: () => void;
  initial?: Partial<Project>;
  onSubmit: (payload: Partial<Project>) => Promise<void> | void;
  title?: string;
}> = ({ open, onClose, initial = {}, onSubmit, title = "Project" }) => {
  if (!open) return null;

  return (
    <div className="inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-cente">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>

        <Formik
          initialValues={{
            name: initial.name ?? "",
            description: initial.description ?? "",
            latitude: initial.latitude ?? 0,
            longitude: initial.longitude ?? 0,
          }}
          validationSchema={ProjectSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await onSubmit(values);
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Field
                  name="name"
                  className="mt-1 block w-full rounded-md border px-3 py-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="mt-1 block w-full rounded-md border px-3 py-2"
                  rows={3}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Latitude
                </label>
                <Field
                  name="latitude"
                  type="number"
                  className="mt-1 block w-full rounded-md border px-3 py-2"
                />
                <ErrorMessage
                  name="latitude"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Longitude
                </label>
                <Field
                  name="longitude"
                  type="number"
                  className="mt-1 block w-full rounded-md border px-3 py-2"
                />
                <ErrorMessage
                  name="longitude"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default ProjectModal;
