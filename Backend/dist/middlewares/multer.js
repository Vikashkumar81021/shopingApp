import multer from "multer";
import { v4 as uuid } from "uuid";
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "uploads");
    },
    filename(req, file, callback) {
        const id = uuid();
        const extname = file.originalname.split(".").pop();
        callback(null, `${id}.${extname}`);
    },
});
export const singleUpload = multer({ storage }).single("photo");
