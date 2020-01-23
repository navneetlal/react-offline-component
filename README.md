[![GitHub license](https://img.shields.io/github/license/navneetlal/react-offline-component?style=for-the-badge&logo=appveyor)](https://github.com/navneetlal/react-offline-component/blob/master/LICENSE)

# React offline component

Simple react component that enables you to render content based on net connectivity (i.e. Online | Offline)

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