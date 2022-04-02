import React, { useEffect } from "react";
import { ListGroup, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

import { useQuery } from "@apollo/client";
import { Q_COUNT_USER_ITEMS } from "../../graphql/queries/count-user-items.js";

const SideBarActions = ({ user }) => {
  const { lastRefreshAt } = useSelector(state => state.main);
  const { error, loading, data, refetch } 
    = useQuery(Q_COUNT_USER_ITEMS, {
      variables: { user: user._id },
    });

  useEffect(() => { refetch(); }, [lastRefreshAt]);

  return (
    <Card className="rounded-0 shadow-sm" style={{ height: "100%" }}>
      <Card.Title className="my-5 text-primary text-center">
        <strong>Zdravo, {user.name} 👋🏼</strong>
      </Card.Title>

      <ListGroup className="" variant="flush">
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <span>ukupno oglasa</span>
          <em className="badge rounded-pill bg-primary">{!(error || loading) && data ? data.countUserItems : ".."}</em>
        </ListGroup.Item>
        <ListGroup.Item>@todos </ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      </ListGroup>
      
    </Card>
  );
};

export default SideBarActions;
