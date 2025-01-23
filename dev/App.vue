<script setup>
import VueToggleSwitch from '../src/VueToggleSwitch.vue';
import { ref } from 'vue'

const switch1State = ref(false)
const switch2State = ref(false)
const switch3State = ref(false)

const switch1Props = {
}
const switch2Props = {
        states: ['one', 'two'],  // Array ([String, String])
        bgColor: 'white',  // String
        textColor: '#222222',  // String
        switchOnColor: 'rgb(107, 166, 255)',  // String
        switchOffColor: 'pink',  // String
        width: 150,  // Number
        height: 40,  // Number
        padding: 3,  // Number
        borderColor: 'black',  // String
        textSize: 18,  // Number
        textColor: '#222222',  // String
        borderRadius: 5,  // Number
        dropShadow: 'black'  // String
    }
const switch3Props = {
    width: 50,  // Number
    textOutside: true,  // Boolean
}

</script>

<template>
    <h1>VueToggleSwitch</h1>
    <h2>@zkramer22</h2>
    <h4>a Vue3 toggle switch that you can 
        <br>
        * click *
        <br>
        OR 
        <br>
        ~ grab & drag ~
    </h4>

    <div class="label">default switch:</div>
    <VueToggleSwitch v-model="switch1State" v-bind="switch1Props"/>
    <div class="spacer"></div>

    <div class="label">using props:</div>
    <VueToggleSwitch v-model="switch2State" v-bind="switch2Props"/>

    <div class="spacer"></div>

    <div class="label">textOutside:</div>
    <VueToggleSwitch v-model="switch3State" v-bind="switch3Props"/>

</template>

<style>
html, body {
    height: 100%;
    background-color: rgb(255, 252, 244);
}
#app {
    font-family: monospace;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}
h1 {
    margin: 0 0 5px;
}
h2 {
    margin: 5px 0 15px;
}
h4 {
    margin: 0 0 30px;
    text-align: center;
    line-height: 2;
}
.label {
    font-size: 12px;
    margin-bottom: 10px;
}
code {
    font-size: 12px;
}
.flex {
    display: flex;
    align-items: center;
}
.spacer {
    height: 25px;
}
</style>