"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const inBrowser = typeof navigator !== "undefined";
// these browsers don't fully support navigator.onLine, so we need to use a polling backup
const unsupportedUserAgentsPattern = /Windows.*Chrome|Windows.*Firefox|Linux.*Chrome/;
const ping = ({ url, timeout }) => {
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
                }
                else {
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
    url: "https://ipv4.icanhazip.com/",
    timeout: 5000,
    interval: 5000
};
class Base extends react_1.Component {
    constructor() {
        super(...arguments);
        // constructor(props: T) {
        // super(props)
        this.state = {
            online: inBrowser && typeof navigator.onLine === "boolean"
                ? navigator.onLine : true
        };
    }
    // }
    componentDidMount() {
        window.addEventListener("online", this.goOnline);
        window.addEventListener("offline", this.goOffline);
        if (this.getPollingConfig().enabled) {
            this.startPolling();
        }
    }
    componentWillUnmount() {
        window.removeEventListener("online", this.goOnline);
        window.removeEventListener("offline", this.goOffline);
        if (this.pollingId) {
            this.stopPolling();
        }
    }
    renderChildren() {
        const { children } = this.props;
        const wrapperType = typeof this.props.wrapperType === "undefined"
            ? "span"
            : this.props.wrapperType;
        // usual case: one child that is a react Element
        if (react_1.isValidElement(children)) {
            return children;
        }
        // no children
        if (!children) {
            return null;
        }
        // string children, multiple children, or something else
        return react_1.createElement(wrapperType, {}, ...react_1.Children.toArray(children));
    }
    getPollingConfig() {
        const polling = typeof this.props.polling === "undefined" ? true : this.props.polling;
        switch (polling) {
            case true:
                return defaultPollingConfig;
            case false:
                return Object.assign(Object.assign({}, defaultPollingConfig), { enabled: false });
            default:
                return Object.assign({}, defaultPollingConfig, polling);
        }
    }
    goOnline() {
        if (!this.state.online) {
            this.callOnChangeHandler(true);
            this.setState({ online: true });
        }
    }
    goOffline() {
        if (this.state.online) {
            this.callOnChangeHandler(false);
            this.setState({ online: false });
        }
    }
    callOnChangeHandler(online) {
        if (this.props.onChange) {
            this.props.onChange(online);
        }
    }
    startPolling() {
        const { interval } = this.getPollingConfig();
        this.pollingId = setInterval(() => {
            const { url, timeout } = this.getPollingConfig();
            ping({ url, timeout }).then(online => {
                online ? this.goOnline() : this.goOffline();
            });
        }, interval);
    }
    stopPolling() {
        clearInterval(this.pollingId);
    }
}
exports.Base = Base;
