import Iconify from '@/@core/common/icon';

export const categoriesTrigger = () => {
  return (
    <button
      className={`w-full h-full cursor-pointer flex space-x-1  items-center md:space-x-2 text-sm md:text-lg px-1 bg-primary text-primary-foreground `}
    >
      <Iconify
        icon="material-symbols:menu"
        className={`text-primary-foreground `}
      />

      <p className={`m-0 p-0   uppercase font-semibold `}>All Categories</p>
    </button>
  );
};
