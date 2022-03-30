

import { useState } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";


function useFancyboxGallery () {

    const [gallery, setGallery] = useState(null);


    return { gallery, openGallery };

    // input: object[], options: object
    function openGallery ( ...args ) { 
        return setGallery(Fancybox.show.apply(null, args));
    }
}

export default useFancyboxGallery;
