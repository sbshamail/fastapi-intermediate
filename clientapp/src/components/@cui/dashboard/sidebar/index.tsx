import Iconify from '@/@core/common/icon';

import Shadow from '@/@core/tag/Shadow';

interface Props {
  isOpen: boolean;
  type?: 'fixed' | 'absolute';
  position?: 'right' | 'left';
  children?: React.ReactNode;
  data?: any[];
  title: string;
  toggleSidebar: () => void;
}
const SidebarDashboard = ({
  children,
  isOpen,
  type,
  position,
  title,
  data,
  toggleSidebar,
}: Props) => {
  return (
    <div>
      <Shadow
        space="0"
        className={` ${type || 'absolute'} ${
          position === 'right' ? 'right-0' : 'left-0'
        } top-0 h-full  overflow-auto  transition-transform transform w-64 ${
          isOpen
            ? position === 'right'
              ? 'translate-x-0'
              : 'translate-x-0'
            : position === 'right'
              ? 'translate-x-[110%]'
              : '-translate-x-[110%]'
        } `}
      >
        <h2 className="p-4 text-xl text-primary">{title}</h2>
        {children}
      </Shadow>
      <div
        className={`my-6 ${type || 'absolute'}  top-0  z-sidebar 
                ${
                  isOpen ? (position === 'left' ? 'ml-64 ' : 'me-64 ') : ''
                } ${position === 'left' ? 'left-0' : 'right-0'} iconPrimary `}
      >
        <Iconify
          icon={`${
            isOpen
              ? position === 'left'
                ? 'mdi:hamburger-open'
                : 'mdi:hamburger-close'
              : position === 'left'
                ? 'mdi:hamburger-close'
                : 'mdi:hamburger-open'
          }`}
          fontSize={'1.5em'}
          onClick={toggleSidebar}
          className="text-primary cursor-pointer"
        />
      </div>
    </div>
  );
};
export default SidebarDashboard;
