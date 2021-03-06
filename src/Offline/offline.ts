import { Base, IBaseProps } from '../main';
import { ReactChild } from 'react';

export interface IOfflineProps extends Partial<IBaseProps> {
  children: ReactChild | undefined;
}

export class Offline extends Base<IOfflineProps> {
  constructor(props: IOfflineProps) { super(props) }
  render() {
    return !this.state.online ? this.renderChildren() : null;
  }
}