// redux/api/vendor/vendorApi.ts
import { baseApi } from "../baseApi";
import { TVendor } from "@/types/vendorType";

export const vendorApi = baseApi.injectEndpoints({
   overrideExisting: true,
  endpoints: (builder) => ({
    allVendors: builder.query<TVendor[], void>({
      query: () => ({
        url: "/vendor",
        method: "GET",
      }),
      providesTags: ["Vendor"],
      transformResponse: (response: { data: TVendor[] }) => response.data,
    }),
  }),
});

export const { useAllVendorsQuery } = vendorApi;
