<template>
    <button
        :class="{
            disabled: isDisabled,
            warning: type === 'warning',
            attention: type === 'attention',
            validate: type === 'validate',
            'as-text': !asIcon,
            'as-icon': asIcon,
        }"
        :disabled="isDisabled"
    >
        <slot />
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        asIcon: {
            type: Boolean,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: null,
        },
    },
    computed: {
        isDisabled() {
            return this.disabled
        },
    },
}
</script>

<style scoped>
.as-text {
    min-width: 80px;
    min-height: 30px;
    border-radius: 8px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #42b983;
    box-shadow: -1px 2px 1px 0px #6b6b6b;
    outline: none;
    background-color: #fcfefd;
}
.as-icon {
    border-radius: 30px;
    border: #42b983 solid 1px;
    background-color: #fcfefd; /* TODO: white ? */
    height: 50px;
    width: 50px;
    padding: 1px 9px 1px 7px;
    margin-left: 5px;
    box-shadow: -1px 2px 1px 0px #6b6b6b;
    outline: none;
}

.disabled {
    background-color: grey; /* TODO: white ? */
}
.warning {
    background-color: #b94278;
    border-color: #fcfefd; /* TODO: white ? */
    color: #fcfefd; /* TODO: white ? */
}
.attention {
    background-color: #8342b9;
    border-color: #fcfefd; /* TODO: white ? */
    color: #fcfefd; /* TODO: white ? */
}
.validate {
    background-color: #78b942;
    border-color: #fcfefd; /* TODO: white ? */
    color: #fcfefd; /* TODO: white ? */
}
</style>
