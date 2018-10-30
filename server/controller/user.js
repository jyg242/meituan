import AliYunSMS from '../sdk'

class User {
    static async sendSMS(ctx, next) {
        let { phone } = ctx.request.body;

        new AliYunSMS(phone)
        ctx.body = { code: 123 }

    }

}

export default User;