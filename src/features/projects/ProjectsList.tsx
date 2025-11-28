// src/features/projects/ProjectsList.tsx
import { useMemo, useState, useEffect } from "react";
import { useGetProjectsQuery, useCreateProjectMutation } from "./projectApi";

import ProjectCard from "./ProjectCard";
import SearchBar from "./SearchBar";
import ProjectModal from "./ProjectModal";
import FloatingActionButton from "../../components/FloatingActionButton";

import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import type { Project } from "./types";

export default function ProjectsList() {
  const { data: projects = [], isLoading } = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [openModal, setOpenModal] = useState(false);

  // Infinite scroll
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const { ref, isNearBottom, setIsNearBottom } = useInfiniteScroll();

  // Filter logic (fixed)
  const filtered = useMemo(() => {
    return projects.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [projects, search]);

  // Infinite scroll trigger
  useEffect(() => {
    if (isNearBottom) {
      setPage((prev) => prev + 1);
      setIsNearBottom(false);
    }
  }, [isNearBottom, setIsNearBottom]);

  const visible = filtered.slice(0, page * pageSize);

  return (
    <div className="flex flex-col p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Projects</h1>
        <div className="hidden md:flex gap-3">
          <button
            onClick={() => setOpenModal(true)}
            className="px-3 py-2 bg-blue-600 text-white rounded-md"
          >
            + New Project
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
        />
      </div>

      {/* Modal — move it here so it sits after search bar in DOM */}
      <ProjectModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={async (payload) => {
          await createProject(payload as any);
        }}
      />

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {visible.map((project: Project) => (
            <ProjectCard key={project.id} project={project} showMapPreview />
          ))}
        </div>
      )}

      {/* sentinel for infinite scroll */}
      <div ref={ref as any} className="h-6" />

      {/* Floating button for mobile */}
      <FloatingActionButton onClick={() => setOpenModal(true)} />
    </div>
  );
}
