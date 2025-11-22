import { api } from "../../app/api";

export interface Project {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectDto {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

function normalizeProject(raw: any): Project {
  if (!raw) {
    throw new Error("No project data found");
  }
  // If backend returns a wrapper object
  const feature = raw.project ?? raw;

  // Detect GeoJSON Feature format
  const isGeoJson =
    feature?.type === "Feature" || (feature.geometry && feature.properties);

  if (isGeoJson) {
    return {
      id: feature.properties.id,
      name: feature.properties.name,
      description: feature.properties.description,
      latitude: Number(feature.geometry.coordinates[1]),
      longitude: Number(feature.geometry.coordinates[0]),
      createdAt: feature.properties.created_at,
      updatedAt: feature.properties.updated_at,
    };
  }

  // plain JSON fallback
  return {
    id: feature.id,
    name: feature.name,
    description: feature.description,
    latitude: Number(feature.latitude),
    longitude: Number(feature.longitude),
    createdAt: feature.created_at ?? feature.createdAt,
    updatedAt: feature.updated_at ?? feature.updatedAt,
  };
}

export const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all projects (featureCollection)
    getProjects: builder.query<Project[], void>({
      query: () => "/projects",
      transformResponse: (response: any) => {
        if (response?.type === "FeatureCollection") {
          return response.features.map(normalizeProject);
        }
        return [];
      },
      providesTags: ["Project"],
    }),
    // Get single project by ID
    getProject: builder.query<Project, number>({
      query: (id) => `/projects/${id}`,
      transformResponse: (response: any) => normalizeProject(response),
      providesTags: (_result, _error, id) => [{ type: "Project", id }],
    }),

    // Create new project - Normalize response (GeoJSON OR JSON)
    createProject: builder.mutation<Project, CreateProjectDto>({
      query: (body) => ({
        url: "/projects",
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        console.log("raw create response:", response);

        return normalizeProject(response);
      },
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
} = projectApi;
