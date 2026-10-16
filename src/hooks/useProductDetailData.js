import { useEffect, useState } from 'react';

function formatProduct(data) {
  let images = Array.isArray(data.images) && data.images.length > 0
    ? data.images
    : [data.thumbnail];
  if (images.length === 1) {
    images = [images[0], images[0], images[0]];
  } else if (images.length === 2) {
    images = [images[0], images[1], images[0]];
  }

  const discountPercentage = data.discountPercentage || 0;
  const oldPrice = discountPercentage > 0
    ? Math.round(data.price / (1 - discountPercentage / 100))
    : null;
  const formattedReviews = (data.reviews || []).map((review, index) => ({
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
    ...data,
    images: images.slice(0, 3),
    oldPrice,
    discountPercentage: discountPercentage > 0 ? Math.round(discountPercentage) : null,
    formattedReviews,
  };
}

function useProductDetailData(id) {
  const [productResult, setProductResult] = useState({ id: null, product: null, error: null });
  const [relatedResult, setRelatedResult] = useState({
    id: null,
    products: [],
    error: null,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let isMounted = true;

    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load product details');
        return response.json();
      })
      .then((data) => {
        if (!isMounted) return;
        setProductResult({ id, product: formatProduct(data), error: null });
      })
      .catch((fetchError) => {
        if (isMounted) {
          setProductResult({ id, product: null, error: fetchError.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const product = productResult.id === id ? productResult.product : null;
  const error = productResult.id === id ? productResult.error : null;
  const loading = productResult.id !== id;

  useEffect(() => {
    if (!product) return undefined;

    let isMounted = true;

    fetch(`https://dummyjson.com/products/category/${encodeURIComponent(product.category)}`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load related products');
        return response.json();
      })
      .then((data) => {
        if (!isMounted) return;
        setRelatedResult({
          id: product.id,
          products: (data.products || [])
            .filter((relatedProduct) => String(relatedProduct.id) !== String(product.id))
            .slice(0, 4),
          error: null,
        });
      })
      .catch(() => {
        if (isMounted) {
          setRelatedResult({
            id: product.id,
            products: [],
            error: 'Unable to load related products.',
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [product]);

  const isRelatedResultCurrent = String(relatedResult.id) === String(product?.id);

  return {
    product,
    error,
    loading,
    relatedProducts: isRelatedResultCurrent ? relatedResult.products : [],
    relatedError: isRelatedResultCurrent ? relatedResult.error : null,
  };
}

export default useProductDetailData;
