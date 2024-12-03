import React, { useState } from 'react';
import PriceFilter from '@cui/ecommerce-component/PriceFilter';
import CategoryFilter from '@/components/action/filter/CategoryFilter';
import RatingFilter from '@/components/action/filter/RatingFilter';
import Accordion from '@cui/accordion/Accordion';
import Button from '@/components/@cui/button';

interface Props {
  categoriesList: string[];
  addQuery: any;
  deleteQueryAll: () => void;
}
const ProductFilterSidebar = ({
  categoriesList = [],
  addQuery,
  deleteQueryAll,
}: Props) => {
  // const { categories } = filters;

  const [categories, setCategories] = useState<string[]>(categoriesList);

  const handleCategories = (isChecked: boolean, item: string) => {
    setCategories((prevCategories) => {
      if (isChecked) {
        return [...prevCategories, item];
      } else {
        return prevCategories.filter((cat) => cat !== item);
      }
    });
  };

  const applyFilter = () => {
    addQuery('categories', categories.join(','));
  };
  const clearFilter = () => {
    setCategories([]);
    deleteQueryAll();
  };
  return (
    <div className=" w-full flex flex-col item-center space-y-6">
      <div className="w-full flex items-end justify-end space-x-2">
        <Button variant="secondary" onClick={clearFilter}>
          Clear Filter
        </Button>
        <Button onClick={applyFilter}>Apply</Button>
      </div>
      <Accordion title="Price" defaultOpen={true}>
        <PriceFilter />
      </Accordion>
      <Accordion title="Category" defaultOpen={true}>
        <CategoryFilter
          handleCategories={handleCategories}
          checkedCategories={categories}
        />
      </Accordion>

      <Accordion title="Rating" defaultOpen={true}>
        <RatingFilter />
      </Accordion>
    </div>
  );
};

export default ProductFilterSidebar;
