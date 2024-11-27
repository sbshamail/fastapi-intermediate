import { ReviewsDataType } from '../interfaces/schemaTypes';

export const reviewsList: ReviewsDataType[] = [
  {
    id: 1,

    date: new Date(),
    user: {
      username: 'Ali',
      id: 1,
    },
    productId: 50,
    rating: 5,
    description:
      ' Lorem Ipsumin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate',
  },
  {
    id: 2,
    date: new Date(),
    user: {
      username: 'Ahmed',
      id: 2,
    },
    productId: 50,
    rating: 4,
    description:
      ' Lorem Ipsumin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate',
  },
  {
    id: 3,
    date: new Date(),
    user: {
      username: 'Khan',
      id: 3,
    },
    productId: 50,
    rating: 5,
  },
];
