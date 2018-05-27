export interface IScrollWrapperOptions<T> {
  itemHeight: number;
  itemWidth: number;
  width: number;
  height: number;
  activeCount: number;
  delay: number;
  items: T[];
  item: (props: T) => React.ReactElement<T>;
}

export interface IScrollWrapperState<T> {
  currentItem: number;
}
