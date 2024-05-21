import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import './Products.scss';

import { useParams, useSearchParams } from 'react-router-dom';
import { getPreparedProducts } from '../../helpers/getPreparedProducts';
import { ProductList } from '../../components/ProductList';
import { Filters } from '../../components/Filters';
import { Pagination } from '../../components/Pagination';
import { useAppContext } from '../../store/store';
// import { ProductCardSkeleton } from '../../components/ProductCard';
import Loader from '../../components/Loader/Loader';

export const Products: React.FC = () => {
  const {
    state: { isLoading, products },
  } = useAppContext();
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const categoryProducts = products.filter(item => item.category === category);

  const sort = searchParams.get('sort');
  const query = searchParams.get('query');
  const onPage = searchParams.get('onPage');
  const page = searchParams.get('page') || '1';

  const preparedProducts = getPreparedProducts(categoryProducts, {
    sort,
    query,
    onPage,
    page,
  });

  return (
    <div className="products">
      <Breadcrumbs />

      <div className="products__info">
        <h1 className="products__title">{category}</h1>
        <span className="products__amount">{`${categoryProducts.length} models`}</span>
      </div>

      <Filters />

      {/* {isLoading && (
        <div className="loading">
          {Array.from({ length: 4 }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )} */}

      {isLoading && <Loader />}
      {!isLoading && <ProductList products={preparedProducts} />}

      <Pagination products={categoryProducts} />
    </div>
  );
};
