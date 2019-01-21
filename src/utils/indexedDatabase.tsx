import idb from "idb";
import { IImageData } from "./IImageData";

const APP_IDB_NAME = "StyleTransfer";
const APP_IDB_VERSION = 1;
const IMAGE_DATA_OBJECT_STORE_NAME = "image_data";

const idbPromise = idb.open(APP_IDB_NAME, APP_IDB_VERSION, upgradeIdb => {
  upgradeIdb.createObjectStore(IMAGE_DATA_OBJECT_STORE_NAME, {
    keyPath: "date"
  });
});

export function saveImageData(data: IImageData) {
  return idbPromise.then(db =>
    db
      .transaction(IMAGE_DATA_OBJECT_STORE_NAME, "readwrite")
      .objectStore(IMAGE_DATA_OBJECT_STORE_NAME)
      .put(data)
  );
}

export function deleteImageData(key: number) {
  return idbPromise.then(db =>
    db
      .transaction(IMAGE_DATA_OBJECT_STORE_NAME, "readwrite")
      .objectStore(IMAGE_DATA_OBJECT_STORE_NAME)
      .delete(key)
  );
}

export function getAllImageData() {
  return idbPromise.then(db =>
    db
      .transaction(IMAGE_DATA_OBJECT_STORE_NAME, "readonly")
      .objectStore(IMAGE_DATA_OBJECT_STORE_NAME)
      .getAll()
  );
}
