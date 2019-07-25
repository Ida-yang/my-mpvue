Component({
    externalClasses: ['i-class'],

    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        value: {
            type: String,
            value: '',
        },
    },
    data: {
        // 这里是一些组件内部数据
        multiArray: [
            ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039', '2040', '2041', '2042', '2043', '2044', '2045', '2046', '2047', '2048', '2049', '2050', '2051', '2052', '2053', '2054', '2055', '2056', '2057', '2058', '2059'], 
            ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'], 
            ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
            ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
            ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
        ],
        
        multiIndex: [0, 0, 0, 0, 0],
    },
    methods: {
        // 这里是一个自定义方法
        handleTap(){
            if(this.data.value){
                return
            }else{
                let date = new Date()
                let year= date.getFullYear()
                let month = date.getMonth() + 1
                let day = date.getDate()
                let hour = date.getHours()
                let minute = date.getMinutes()

                let multiArray = this.data.multiArray
                let multiIndex = this.data.multiIndex
                multiArray[0].forEach((a,i) => {
                    if(a == year){
                        multiIndex[0] = i
                    }
                });
                multiArray[1].forEach((b,j) => {
                    if(b == month){
                        multiIndex[1] = j
                    }
                });
                multiArray[2].forEach((c,k) => {
                    if(c == day){
                        multiIndex[2] = k
                    }
                });
                multiArray[3].forEach((d,l) => {
                    if(d == hour){
                        multiIndex[3] = l
                    }
                });
                multiArray[4].forEach((e,m) => {
                    if(e == minute){
                        multiIndex[4] = m
                    }
                });
                this.bindMultiPickerColumnChange({detail:{column:1,value:multiIndex[1]}})
            }
        },
        bindMultiPickerChange (e) {
            this.setData({
                multiIndex: e.detail.value
            })
            this.changeDataTime()
        },
        changeDataTime(){
            let datetimevalue = this.data.multiArray[0][this.data.multiIndex[0]] + '-' + this.data.multiArray[1][this.data.multiIndex[1]] + '-' + this.data.multiArray[2][this.data.multiIndex[2]] + ' ' + this.data.multiArray[3][this.data.multiIndex[3]] + ':' + this.data.multiArray[4][this.data.multiIndex[4]]
            this.setData({
                value: datetimevalue
            })
            this.triggerEvent('change', datetimevalue);
        },
        bindMultiPickerColumnChange (e) {
            var data = {
                multiArray: this.data.multiArray,
                multiIndex: this.data.multiIndex
            };
            data.multiIndex[e.detail.column] = e.detail.value;
            switch (e.detail.column) {
            case 1:
                switch (data.multiIndex[0]) {
                    case 1:
                    case 5:
                    case 9:
                    case 13:
                    case 17:
                    case 21:
                    case 25:
                    case 29:
                    case 33:
                    case 37:
                    case 41:
                    case 45:
                        switch(data.multiIndex[1]){
                            case 1:
                                data.multiArray[2] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29']
                                break;
                            case 3:
                            case 5:
                            case 8:
                            case 10:
                                data.multiArray[2] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
                                break;
                            default:
                                data.multiArray[2] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
                                break;
                        }
                        break;
                    default:
                        switch(data.multiIndex[1]){
                            case 1:
                                data.multiArray[2] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28']
                                break;
                            case 3:
                            case 5:
                            case 8:
                            case 10:
                                data.multiArray[2] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
                                break;
                            default:
                                data.multiArray[2] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
                                break;
                        }
                        break;
                }
                break;
            }
            this.setData(data);
        },
    }
})