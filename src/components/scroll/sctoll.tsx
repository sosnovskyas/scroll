import { UIEventHandler } from "react";
import * as React from "react";
import { debounce } from "lodash";
import styled from "styled-components";

interface IScrollWrapperOptions<T> {
  itemHeight: number;
  itemWidth: number;
  width: number;
  height: number;
  activeCount?: number;
  delay?: number;
  items: T[];
  item: (props: T) => React.ReactElement<T>;
}

interface IScrollWrapperState<T> {
  currentItem: number;
}

const ScrollWrapper = styled<{ width: number; height: number }, "div">("div")`
  border: 1px dashed brown;
  height: ${p => p.height}px;
  width: ${p => p.width}px;
  overflow: auto;
`;
const Layout = styled<{ width: number; height: number }, "div">("div")`
  position: relative;
  height: ${p => p.height}px;
  width: ${p => p.width}px;
  // background-image: ;
`;

const ItemWrapper = styled<{ index: number; height: number }, "div">("div")`
  position: absolute;
  top: ${p => p.index * p.height}px;
  border: 1px solid black;
  width: 100px;
  height: ${p => p.height}px;
`;

export class Scroll<T> extends React.Component<
  IScrollWrapperOptions<T>,
  IScrollWrapperState<T>
> {
  private readonly items: T[];
  private readonly Item: (props: T) => React.ReactElement<T>;
  private readonly itemHeight: number;
  private readonly itemWidth: number;
  private readonly height: number;
  private readonly width: number;
  private readonly activeCount: number = 10;
  private readonly delay: number = 0;

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
    this.items = items;
    this.Item = item;

    console.log(this);
  }

  private currentItemUpdate = debounce((currentItem: number) => {
    console.log("update", currentItem);
    this.setState({
      currentItem
    });
  }, 500);

  private onScroll: UIEventHandler<HTMLElement> = event => {
    console.log("scroll");
    const currentItem = Math.floor(
      event.currentTarget.scrollTop / this.itemHeight
    );
    this.currentItemUpdate(currentItem);
  };

  public render() {
    const layoutHeight = this.items.length * this.itemHeight;
    const before = Math.floor(this.state.currentItem - this.activeCount / 2);
    const after = Math.floor(this.state.currentItem + this.activeCount / 2);
    const from = Math.max(0, before);
    const to = Math.min(this.items.length, after);
    const items = this.items.slice(from, to);

    console.log({ before, after, from, to });
    console.log(items);
    return (
      <ScrollWrapper
        height={this.height}
        width={this.width}
        onScroll={this.onScroll}
      >
        <Layout height={layoutHeight} width={100}>
          {items.map((item, index) => (
            <ItemWrapper key={index} index={index} height={this.itemHeight}>
              <this.Item {...item} />{" "}
            </ItemWrapper>
          ))}
        </Layout>
      </ScrollWrapper>
    );
  }
}
