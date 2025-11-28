import React from "react";
import { Link } from "react-router-dom";
import type { Project } from "./types";

export const ProjectCard: React.FC<{
  project: Project;
  showMapPreview?: boolean;
}> = ({ project, showMapPreview = false }) => {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="block bg-white p-4 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transform transition border border-gray-100"
    >
      <div className="flex gap-4">
        {showMapPreview ? (
          <div className="w-24 h-16 rounded-md overflow-hidden bg-gray-100 shrink-0">
            {/* Static map image using OpenStreetMap's static tile (cheap approach) */}
            <img
              src={`https://static-maps.yandex.ru/1.x/?lang=en_US&ll=${project.longitude},${project.latitude}&size=200,120&z=10&l=map&pt=${project.longitude},${project.latitude},pm2rdl`}
              alt="map preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                // fallback to plain placeholder
                (e.currentTarget as HTMLImageElement).src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='120'%3E%3Crect width='100%' height='100%' fill='%23e5e7eb'/%3E%3Ctext x='50%' y='50%' font-size='12' text-anchor='middle' fill='%239ca3af' dy='.35em'%3Emap%20preview%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        ) : null}

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate">{project.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {project.description}
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span>
              📍 {project.latitude.toFixed(3)}, {project.longitude.toFixed(3)}
            </span>
            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600">
              #{project.id}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ProjectCard;
