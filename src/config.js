//配置项

const defaulthost = 'https://crm.yunzoe.com/yzcrm/'
const sourcehost = 'http://crm.yunzoe.com/'
const SESSIONID = ''
// const SESSIONID = 'JSESSIONID=2DC80CC7DF41F50E8E5E9352762C49D9'
const rememberMe = ''
const account = ''
const cipher = ''
const userData = {
    cId:201901973891,
    imgUrl:"34d21231-7ec6-461d-9445-647ac98a81e1.png",
    name:"用户y",
    pId:105,
    private_deptid:2,
    roleid:78,
    second_id:61,
    corporate_name:'广州云纵互联网技术有限公司',
    private_phone:'18312120303',
    role_name:'客户经理',
    portrait:'https://crm.yunzoe.com/upload/201901973891/34d21231-7ec6-461d-9445-647ac98a81e1.png'
}
const information = {
    clueupdateData: '',
    clueDetailData: '',
    cluePoolDetailData: '',

    customerupdateData: '',
    customerDetailData: '',
    customerPoolDetailData: '',

    contactupdateData: '',
    contactPoolNameData: '',
    contactDetailData: '',

    opportunityupdateData: '',
    opportunityPoolNameData: '',
    opportunityDetailData: '',
    failReason:'',

    agreementupdateData: '',
    agreementDetailData: '',
    agreementPoolNameData: '',
    followDetailData: '',

    payplanData: '',
    payinfoData: '',
    payCollectionDetailData: '',

    outworkupdateData:'',
    outworkDetailData:'',
    outworkPoolName:'',
    outworkAssistants:'',

    taskupdateData:'',
    taskDetailData:'',
    taskPoolName:'',
    
    noteupdateData:'',
    noteDetailData:'',

    orderupdateData:'',
    orderDetailData:'',
    orderPoolNameData:'',
    orderProductData:'',
}

const config = {
    defaulthost,
    sourcehost,
    SESSIONID,
    rememberMe,
    account,
    cipher,
    userData,
    information
}

export default config