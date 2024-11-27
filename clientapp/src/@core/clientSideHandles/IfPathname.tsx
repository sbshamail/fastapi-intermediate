'use client';
import { usePathname } from 'next/navigation';
import { ChildrenTypes } from '@/utils/interfaces/commonTypes';
interface Props extends ChildrenTypes {
  path: string;

  className?: React.ComponentProps<'div'>['className'];
  notMatchClass?: React.ComponentProps<'div'>['className'];
}
const IfPathname = ({ path, children, className = 'hidden' }: Props) => {
  const pathname = usePathname();
  const match = pathname !== path;
  return <div className={`${match ? `${className}` : ``}`}>{children}</div>;
};

export default IfPathname;
