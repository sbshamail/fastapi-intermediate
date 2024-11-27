'use client';
import React, { Suspense, useEffect, useState } from 'react';
import MainSearchbar from '@/components/@cui/searchbar/MainSearchbar';
import useQuery from '@/@core/customHooks/useQuery';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
const NavSearchbar = () => {
  const [searchEnter, setSearchEnter] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const pathname = usePathname();
  const router = useRouter();
  const { addQuery, params } = useQuery();
  const searchTermQuery = params?.get('searchTerm') || '';
  useEffect(() => {
    if (searchTerm !== searchTermQuery) {
      setSearchTerm(searchTermQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTermQuery]);
  useEffect(() => {
    if (searchEnter) {
      if (pathname === '/product') {
        addQuery('searchTerm', searchTerm);
      } else {
        router.push(`/product?searchTerm=${searchTerm}`);
      }
      setSearchEnter(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchEnter]);
  return (
    <MainSearchbar
      className="md:p-2"
      setFilterEnter={setSearchEnter}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default NavSearchbar;
