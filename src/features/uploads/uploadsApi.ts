import { api } from "../../app/api";

export interface Upload {
  id: number;
  project_id: number;
  status: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  file_url?: string;
}

export const uploadsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjectUploads: builder.query<Upload[], number>({
      // projectId
      query: (projectId) => `/projects/${projectId}/uploads`,
      providesTags: (result, projectId) =>
        result
          ? [
              ...result.map((u) => ({ type: "Uploads" as const, id: u.id })),
              { type: "Uploads", id: `PROJECT_${projectId}` },
            ]
          : [{ type: "Uploads", id: `PROJECT_${projectId}` }],
    }),

    createProjectUpload: builder.mutation<
      Upload,
      { projectId: number; formData: FormData }
    >({
      query: ({ projectId, formData }) => ({
        url: `/projects/${projectId}/uploads`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (_result, _err, { projectId }) => [
        { type: "Uploads", id: `PROJECT_${projectId}` },
      ],
    }),

    getUpload: builder.query<Upload, number>({
      query: (uploadId) => `/uploads/${uploadId}`,
      providesTags: (_result, _error, id) => [{ type: "Uploads", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProjectUploadsQuery,
  useCreateProjectUploadMutation,
  useGetUploadQuery,
} = uploadsApi;
