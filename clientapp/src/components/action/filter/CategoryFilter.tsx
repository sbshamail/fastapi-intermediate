'use client';
import Iconify from '@/@core/common/icon';
import Checkbox from '@/components/@cui/textField/Checkbox';
import { categoriesList } from '@/utils/contents/categoriesList';
import React, { FC } from 'react';

interface Props {
  handleCategories: (e: boolean, item: string) => void;
  checkedCategories: string[];
}
const CategoryFilter: FC<Props> = ({ handleCategories, checkedCategories }) => {
  return (
    <div>
      {categoriesList.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between">
            <table className="m-0 p-0 w-full border-collapse">
              <thead className="border-none">
                <tr>
                  <th className="text-left"></th>
                  <th className="text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-10 whitespace-normal m-0 p-0 text-left">
                    <Checkbox
                      className="p-[6px]"
                      checked={checkedCategories.includes(item.name)}
                      onChange={(e) => handleCategories(e, item.name)}
                    />
                  </td>
                  <td className="m-0 p-0  text-left whitespace-normal">
                    <h5 className="text-lg ">{item.name}</h5>
                  </td>
                </tr>
              </tbody>
            </table>
            <Iconify icon="weui:arrow-outlined" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
