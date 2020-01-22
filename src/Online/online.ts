import { Base, IBaseProps } from '../main';
import { ReactChild } from 'react';

export interface IOnlineProps extends Partial<IBaseProps> {
  children: ReactChild | undefined;
}

export class Online extends Base<IOnlineProps> {
  render() {
    return this.state.online ? this.renderChildren() : null;
  }
}