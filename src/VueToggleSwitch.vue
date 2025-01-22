<script setup>
import { reactive, computed } from 'vue'
/////////////////////////// variables /////////////////////////////
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    states: {
        type: Array,
        default: () => ['OFF', 'ON'],
    },
    width: {
        type: Number,
        default: 100,
    },
    height: {
        type: Number,
        default: 20,
    },
    padding: {
        type: Number,
        default: 1,
    },
    borderColor: {
        type: String,
    },
    borderRadius: {
        type: Number,
        default: 30,
    },
    bgColor: {
        type: String,
        default: '#eeeeee',
    },
    switchOffColor: {
        type: String,
        default: 'lightgray',
    },
    switchOnColor: {
        type: String,
        default: 'lightgreen',
    },
    textColor: {
        type: String,
        default: '#222222',
    },
    textSize: {
        type: Number,
        default: 10,
    },
})

const styleVars = computed(() => {
    return {
        element: {
            backgroundColor: props.bgColor,
            width: `${props.width}px`,
            height: `${props.height}px`,
            color: props.textColor,
            border: props.borderColor 
                ? `1px solid ${props.borderColor}`
                : 'none',
            fontSize: `${props.textSize}px`,
            borderRadius: `${props.borderRadius}px`,
        },
        handle: {
            backgroundColor: switchState.state ? props.switchOnColor : props.switchOffColor,
            left: `${switchState.posX || 0}px`,
            transition: switchState.mouseIsDown 
                ? 'left 0s linear, background-color .4s linear' 
                : 'left .4s ease, background-color .4s linear',
            margin: `${props.padding}px`,
            height: `calc(100% - ${props.padding * 2}px)`,
            borderRadius: `${props.borderRadius}px`,
        },
    }
})

const switchState = reactive({
    mouseIsDown: false,
    mouseDownX: null,
    mouseDownTime: null,
    clientX: null,
    leftBound: null,
    rightBound: null,
    posX: null,
    state: props.modelValue,
    width: null,
})

const emit = defineEmits(['update:modelValue'])

////////////////////////// methods /////////////////////////////
function setDefaultSwitchProps() {
    switchState.mouseDownX = null
    switchState.mouseDownTime = null
    switchState.clientX = null
    switchState.leftBound = null
    switchState.rightBound = null
    switchState.posX = !switchState.state ? 0 : (props.width / 2) - (props.padding * 2)
}
function updateSwitch(isClick) {
    switchState.state = !switchState.state ? true : false
    emit('update:modelValue', switchState.state)
    if (isClick) setDefaultSwitchProps()
}
function captureClick(e) {
    e.stopPropagation()
    window.removeEventListener('click', captureClick, true)
}
function handleMousedown(e) {
    switchState.mouseDownTime = new Date()
    let { clientX } = e
    let { offsetWidth } = e.target
    if (!switchState.state) {
        switchState.leftBound = clientX
        switchState.rightBound = clientX + offsetWidth - 3
    }
    else {
        switchState.rightBound = clientX
        switchState.leftBound = clientX - offsetWidth + 3
    }
    switchState.mouseIsDown = true
    switchState.mouseDownX = clientX
    window.addEventListener('mousemove', handleMousemove)
    window.addEventListener('mouseup', handleMouseup)
}
function handleMousemove(e) {
    let { clientX } = e
    if (!switchState.clientX) {
        switchState.clientX = clientX
    }
    if (clientX > switchState.leftBound && clientX < switchState.rightBound) {
        switchState.posX = switchState.posX + (clientX - switchState.clientX)
        switchState.clientX = clientX
    }
}
function handleMouseup(e) {
    const { clientX } = e
    const timeElapsed = new Date() - switchState.mouseDownTime
    window.addEventListener('click', captureClick, true)
    if (timeElapsed > 150) {  // this is now a click and drag, so check if user drags past the midpoint
        const midpoint = (switchState.rightBound + switchState.leftBound) / 2 // midpoint of area listening to mousemove
        if (!switchState.state) {
            if (clientX >= midpoint) updateSwitch()
        }
        else {
            if (clientX <= midpoint) updateSwitch()
        }
    }
    else { 
        updateSwitch()  // treat as a click, no need to check positions or timing
    }
    setDefaultSwitchProps()
    switchState.mouseIsDown = false
    window.removeEventListener('mousemove', handleMousemove)
    window.removeEventListener('mouseup', handleMouseup)
}

</script>

<template>
    <div @click="updateSwitch(true)" class="switch-el" :style="styleVars.element">
        <div class="switch-handle" @mousedown="handleMousedown" :style="styleVars.handle"></div>
        <div class="switch-text">{{ states[0] }}</div>
        <div class="switch-text">{{ states[1] }}</div>
    </div>
</template>

<style scoped>
div > * {
    user-select: none;
}
.switch-el {
    font-family: inherit;
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    cursor: pointer;
}
.switch-handle {
    position: absolute;
    width: 50%;
}
@media (hover:hover) {
    .switch-handle:hover {
        filter: brightness(.9);
        cursor: pointer;
    }
    .switch-handle:active {
        cursor: grabbing;
    }
}
.switch-text {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    pointer-events: none;
}
</style>