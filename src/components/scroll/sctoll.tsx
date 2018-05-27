import * as React from "react";
import { UIEventHandler } from "react";
import { debounce } from "lodash";
import { ItemWrapper, Layout, ScrollWrapper } from "./scroll-elements";
import { IScrollWrapperOptions, IScrollWrapperState } from "./scroll-types";

export class Scroll<T> extends React.Component<
  IScrollWrapperOptions<T>,
  IScrollWrapperState<T>
> {
  private readonly items: { options: T; index: number }[];
  private readonly Item: (props: T) => React.ReactElement<T>;
  private readonly itemHeight: number;
  private readonly itemWidth: number;
  private readonly height: number;
  private readonly width: number;
  private readonly activeCount: number;
  private readonly delay: number;
  private readonly currentItemUpdate: (currentItem: number) => void;

  constructor(props: IScrollWrapperOptions<T>) {
    super(props);
    const {
      items,
      width,
      height,
      itemWidth,
      itemHeight,
      activeCount,
      item,
      delay
    } = props;

    this.state = {
      currentItem: 0
    };
    this.width = width;
    this.height = height;
    this.itemWidth = itemWidth;
    this.itemHeight = itemHeight;
    this.activeCount = activeCount;
    this.delay = delay;
    this.items = items.map((item, index) => ({ options: item, index }));
    this.Item = item;
    this.currentItemUpdate = debounce((currentItem: number) => {
      console.log("update");
      this.setState({
        currentItem
      });
    }, this.delay);
  }

  private onScroll: UIEventHandler<HTMLElement> = event => {
    const currentItem = Math.floor(
      event.currentTarget.scrollTop / this.itemHeight
    );
    this.currentItemUpdate(currentItem);
  };

  public render() {
    const rowItemsCount = Math.floor(this.width / this.itemWidth);
    const layoutWidth = rowItemsCount * this.itemWidth;
    const layoutHeight = this.items.length * this.itemHeight;
    const beforeOffset = Math.floor(this.activeCount / 2);
    const afterOffset = Math.max(1, Math.floor(this.activeCount / 2));
    const before = this.state.currentItem - beforeOffset;
    const after = this.state.currentItem + afterOffset;
    const from = Math.max(0, before);
    const to = Math.min(this.items.length, after);
    const items = this.items.slice(from, to);

    return (
      <ScrollWrapper
        height={this.height}
        width={this.width}
        onScroll={this.onScroll}
      >
        <Layout height={layoutHeight} width={layoutWidth} itemSize={this.itemHeight}>
          {items.map((item, index) => (
            <ItemWrapper
              key={index}
              index={item.index}
              height={this.itemHeight}
            >
              <this.Item {...item.options} />{" "}
            </ItemWrapper>
          ))}
        </Layout>
      </ScrollWrapper>
    );
  }
}
