

realtime db @firebase
=====================
- api for syncing data realtime
- use flat json object for data; key, value pairs
- install package
$ npm install firebase/database
- import 

import { 
    
    getDatabase, 
    onValue, 
    ref, 
    set, 

    // adds items to a node as a list
    push,  

    // listen to changes on a node in data tree
    onChildAdded, 
    onChildChanged,
    onChildRemoved,
    
} from "firebase/database";

const app = initializeFirebaseWithConfig();
const db  = getDatabase(app);

- use `ref` to reference points for r/w

let field       = "A";
const reference = ref(db, `posts-likes/${field}`)

- use `set` to set/replace data to a reference
# set(reference, data);

- `onValue` to observe changes

onValue(reference, snapshot => {
  const currentData = snapshot.val();
});

// hook
const [write, { value }] = useFirebaseRealtimeDb();