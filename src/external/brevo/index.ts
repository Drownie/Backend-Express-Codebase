import { setting } from '../../config';
import {RequestApiService} from "../request_api";

export class BrevoService {
    private static _BrevoService: _BrevoService;

    static getService() {
        if (this._BrevoService == null) {
            this._BrevoService = new _BrevoService();
        }

        return this._BrevoService;
    }
}

class _BrevoService {
    async sendEmailVerificationCode(recipientEmail: string, verificationCode: number) {
        try {
            let payload = JSON.stringify({
                sender: {
                    name: 'noreply mamon',
                    email: 'noreply@mamon.xyz'
                },
                to: [
                    {
                        name: 'Mamon user',
                        email: recipientEmail
                    }
                ],
                subject: "Mamon Email Verification",
                htmlContent: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"><div style="margin:50px auto;width:70%;padding:20px 0"><p style="font-size:1.1em">Hi ${recipientEmail},</p><p>Thank you for choosing our brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p><h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${verificationCode}</h2><p style="font-size:0.9em;">Regards,<br />M8T</p><hr style="border:none;border-top:1px solid #eee" /><div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"><p>M8T Inc</p><p>1600 Amphitheatre Parkway</p><p>California</p></div></div></div>`
            });

            let header = {
                'accept': 'application/json',
                'api-key': setting.brevoAPIKey,
                'content-type': 'application/json'
            }
            let brevoUrl = 'https://api.brevo.com/v3/smtp/email';
            await RequestApiService.getService().post(brevoUrl, header, payload);
            return;
        } catch (err) {
            throw err;
        }
    }
}