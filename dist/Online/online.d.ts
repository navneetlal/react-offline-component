import { Base, IBaseProps } from '../main';
import { ReactChild } from 'react';
export interface IOnlineProps extends Partial<IBaseProps> {
    children: ReactChild | undefined;
}
export declare class Online extends Base<IOnlineProps> {
    render(): import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)> | null;
}
