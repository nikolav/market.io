import React, { useEffect } from "react";
import Item from "../../components/Item";

import { useQuery } from "@apollo/client";
import { Q_ITEMS_BY_USER } from "../../graphql/queries/items-by-user";

import sortItemsByDateDesc from "../../util/sort-items-by-date-desc";

import Spinner from "../Spinner/Spinner";

const AsideList = ({ user }) => {

  const { error, loading, data, refetch } = useQuery(Q_ITEMS_BY_USER, {
    variables: {
      id: user._id,
    },
    pollInterval: 12345,
  });


  useEffect(refetch, []);

  return (
    <>
      {!(error || loading) && 0 < data?.itemsByUser?.length ? (
        sortItemsByDateDesc(data.itemsByUser).map((item) => (
          <Item key={item._id} item={item} />
        ))
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default AsideList;
