import { getHeapStatistics } from 'v8';

/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */

const SMSClient = require('./lib')

// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIKDwBQdgxLLHV'
const secretAccessKey = 'C2ekNg9qGFl8VOlyrJSUvm2RPIbdCl'

//在云通信页面开通相应业务消息后，就能在页面上获得对应的queueName,不用填最后面一段
const queueName = 'Alicom-Queue-1092397003988387-'

//初始化sms_client
let smsClient = new SMSClient({ accessKeyId, secretAccessKey })

class AliYunSMS {
    constructor(phone) {
        this.phone = phone;
        this.init();
    }
    init() {
        //短信回执报告
        smsClient.receiveMsg(0, queueName).then(function(res) {
            //消息体需要base64解码
            let { code, body } = res
            if (code === 200) {
                //处理消息体,messagebody
                console.log(body)
            }
        }, function(err) {
            console.log(err)
        })

        //短信上行报告
        smsClient.receiveMsg(1, queueName).then(function(res) {
            //消息体需要base64解码
            let { code, body } = res
            if (code === 200) {
                //处理消息体,messagebody
                console.log(body)
            }
        }, function(err) {
            console.log(err)
        })


        //查询短信发送详情
        smsClient.queryDetail({
            PhoneNumber: this.phone,
            SendDate: '20181030', // moment.js
            PageSize: '10',
            CurrentPage: "1"
        }).then(function(res) {
            let { Code, SmsSendDetailDTOs } = res
            if (Code === 'OK') {
                //处理发送详情内容
                console.log(SmsSendDetailDTOs)
            }
        }, function(err) {
            //处理错误
            console.log(err)
        })

        //发送短信
        let yzm = Math.random().toString(16).slice(2, 6).toUpperCase()
        smsClient.sendSMS({
            PhoneNumbers: this.phone,
            SignName: '亚光互联',
            TemplateCode: 'SMS_149416304',
            TemplateParam: `{"code":"${yzm}","product":"aaa"}`
        }).then(function(res) {

            let { Code } = res
            if (Code === 'OK') {
                //处理返回参数
                console.log(res)
            }
        }, function(err) {
            console.log(err)
        })
    }
}

export default AliYunSMS