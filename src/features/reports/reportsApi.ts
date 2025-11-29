import { api } from "../../app/api";
import type { Report } from "../../types/report";

export const reportsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all reports
    getProjectReports: builder.query<Report[], number>({
      query: (projectId) => `/projects/${projectId}/reports`,
      providesTags: (result, _error, projectId) => 
        result 
          ? [
              ...result.map((r) => ({ type: "Reports" as const, id: r.id })),
              { type: "Reports", id: `PROJECT_${projectId}`}
            ] 
          : [{ type: "Reports", id: `PROJECT_${projectId}`}]
    }),

    // Get single report by ID
    getReportById: builder.query<Report, number>({
      query: (id) => `/reports/${id}`,
      providesTags: (_res, _err, id) => [{ type: "Reports", id }],
    }),
  }),
});

export const {
  useGetProjectReportsQuery,
  useGetReportByIdQuery,
} = reportsApi;
