<template>
    <div class="position-relative">
        <input
            data-dropdown="dropdown"
            :id="inputId"
            class="card-input card-input-date"
            type="text"
            @focus="toogleDropdown(true)"
            @keydown.tab="toogleDropdown(false)"
            :value="value"
            :disabled="disabled"
            @input="onInput"
        >
        <ul v-show="isOpen" class="dropdown">
            <li
                @click="$emit('input', item)"
                v-for="(item, key) in list"
                :key="key"
                :class="item === value ? 'active' : null"
            >
                {{item}}
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: {
        inputId: {
            type: String,
            required: true
        },
        value: {
            required: true
        },
        list: {
            type: Array,
            required: true
        },
        nextTab: {
            type: String
        }
    },
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        ...mapState(['disabled'])
    },
    mounted() {
        window.addEventListener('click', this.onClick)
    },
    destroyed() {
        window.removeEventListener('click', this.onClick)
    },
    methods: {
        onInput(event) {
            let value = event.target.value
            if (value.match(/\D/)) {
                value = value.match(/\d/) ? value.match(/\d+/g).join('') : ''
            }
            if (value.length > 2) {
                value = value.slice(0, 2)
            }
            if (value.length >= 2) {
                if (this.nextTab) {
                    document.getElementById(this.nextTab).focus()
                } else {
                    event.target.nextSibling.focus()
                }
                this.toogleDropdown(false)
            }
            event.target.value = value
            this.$emit('input', value)
        },
        toogleDropdown(value) {
            this.isOpen = value
        },
        onClick(event) {
            if (event.target.dataset.dropdown !== 'dropdown') {
                this.toogleDropdown(false)
            }
        }
    }
}
</script>