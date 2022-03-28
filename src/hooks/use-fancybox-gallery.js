

import { useState } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";


function useFancyboxGallery () {

    const [gallery, setGallery] = useState(null);


    return { gallery, openGallery };

    function openGallery ( ...args ) { // list, options
        return setGallery(Fancybox.show.apply(null, args));
    }
}

export default useFancyboxGallery;
