<h1 align="center">React offline component</h1>
<p align="center">
  Simple react component that enables you to render content based on net connectivity (i.e. Online | Offline)
</p>

<p align="center">
  <a href="https://github.com/navneetlal/react-offline-component/blob/master/LICENSE">
    <img alt="GitHub license" src="https://img.shields.io/github/license/navneetlal/react-offline-component">
  </a>
  <a href="https://github.com/navneetlal/react-offline-component/issues">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/navneetlal/react-offline-component">
  </a>
  <img alt="GitHub release (latest SemVer)" src="https://img.shields.io/github/v/release/navneetlal/react-offline-component">
  <a href="https://www.npmjs.com/package/react-offline-component">
    <img alt="npm" src="https://img.shields.io/npm/v/react-offline-component?color=blue">
  </a>
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/react-offline-component">
</p>

### Installing

```bash
$ npm install react-offline-component --save
```

### Basic usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Online, Offline } from 'react-offline-component';

const MainComponent = () => {
  return (
    <React.Fragment>
      <Online>Hey! You are online</Online>
      <Offline>You're offline. Check your connection!</Offline>
    </React.Fragment>
  )
}

ReactDOM.render(<MainComponent />, document.getElementById('root'));
```

Both `Online` as well as `Offline` are conditional components. So, you won't be seeing any online or offline component unless you are in that state.

### License
Published under the [MIT License](https://github.com/navneetlal/react-offline-component/blob/master/LICENSE).