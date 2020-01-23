import { Component, isValidElement, createElement, Children, ElementType } from 'react';

const inBrowser = typeof navigator !== "undefined";

// these browsers don't fully support navigator.onLine, so we need to use a polling backup
const unsupportedUserAgentsPattern = /Windows.*Chrome|Windows.*Firefox|Linux.*Chrome/;

export interface IPooling {
  enabled: boolean
  url: string
  timeout: number
  interval: number
}

const ping = ({ url, timeout }: Omit<IPooling, 'interval' | 'enabled'>) => {
  return new Promise(resolve => {
    const isOnline = () => resolve(true);
    const isOffline = () => resolve(false);

    const xhr = new XMLHttpRequest();

    xhr.onerror = isOffline;
    xhr.ontimeout = isOffline;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.HEADERS_RECEIVED) {
        if (xhr.status) {
          isOnline();
        } else {
          isOffline();
        }
      }
    };

    xhr.open("HEAD", url);
    xhr.timeout = timeout;
    xhr.send();
  });
};


const defaultPollingConfig = {
  enabled: inBrowser && unsupportedUserAgentsPattern.test(navigator.userAgent),
  url: "https://api.myip.com",
  timeout: 5000,
  interval: 5000
};

export interface IBaseProps {
  onChange: (online: boolean) => void
  polling: Partial<IPooling> | boolean
  wrapperType: ElementType
}

export interface IBaseState {
  online: boolean
}

export class Base<T extends Partial<IBaseProps>> extends Component<T, IBaseState> {

  public pollingId?: number;

  constructor(props: T) {
    super(props)
    this.state = {
      online:
        inBrowser && typeof navigator.onLine === "boolean"
          ? navigator.onLine : true
    }
  }

  public componentDidMount() {
    window.addEventListener("online", this.goOnline);
    window.addEventListener("offline", this.goOffline);

    if (this.getPollingConfig().enabled) {
      this.startPolling();
    }
  }

  public componentWillUnmount() {
    window.removeEventListener("online", this.goOnline);
    window.removeEventListener("offline", this.goOffline);

    if (this.pollingId) {
      this.stopPolling();
    }
  }

  public renderChildren() {
    const { children } = this.props;
    const wrapperType: ElementType = typeof this.props.wrapperType === "undefined"
      ? "span"
      : this.props.wrapperType as ElementType;

    // usual case: one child that is a react Element
    if (isValidElement(children)) {
      return children;
    }

    // no children
    if (!children) {
      return null;
    }

    // string children, multiple children, or something else
    return createElement(wrapperType, {}, ...Children.toArray(children));
  }

  public getPollingConfig() {
    const polling = typeof this.props.polling === "undefined" ? true : this.props.polling
    switch (polling) {
      case true:
        return defaultPollingConfig;
      case false:
        return { ...defaultPollingConfig, enabled: false };
      default:
        return Object.assign({}, defaultPollingConfig, polling);
    }
  }

  public goOnline() {
    if (!this.state.online) {
      this.callOnChangeHandler(true);
      this.setState({ online: true });
    }
  }

  public goOffline() {
    if (this.state.online) {
      this.callOnChangeHandler(false);
      this.setState({ online: false });
    }
  }

  public callOnChangeHandler(online: boolean) {
    if (this.props.onChange) {
      this.props.onChange(online);
    }
  }

  public startPolling() {
    const { interval } = this.getPollingConfig();
    this.pollingId = setInterval(() => {
      const { url, timeout } = this.getPollingConfig();
      ping({ url, timeout }).then(online => {
        online ? this.goOnline() : this.goOffline();
      });
    }, interval) as any;
  }

  public stopPolling() {
    clearInterval(this.pollingId);
  }

}
