
import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import ItemsDataRow from "./ItemsDataRow";
import { useQuery } from "@apollo/client";

import { Q_USER_ITEMS } from "../graphql/queries/user-items";

const ItemsDataGrid = ({ user }) => {

  // user { _id, name, email }

  const [items, setItems] = useState(null);

  // https://www.apollographql.com/docs/react/data/queries#refetching
  const { 
    error, loading, data, 

    // pollInterval,
    // refetch,

    // networkStatus
  } = useQuery(Q_USER_ITEMS, {
    variables: { id: user._id },

    // notifyOnNetworkStatusChange: boolean; 
    //    uses .networkStatus to flag query net status
    
  });

  useEffect(() => {

    if (data?.user?.items?.length)
      setItems(data.user.items);
    
  }, [data, error, loading]);

  return (
    items ? (
      <div className="data-grid-items mt-4 shadow-sm">
        <Card>
          <Card.Header>Moji oglasi</Card.Header>
          <div className="">
            <Table className="mb-0" striped borderless hover>
              <thead className="text-primary fst-italic opacity-50">
                <tr>
                  <th className="text-center">#</th>
                  <th className="ps-sm-4">oglas</th>
                  <th className="ps-sm-4">opis</th>
                  <th className="ps-sm-4">slika</th>
                  <th className="ps-sm-4">postavljen</th>
                  <th className="ps-sm-4">uredi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <ItemsDataRow key={item._id} index={1+index} item={item} />
                ))}
              </tbody>
            </Table>
          </div>

          <Card.Footer>data footer</Card.Footer>
        </Card>
      </div>
    ) : (<p>Preuzimanje...</p>)
  );
};

export default ItemsDataGrid;
