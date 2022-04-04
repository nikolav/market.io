import React from "react";

import useLike from "../../hooks/use-like";
import { localId } from "../../hooks/use-like";

import iconLikeEmpty from "../../theme/etc/icon-like-empty.svg";
import iconLikeFilled from "../../theme/etc/icon-like-filled.svg";

const Like = ({ id, ...rest }) => {
  const [like, likeCount] = useLike(id);
  const isLiked = null != localStorage.getItem(localId(id));

  return (
    <em
      className="text-primary cursor-pointer d-flex align-items-center"
      onClick={like}
    >
      <img
        className="cursor-pointer"
        alt=""
        src={isLiked ? iconLikeFilled : iconLikeEmpty}
        {...rest}
      />
      <i style={{fontSize: "72%"}} className="pt-1 ms-1 cursor-pointer">{likeCount || 0}</i>
    </em>
  );
};

export default Like;
