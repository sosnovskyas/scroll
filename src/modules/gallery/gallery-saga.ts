import { SagaIterator } from "redux-saga";
import { takeEvery } from "redux-saga/effects";
import { GALLERY_UPDATE_REQUEST } from "./gallery-constants";
import { IGalleryUpdateRequestAction } from "./gallery-types";

function* galleryUpdateWorker(
  action: IGalleryUpdateRequestAction
): SagaIterator {}

export function* gallerySaga(): SagaIterator {
  yield takeEvery(GALLERY_UPDATE_REQUEST, galleryUpdateWorker);
}
