import React from "react";
import Item from "../../components/Item";

import { useQuery } from "@apollo/client";
import { Q_ITEMS_ALL } from "../../graphql/queries/items-all";

import sortItemsByDateDesc from "../../util/sort-items-by-date-desc";

const AsideList = () => {
  const { error, loading, data } = useQuery(Q_ITEMS_ALL, {
    pollInterval: 5678,
  });

  return (
    <>
      {!(error || loading) && 0 < data?.items?.length ? (
        sortItemsByDateDesc(data.items).map((item) => (
          <Item key={item._id} item={item} />
        ))
      ) : (
        <div>AsideList ...loading...</div>
      )}
    </>
  );
};

export default AsideList;
