import { TGalleryActions, IGalleryState } from "./gallery-types";

const images = Array.from({ length: 999 }, () => ({
  title: String(Math.floor(Math.random() * 40)),
  alt: String(Math.floor(Math.random() * 40)),
  url: String(Math.floor(Math.random() * 40))
}));

const defaultGalleryState: IGalleryState = {
  images
};

export const galleryReducer = (
  state: IGalleryState = defaultGalleryState,
  action: TGalleryActions
): IGalleryState => {
  switch (action.type) {
    default:
      return state;
  }
};
