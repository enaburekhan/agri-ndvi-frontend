import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ProjectModal from "./ProjectModal";
import ConfirmModal from "../../components/ConfirmModal";
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "./projectApi";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading } = useGetProjectQuery(id);
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (isLoading) return <p className="p-4 text-center">Loading...</p>;
  if (!project)
    return <p className="p-4 text-center text-red-600">Not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/projects" className="text-blue-600 hover:underline text-sm">
        &larr; Back to Projects
      </Link>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-gray-600">{project.description}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setEditOpen(true)}
            className="px-3 py-2 bg-indigo-600 text-white rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => setConfirmOpen(true)}
            className="px-3 py-2 bg-red-600 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden h-[360px] mb-6">
        <MapContainer
          center={[project.latitude, project.longitude]}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[project.latitude, project.longitude]}>
            <Popup>{project.name}</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-gray-700">
          Coordinates: {project.latitude}, {project.longitude}
        </p>
      </div>

      <ProjectModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initial={project}
        title="Edit Project"
        onSubmit={async (payload) => {
          await updateProject({ id: project.id, ...payload } as any);
        }}
      />

      <ConfirmModal
        open={confirmOpen}
        title="Delete project?"
        message="This action cannot be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={async () => {
          await deleteProject(project.id as any);
          navigate("/projects");
        }}
      />
    </div>
  );
}
