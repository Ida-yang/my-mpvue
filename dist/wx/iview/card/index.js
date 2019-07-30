Component({
    externalClasses: ['i-class'],

    options: {
        multipleSlots: true
    },

    properties: {
        full: {
            type: Boolean,
            value: false
        },
        thumb: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        extra: {
            type: String,
            value: ''
        },
        desc: {
            type: Boolean,
            value: false
        }
    },

    methods: {
        handleTap (e) {
            // console.log(e)
            if (!this.data.desc) return false;

            this.triggerEvent('click');
        },
    }
});
