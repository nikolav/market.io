import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import ItemsDataRow from "./ItemsDataRow";
import { useQuery } from "@apollo/client";

import { Q_ITEMS_BY_USER } from "../graphql/queries/items-by-user.js";

import Spinner from "./Spinner/Spinner";
import sortItemsByDateDesc from "../util/sort-items-by-date-desc.js";

const ItemsDataGrid = ({ user }) => {
  // user { _id, name, email }

  const [items, setItems] = useState(null);

  // https://www.apollographql.com/docs/react/data/queries#refetching
  const {
    error,
    loading,
    data,
    // pollInterval,
    refetch,
    // networkStatus
  } = useQuery(Q_ITEMS_BY_USER, {
    variables: { id: user._id },
    pollInterval: 12345,
    // notifyOnNetworkStatusChange: boolean;
    //    uses .networkStatus to flag query net status
  });

  
  useEffect(() => {
    if (data?.itemsByUser?.length) 
      setItems(items_ => sortItemsByDateDesc(data.itemsByUser));
  }, [data, error, loading]);
  
  useEffect(refetch, []);
  return items ? (
    <div className="rounded-2 bg-white data-grid-items shadow p-2">
      <Card className="rounded-0 border-0">
        <Card.Header className="pb-2 bg-white border-bottom-0">
          <strong className="h4">Moji oglasi</strong>
        </Card.Header>
        <Table className="mb-0" striped borderless hover>
          <thead className="text-primary fst-italic opacity-50">
            <tr>
              <th className="text-center">⚙</th>
              <th className="ps-sm-4">oglas</th>
              {/* <th className="ps-sm-4">opis</th>
                  <th className="ps-sm-4">slika</th> */}
              <th className="ps-sm-4">postavljen</th>
              {/* <th className="ps-sm-4">uredi</th> */}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <ItemsDataRow key={item._id} index={1 + index} item={item} />
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  ) : (
    <Spinner />
  );
};

export default ItemsDataGrid;
