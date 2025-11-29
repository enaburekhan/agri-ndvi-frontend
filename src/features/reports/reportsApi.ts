import { api } from "../../app/api";
import type { CreateReportDto, Report } from "../../types/report";

export const reportsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all reports
    getReports: builder.query<Report[], void>({
      query: () => "/reports",
      providesTags: ["Reports"],
    }),

    // Get single report by ID
    getReportById: builder.query<Report, number>({
      query: (id) => `/reports/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Reports", id }],
    }),
    // Create a new report
    createReport: builder.mutation<Report, CreateReportDto>({
      query: (body) => ({
        url: "/reports",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reports"],
    }),
  }),
});

export const {
  useGetReportsQuery,
  useGetReportByIdQuery,
  useCreateReportMutation,
} = reportsApi;
