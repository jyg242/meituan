import AliYunSMS from '../sdk'

class User {
    static async sendSMS(ctx, next) {
        let { phone } = ctx.request.body;
        let yzm = Math.random().toString(16).slice(2, 6).toUpperCase()
            // 发验证码时把验证码和当前时间+60s存入session
        ctx.session.phoneid = yzm
        ctx.session.timeid = new Date().getTime() + 60 * 1000
        new AliYunSMS(phone, yzm)

        ctx.body = { code: 123 }
        return yzm


    }

}

export default User;