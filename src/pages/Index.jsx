import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

import GuestNavigation from "../components/GuestNavigation";
import ItemsListIndex from "../components/ItemsListIndex";
import Spinner from "../components/Spinner/Spinner";

import { useQuery, useLazyQuery } from "@apollo/client";
import { Q_ITEMS_ALL } from "../graphql/queries/items-all";
import { Q_TEXT_SEARCH } from "../graphql/queries/search-items-by-text.js";

import sortItemsByDateDesc from "../util/sort-items-by-date-desc.js";

const Index = () => {

  const [items, setItems] = useState(null);
  const { error, loading, data, refetch } = useQuery(Q_ITEMS_ALL, {
    pollInterval: 55667,
  });

  useEffect(() => {
    if (!(error || loading) && data)
      setItems((_) => sortItemsByDateDesc(data.items));
  }, [error, loading, data]);

  const { searchTerm } = useSelector(state => state.main);
  const [q_search, qStatus] = useLazyQuery(Q_TEXT_SEARCH);
  useEffect(() => {
    if (!searchTerm) return;
    const term = searchTerm.trim();
    if (term)
      q_search({variables: { term }});
  }, [searchTerm]);
  useEffect(() => {
    if (!(qStatus.error || qStatus.loading) && qStatus.data)
      setItems(_ => qStatus.data.searchItems);
  }, [qStatus]);
  return (
    <>
      <GuestNavigation />
      <Container fluid="xl">
        {items ? (
          0 === items.length ? (
            <p>no posts</p>
          ) : (
              <ItemsListIndex items={items} />
          )
        ) : (
          <Spinner />
        )}
        </Container>
    </>
  );
};

export default Index;
