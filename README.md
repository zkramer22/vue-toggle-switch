# vue-toggle-switch

A simple toggle switch component for Vue 3.

## Installation

You can install this component via npm or yarn:

```bash
npm install vue-toggle-switch
```

## Usage

Import the component and stylesheet for use in your Vue project:

```vue
<script setup>
    import { ref } from 'vue'
    import VueToggleSwitch from '@zkramer22/vue-toggle-switch'
    import '@zkramer22/vue-toggle-switch/dist/vue-toggle-switch.css'

    const switchState = ref(false)
</script>

<template>
    <vue-toggle-switch v-model="switchState"/>
</template>
```

^ Make sure to pass an initial value from the parent component to the switch with `v-model`. the switch will update the value via two-way data binding.


## Props

Your component will look like this by default:

<picture>
  <img alt="Image Alt Text" src="/img/default-off.png">
</picture>
<picture>
  <img alt="Image Alt Text" src="/img/default-on.png">
</picture>

But, by using props...

```vue
<script setup>
    import { ref } from 'vue'
    import VueToggleSwitch from '@zkramer22/vue-toggle-switch'
    import '@zkramer22/vue-toggle-switch/dist/vue-toggle-switch.css'

    const switchState = ref(false)

    const switchProps = {
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
        textOutside: true  // Boolean
        dropShadow: true  // Boolean
    }
</script>

<template>
    <vue-toggle-switch v-model="switchState" v-bind="switchProps"/>
</template>
```

...You can change the appearance of the switch!

<picture>
  <img alt="Image Alt Text" src="/img/props-off.png">
</picture>
<picture>
  <img alt="Image Alt Text" src="/img/props-on.png">
</picture>
