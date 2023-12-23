import * as React from 'react';

import algoliasearch from 'algoliasearch/lite';
import { useInstantSearch, useHits, useSearchBox } from 'react-instantsearch';
// import { InstantSearchNext } from 'react-instantsearch-nextjs';

const searchClient = algoliasearch(
  // eslint-disable-next-line @typescript-eslint/dot-notation
  process.env.ALGOLIA_APP_ID!,
  // eslint-disable-next-line @typescript-eslint/dot-notation
  process.env.ALGOLIA_API_KEY!,
);

const INDEX_NAME = 'store';

export function SearchProvider({ children }: { children: React.ReactNode }) {
  return (
    // <InstantSearchNext
    //   searchClient={{
    //     ...searchClient,
    //     search(requests) {
    //       const isEmptyQuery = requests.every(({ params }) => !params?.query);
    //       if (isEmptyQuery) {
    //         return Promise.resolve({
    //           results: requests.map(
    //             () =>
    //               ({
    //                 hits: [],
    //               }) as never,
    //           ),
    //         });
    //       }

    //       return searchClient.search(requests);
    //     },
    //   }}
    //   indexName={INDEX_NAME}
    // >
    //   {children}
    // </InstantSearchNext>
    <>{children}</>
  );
}

export function useSearchStatus() {
  const { status } = useInstantSearch();
  return { status };
}

export function useSearchResult() {
  // TODO: add type later
  const { hits, results } = useHits<any>();
  const query = results?.query;

  return { results: hits, query };
}
export type Result = ReturnType<typeof useSearchResult>['results'][number];

export function useSearchProviderInput() {
  const { query, refine } = useSearchBox();

  const update = (newQuery: string) => {
    refine(newQuery);
  };

  return { query, update };
}
