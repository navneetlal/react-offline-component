import { Base, IBaseProps, IBaseState } from '../main';

export interface IDetectorProps extends Partial<IBaseProps> {
  render: (state: IBaseState) => JSX.Element;
}

export class Detector extends Base<IDetectorProps> {
  render() {
    return this.props.render!({ online: this.state.online });
  }
}