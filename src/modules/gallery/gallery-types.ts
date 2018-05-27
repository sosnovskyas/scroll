import {
  GALLERY_UPDATE_REQUEST,
  GALLERY_UPDATE_REQUEST_FAIL,
  GALLERY_UPDATE_REQUEST_SUCCESS
} from "./gallery-constants";

export interface IGalleryImage {
  readonly title: string;
  readonly alt: string;
  readonly index?: number;
  readonly url?: string;
  readonly file?: File;
}

export interface IGalleryContainerComponentProps {
  readonly images: IGalleryImage[];
}

export interface IGalleryState {
  readonly images: IGalleryImage[];
}

export interface IGalleryUpdateRequestAction {
  readonly type: typeof GALLERY_UPDATE_REQUEST;
}
export interface IGalleryUpdateRequestFailAction {
  readonly type: typeof GALLERY_UPDATE_REQUEST_FAIL;
}
export interface IGalleryUpdateRequestSuccessAction {
  readonly type: typeof GALLERY_UPDATE_REQUEST_SUCCESS;
}

export type TGalleryActions =
  | IGalleryUpdateRequestAction
  | IGalleryUpdateRequestSuccessAction
  | IGalleryUpdateRequestFailAction;
