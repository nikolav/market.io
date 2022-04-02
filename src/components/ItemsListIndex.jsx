import React, { useEffect } from "react";
import ItemIndex from "./ItemIndex";

import "./ItemsListIndex.css";
import Masonry from "masonry-layout";

const ItemsListIndex = ({ items }) => {
  useEffect(() => {
    new Masonry(".masonry-grid-container", {
      itemSelector: ".masonry-grid-item",
      // columnWidth: 800,
      // gutter: 2,

      // when enabled, you can center the container with CSS
      fitWidth: true,

      // duration of the transition when items change position or appearance
      // transitionDuration: '0.4s'
      transitionDuration: 0,
    });
  }, []);

  return (
    <div className="mx-auto masonry-grid-container">
      {items.map((item, i) => {
        return (
          <div
            key={item._id}
            className="m-2 masonry-grid-item"
          >
            <ItemIndex item={item} />
          </div>
        );
      })}
    </div>
    // <>
    //   {items.map((item, i) => {
    //     return (
    //       <Col className="g-4" key={i} xs={12} lg={6} xl={4}>
    //         <ItemIndex item={item}/>
    //       </Col>
    //     );
    //   })}
    // </>
  );
};

export default ItemsListIndex;
