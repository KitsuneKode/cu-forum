import { OTPVerificationEmail } from '@cu-forum/transactional/otpVerification'
import { RESEND_API_KEY } from './config'
import { Resend } from 'resend'

const resend = new Resend(RESEND_API_KEY)

export const sendEmail = (to: string, otp: string) => {
  return resend.emails.send({
    from: 'CU-Forum <onboarding@kitsunelabs.xyz>',
    to: [to],
    subject: 'Verify your email for CU-Forum',
    react: OTPVerificationEmail({
      otp,
      companyName: 'CU-Forum',
      expiryMinutes: 10,
    }),
  })
}
