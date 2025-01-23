<script setup>
import { reactive, computed } from 'vue'
import './vue-toggle-switch.css'

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
    textOutside: {
        type: Boolean,
        default: false,
    },
    dropShadow: {
        type: String,
        // default: 'lightgray',
    },
})

const styleVars = computed(() => {
    return {
        wrapper: {
            width: props.textOutside
                ? `${props.width * 2}px`
                : `${props.width}px`,
        },
        text: {
            fontSize: `${props.textSize}px`,
        },
        element: {
            backgroundColor: props.bgColor,
            width: `${props.width}px`,
            height: `${props.height}px`,
            color: props.textColor,
            border: props.borderColor 
                ? `1px solid ${props.borderColor}`
                : 'none',
            borderRadius: `${props.borderRadius}px`,
            boxShadow: props.dropShadow
                ? `0px 2px 3px -1px ${props.dropShadow}`
                : 'none'
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

const textOutsideClass = computed(() => props.textOutside ? 'outside' : '')

const switchState = reactive({
    state: props.modelValue,
    mouseIsDown: false,
    lastClick: null,
    
    // the following have defaults and get reset every mouseup
    mouseDownX: null,
    mouseDownTime: null,
    clientX: null,
    leftBound: null,
    rightBound: null,
    posX: null,
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
    switchState.lastClick = new Date()
    if (isClick) setDefaultSwitchProps()
}
function captureClick(e) {
    e.stopPropagation()
    window.removeEventListener('click', captureClick, true)
}
function handleMousedown(e) {
    const now = new Date()
    switchState.mouseDownTime = now
    if (switchState.lastClick && now - switchState.lastClick < 300) return

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
    window.addEventListener('touchmove', handleTouchmove)
    window.addEventListener('touchend', handleTouchend)
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
    window.removeEventListener('touchmove', handleTouchmove)
    window.removeEventListener('touchend', handleTouchend)
}
function handleTouchstart(e) {
    const touch = e.touches[0]
        handleMousedown({
            clientX: touch.clientX,
            target: e.target,
        })
}
function handleTouchmove(e) {
    const touch = e.touches[0]
    handleMousemove({
        clientX: touch.clientX,
    })
}
function handleTouchend(e) {
    handleMouseup({
        clientX: switchState.clientX, // Use the last known position
    })
}

</script>

<template>
    <div class="vue-toggle-switch-wrapper" :style="styleVars.wrapper">
        <div @click="updateSwitch(true)" class="vue-toggle-switch-el" :style="styleVars.element">
            <div class="vue-toggle-switch-handle" :style="styleVars.handle"
                @mousedown="handleMousedown"
                @touchstart="handleTouchstart" 
            ></div>
        </div>
        <div :class="`vue-toggle-switch-text ${textOutsideClass}`" :style="styleVars.text">{{ states[0] }}</div>
        <div :class="`vue-toggle-switch-text ${textOutsideClass}`" :style="styleVars.text">{{ states[1] }}</div>
    </div>
</template>

<style>
.vue-toggle-switch-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.vue-toggle-switch-text {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
    pointer-events: none;
}
.vue-toggle-switch-text:nth-of-type(2) {
    left: 0;
}
.vue-toggle-switch-text:nth-of-type(3) {
    right: 0;
}
.vue-toggle-switch-text.outside {
    width: 25%;
}
.vue-toggle-switch-el {
    font-family: inherit;
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    cursor: pointer;
    user-select: none;
}
.vue-toggle-switch-handle {
    position: absolute;
    width: 50%;
}
@media (hover:hover) {
    .vue-toggle-switch-handle:hover {
        filter: brightness(.9);
        cursor: pointer;
    }
    .vue-toggle-switch-handle:active {
        cursor: grabbing;
    }
}
</style>