'use client';
import React, { Suspense, useEffect, useState } from 'react';
import useQuery from '@/@core/customHooks/useQuery';
import { Space } from '@/app/overlayer';
// components
import ProductInfiniteScroll from '@/components/infinitScroll/ProductInfinitScroll';
import SortByPrice from '@/components/action/filter/SortByPrice';
import ProductFilterSidebar from '@/components/sidebar/ProductFilterSidebar';
import ProductFilterDrawer from '@/components/openDrawers/ProductFilterDrawer';
// redux
import { useGetProductQuery } from '@/lib/store/services/product';

const defaultLimit = 8;
const ProductPage = () => {
  const [filters, setFilters] = useState<any>({
    limit: 8,
    page: 0,
    searchTerm: '',
    categories: [],
  });
  const { page, limit, categories, searchTerm } = filters;

  // console.log(page);
  const { data, error, isLoading, refetch, isFetching } = useGetProductQuery(
    {
      page,
      limit,
      categories,
      searchTerm,
    },
    { refetchOnMountOrArgChange: true }
  );
  const setPage = (page: number) => {
    setFilters({ ...filters, page });
  };
  // Use default values to handle undefined or null data
  const result = data?.result || [];
  const count = data?.count || 0;

  //search query handle
  const { addQuery, params, deleteQueryAll } = useQuery();
  const categoriesList = params?.get('categories')?.split(',') || [];
  const searchTermQuery = params?.get('searchTerm') || '';
  useEffect(() => {
    // Avoid calling setFilters if categories hasn't changed
    if (
      JSON.stringify(filters.categories) !== JSON.stringify(categoriesList) ||
      filters.searchTerm !== searchTermQuery
    ) {
      setFilters({
        ...filters,
        limit: defaultLimit,
        page: 0,
        categories: categoriesList,
        searchTerm: searchTermQuery,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesList, searchTermQuery]);
  return (
    <div>
      <div className="flex flex-1 space-x-4 ">
        {/* sidebar hidden in mobile */}
        <div className=" hidden lg:flex relative ">
          <div className=" lg:w-80 h-full overflow-y-auto px-4 py-4">
            <ProductFilterSidebar
              categoriesList={categoriesList}
              addQuery={addQuery}
              deleteQueryAll={deleteQueryAll}
            />
          </div>
          <div className="absolute right-0 h-full border border-border"></div>
        </div>
        <Space className="w-full py-4">
          <div className="w-full flex items-center justify-between lg:justify-end">
            {/* side drawer, large device hidden */}
            <div className="lg:hidden">
              <ProductFilterDrawer
                categoriesList={categoriesList}
                addQuery={addQuery}
                deleteQueryAll={deleteQueryAll}
              />
            </div>
            <SortByPrice />
          </div>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <ProductInfiniteScroll
                data={result}
                isFetching={isFetching}
                error={error}
                isLoading={isLoading}
                setPage={setPage}
                count={count}
                page={page}
                limit={limit}
              />
            </div>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default ProductPage;
