import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Item from "../../components/Item";
import Spinner from "../Spinner/Spinner";

import { useQuery } from "@apollo/client";
import { Q_ITEMS_BY_USER } from "../../graphql/queries/items-by-user";

import sortItemsByDateDesc from "../../util/sort-items-by-date-desc";

const AsideList = ({ user }) => {

  const [items, setItems] = useState(null);
  
  const { error, loading, data, refetch } = useQuery(Q_ITEMS_BY_USER, {
    variables: {
      id: user._id,
    },
    pollInterval: 45678,
  });

  useEffect(() => {
    if (!(error || loading) && data)
      setItems(_ => data.itemsByUser);
  }, [error, loading, data])

  const { lastRefreshAt } = useSelector(state => state.main);
  useEffect(() => {
    refetch();
  }, [refetch, lastRefreshAt]);
  
// <Item key={item._id} item={item} />
  return items ? (
    0 === items.length
    ? (
      <p>no posts</p>
    )
    : (
      sortItemsByDateDesc(items)
        .map(item => <Item key={item._id} item={item} />)
    )
  ): <Spinner />;
};

export default AsideList;
