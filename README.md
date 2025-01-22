# vue-toggle-switch

A simple toggle switch component for Vue 3.

## Installation

You can install this component via npm or yarn:

```bash
npm install vue-toggle-switch
```

## Usage

Import and use the component in your Vue project (using Vue3 Composition API here):

```javascript
import VueToggleSwitch from 'vue-toggle-switch'
import { ref } from 'vue'

const switchState = ref(false)
```
```html
<vue-toggle-switch v-model="switchState"></vue-toggle-switch>
```
^ Make sure to pass an initial value from the parent component to the switch with `v-model`. the switch will update the value via two-way data binding.

## Props

Your component will look like this by default:

(/img/default-off.png)\
(/img/default-on.png)

But, by using props...
```javascript
import VueToggleSwitch from 'vue-toggle-switch' 

// these are the available props, along with the values they accept
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

![screenshot of component with props](/img/props-off.png)\
![screenshot of component with props](/img/props-on.png)
