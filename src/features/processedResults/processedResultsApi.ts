import { api } from "../../app/api";

export interface ProcessedResult {
    id: number;
    upload_id: number;
    result_type: string;
    data_url: string;
    metadata: Record<string, any>;
    created_at: string;
};

export const processedResultsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getResultsByUpload: builder.query<ProcessedResult[], number>({
            // uploadId
            query: (uploadId) => `/uploads/${uploadId}/processed_results`,
            providesTags: (result, _error, uploadId) => 
                result
                  ? [
                       ...result.map((r) => ({ type: "ProcessedResults" as const, id: r.id })),
                       { type: "ProcessedResults", id: `UPLOAD_${uploadId}` }
                    ]
                  : [{ type: "ProcessedResults", id: `UPLOAD_${uploadId}` }],
        }),

        getProcessedResult: builder.query<ProcessedResult, number>({
            query: (id) => `/processed_results/${id}`,
            providesTags: (_result, _error, id) => [{ type: "ProcessedResults", id }],
        }),
    }),
});

export const {
  useGetResultsByUploadQuery,
  useGetProcessedResultQuery,
} = processedResultsApi