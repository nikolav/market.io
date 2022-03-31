
import crypto from "crypto";

export default function md5sum (text) {
    return crypto.createHash("md5").update(text).digest("hex");
}

