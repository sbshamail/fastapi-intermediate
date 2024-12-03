import { useSearchParams } from 'next/navigation';

const useQuery = (): {
  addQuery: (o: string, q: string) => void;
  deleteQueryAll: () => void;
  getQuery: (name: string) => string | null;
  params: any;
} => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  function addQuery(object: string, query: string) {
    params.set(object, query);
    window.history.pushState(null, '', `?${params.toString()}`);
  }
  function deleteQueryAll() {
    const newParams = new URLSearchParams();
    window.history.pushState(null, '', `?${newParams.toString()}`);
  }
  function getQuery(name: string) {
    const query = searchParams.get(name);
    return query;
  }

  return { addQuery, deleteQueryAll, params, getQuery };
};

export default useQuery;
