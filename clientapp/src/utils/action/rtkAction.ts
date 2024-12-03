import { authapi } from '../../../config';
import toast, { ToastPosition } from 'react-hot-toast';
interface MutationType {
  Query: any;
  data: Record<string, any>;
  reset?: () => void;
  removeSelection?: () => void;
  position?: ToastPosition;
}
export const mutationAction = async ({
  Query,
  data,
  reset,
  removeSelection,
  position = 'top-center',
}: MutationType) => {
  try {
    const response = await Query(data).unwrap();
    // console.log(response);
    toast.success(`${response?.message}`, {
      position: position,
    });
    if (reset) {
      reset();
    }
    if (removeSelection) {
      removeSelection();
    }
  } catch (err: Error | any) {
    console.log(err);
    toast.error(`${err?.data?.detail}`, {
      position: position,
    });
  }
};
