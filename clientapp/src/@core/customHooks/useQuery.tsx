import { useSearchParams } from 'next/navigation';

const useQuery = (): {
  addQuery: (o: string, q: string) => void;
  removeQuery: () => void;
  params: any;
} => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  function addQuery(object: string, query: string) {
    params.set(object, query);
    window.history.pushState(null, '', `?${params.toString()}`);
  }
  function removeQuery() {
    const newParams = new URLSearchParams();
    window.history.pushState(null, '', `?${newParams.toString()}`);
  }
  return { addQuery, removeQuery, params };
};

export default useQuery;
