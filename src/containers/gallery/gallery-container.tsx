import * as React from "react";
import { connect } from "react-redux";
import { Scroll } from "../../components/sctoll";
import {
  IGalleryContainerComponentProps,
  IGalleryImage
} from "../../modules/gallery/gallery-types";
import { IApplicationState } from "../../modules/redux/redux-module";
import { ImageItem } from "../../components/image-item";

const ImagesScroll = Scroll as new () => Scroll<IGalleryImage>;
export const GalleryContainerComponent = (
  props: IGalleryContainerComponentProps
): React.ReactElement<IGalleryContainerComponentProps> => {
  const { images } = props;
  const items = images.map((item, index) => ({ ...item, index }));

  return (
    <ImagesScroll
      height={200}
      width={300}
      count={10}
      items={items}
      item={ImageItem}
    />
  );
};

const galleryContainerSelector = (
  state: IApplicationState
): IGalleryContainerComponentProps => ({
  images: state.gallery && state.gallery.images
});

export const GalleryContainer = connect(galleryContainerSelector)(
  GalleryContainerComponent
);
