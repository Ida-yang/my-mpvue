Component({
    behaviors: ['wx://form-field'],

    externalClasses: ['i-class','i-input-class'],

    properties: {
        title: {
            type: String
        },
        request: {
            type: Boolean,
            value: false
        },
        // text || textarea || password || number
        type: {
            type: String,
            value: 'text'
        },
        disabled: {
            type: Boolean,
            value: false
        },
        placeholder: {
            type: String,
            value: ''
        },
        autofocus: {
            type: Boolean,
            value: false
        },
        mode: {
            type: String,
            value: 'normal'
        },
        right: {
            type: Boolean,
            value: false
        },
        error: {
            type: Boolean,
            value: false
        },
        maxlength: {
            type: Number,
            value: -1
        },
    },

    methods: {
        handleInputChange(event) {
            const { detail } = event;
            const { value } = detail;
            this.setData({ value });

            this.triggerEvent('input', value);
        },

        handleInputFocus(event) {
            this.triggerEvent('focus', event);
        },

        handleInputBlur(event) {
            this.triggerEvent('blur', event);
        }
    }
});
