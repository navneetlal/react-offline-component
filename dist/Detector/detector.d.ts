/// <reference types="react" />
import { Base, IBaseProps, IBaseState } from '../main';
export interface IDetectorProps extends Partial<IBaseProps> {
    render: (state: IBaseState) => JSX.Element;
}
export declare class Detector extends Base<IDetectorProps> {
    constructor(props: IDetectorProps);
    render(): JSX.Element;
}
