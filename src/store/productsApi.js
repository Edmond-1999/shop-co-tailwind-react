import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const formatProduct = (product) => {
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.thumbnail];
  const productImages = images.length === 1
    ? [images[0], images[0], images[0]]
    : images.length === 2
      ? [images[0], images[1], images[0]]
      : images;
  const discountPercentage = product.discountPercentage || 0;
  const oldPrice = discountPercentage > 0
    ? Math.round(product.price / (1 - discountPercentage / 100))
    : null;
  const formattedReviews = (product.reviews || []).map((review, index) => ({
    id: `api-${index}`,
    reviewerName: review.reviewerName || 'Verified Buyer',
    rating: review.rating || 5,
    verified: true,
    comment: `"${review.comment}"`,
    date: new Date(review.date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  }));

  return {
    ...product,
    images: productImages.slice(0, 3),
    oldPrice,
    discountPercentage: discountPercentage > 0 ? Math.round(discountPercentage) : null,
    formattedReviews,
  };
};

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (limit) => `products?limit=${limit}&select=id,title,price,rating,thumbnail,images,category,discountPercentage`,
      transformResponse: (response) => response.products,
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
      transformResponse: formatProduct,
    }),
    getProductsByCategory: builder.query({
      query: (category) => `products/category/${encodeURIComponent(category)}`,
      transformResponse: (response) => response.products,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
} = productsApi;
