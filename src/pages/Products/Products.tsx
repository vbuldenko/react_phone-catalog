import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import './Products.scss';
import { Category } from '../../types/Category';

import { useSearchParams } from 'react-router-dom';
import { getPreparedProducts } from '../../helpers/getPreparedProducts';
import { ProductList } from '../../components/ProductList';
import { Filters } from '../../components/Filters';
import { Pagination } from '../../components/Pagination';
import { useAppContext } from '../../store/store';

type Props = {
  category: Category;
};

export const Products: React.FC<Props> = ({ category }) => {
  const {
    state: { products },
  } = useAppContext();
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

      <ProductList products={preparedProducts} />

      <Pagination products={categoryProducts} />
    </div>
  );
};
