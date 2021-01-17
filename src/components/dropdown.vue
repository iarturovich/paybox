<template>
    <div class="position-relative">
        <input
            class="card-input card-input-date"
            type="text"
            @focus="toogleDropdown(true)"
            @keydown.tab.prevent="selectTab"
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
        value: {
            required: true
        },
        list: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            isOpen: false
        }
    },
    watch: {
        isOpen (newValue) {
            if (newValue) window.addEventListener('click', this.onClick)
            else window.removeEventListener('click', this.onClick)
        }
    },
    computed: {
        ...mapState(['disabled'])
    },
    methods: {
        selectTab () {
            const nodeList = document.querySelectorAll('input')
            const nextIndex = [...nodeList].findIndex(f => f === event.target) + 1
            nodeList.item(nextIndex).focus()
            nodeList.item(nextIndex).setSelectionRange(0, 0)
            this.toogleDropdown(false)
        },
        onInput (event) {
            let value = event.target.value
            if (value.match(/\D/)) {
                value = value.match(/\d/) ? value.match(/\d+/g).join('') : ''
            }
            if (value.length > 2) {
                value = value.slice(0, 2)
            }
            if (value.length === 2 && !this.list.includes(value)) {
                value = ''
            } else if (value.length === 2) {
                this.selectTab(event)
            }

            event.target.value = value
            this.$emit('input', value)
        },
        toogleDropdown (value) {
            this.isOpen = value
        },
        onClick (event) {
            if (this.$el.firstChild !== event.target) {
                this.toogleDropdown(false)
            }
        }
    }
}
</script>