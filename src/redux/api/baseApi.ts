import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath:'baseApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost/8080/api'
    },
),

 tagTypes: ['Product', 'User', 'Order'],
    endpoints: ()=>({})

})