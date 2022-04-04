import { useEffect, useState } from "react";

import { firebaseApp } from "../app/firebase";
import { getDatabase, onValue, set, ref } from "firebase/database";

const db = getDatabase(firebaseApp);

export function localId(id) {
  return `.oglasi-${id}-like`;
}

export default function useLike(id) {
  const LIKECACHE = localId(id);
  const itemRefLike = ref(db, `like/${id}`);

  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    return onValue(itemRefLike, (snapshot) =>
      setLikeCount(old_ => snapshot.val() ?? old_)
    );
  }, []);

  return [like, likeCount];

  function like() {

    if (null != localStorage.getItem(LIKECACHE)) 
      return unlike_();

    localStorage.setItem(LIKECACHE, 1);
    set(itemRefLike, likeCount + 1);

  }

  function unlike_ () {
    localStorage.removeItem(LIKECACHE);
    set(itemRefLike, likeCount - 1);
  }
}
