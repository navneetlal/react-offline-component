import { Component, ElementType } from 'react';
export interface IPooling {
    enabled: boolean;
    url: string;
    timeout: number;
    interval: number;
}
export interface IBaseProps {
    onChange: (online: boolean) => void;
    polling: Partial<IPooling> | boolean;
    wrapperType: ElementType;
}
export interface IBaseState {
    online: boolean;
}
export declare class Base<T extends Partial<IBaseProps>> extends Component<T, IBaseState> {
    pollingId?: number;
    state: {
        online: boolean;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    renderChildren(): import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) | (new (props: any) => Component<any, any, any>)> | null;
    getPollingConfig(): {
        enabled: boolean;
        url: string;
        timeout: number;
        interval: number;
    };
    goOnline(): void;
    goOffline(): void;
    callOnChangeHandler(online: boolean): void;
    startPolling(): void;
    stopPolling(): void;
}
