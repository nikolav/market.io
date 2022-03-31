
import { useState } from "react";

// @todo
export default function useFetchGet () {

    const [error, setError]     = useState(null);
    const [loading, setLoading] = useState(null);
    const [result, setResult]   = useState(null);


    return {
        fetch  : fetch_, 
        cancel : cancel_,
    };

    function fetch_ () {}
    function cancel_ () {}
    function reset_ () {
        setError(null);
        setLoading(null);
        setResult(null);
    }
}
