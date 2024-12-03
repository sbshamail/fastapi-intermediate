import React, { FC } from 'react';
import { formatDate } from '@/utils/helper';
type column = {
  accessor: string | '';
  title?: string | number | Date | any;
  type?: string;
  fn?: (item: any) => void;
};

interface Props {
  body: any[];
  columns: column[];
}
const Table: FC<Props> = ({
  body = [],
  columns = [
    { accessor: 'name', title: 'Name' },
    { accessor: 'email', title: 'Email' },
    { accessor: 'createdAt', title: new Date(), type: 'date', fn: formatDate },
  ],
}) => {
  const getValue = (item: any, column: column) => {
    try {
      // Split the column's dataKey or use column.id to navigate through the object
      const keys = column.accessor
        ? column.accessor.split('.')
        : [column.accessor];
      const value: any = keys.reduce(
        (currentValue, key) => currentValue[key],
        item
      );

      // Check if the column is of type 'date' and format the date
      if (column.type === 'date' && value) {
        if (value instanceof Date) {
          return column.fn ? column.fn(value) : formatDate(value); // Use the formatDate function as defined previously
        }
      }
      return value;
    } catch (error) {
      console.error('Error accessing value:', error);
      return ''; // Return a default or empty string if the path is incorrect or value is undefined
    }
  };

  return (
    <table className="m-0 p-0 w-full border-collapse">
      <thead className="border-none">
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="text-left">
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((item, index) => (
          <tr key={index}>
            {columns.map((column, index) => (
              <td key={index} className="m-0 p-0 whitespace-normal text-left">
                {getValue(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
