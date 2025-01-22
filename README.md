# vue-toggle-switch

A simple toggle switch component for Vue 3.

## Installation

You can install this component via npm or yarn:

```bash
npm install vue-toggle-switch
```

## Usage

Import and use the component in your Vue project:

```javascript
import VueToggleSwitch from 'vue-toggle-switch'

export default {
    components: {
        VueToggleSwitch
    }
}
```
```html
<vue-toggle-switch></vue-toggle-switch>
```

## Props

Your component will look like this by default:
![screenshot of default component](/img/default-off.png)
![screenshot of default component](/img/default-on.png)

By using these props...
```javascript
import VueToggleSwitch from 'vue-toggle-switch'

const properties = {
    states: ['one', 'two'],  // [String, String]
    bgColor: 'white',  // String
    textColor: '#222222',  // String
    switchOnColor: 'rgb(107, 166, 255)',  // String
    switchOffColor: 'pink',  // String
    width: 150,  // Number (px)
    height: 40,  // Number (px)
    padding: 3,  // Number (px)
    borderColor: 'black',  // String
    textSize: 18,  // Number
    textColor: '#222222',  // String
    borderRadius: 5,  // Number
}
```
```html
<template>
    <vue-toggle-switch v-bind="properties"></vue-toggle-switch>
</template>
```

...You can change the appearance of the switch:
![screenshot of component with props](/img/props-off.png)
![screenshot of component with props](/img/props-on.png)
