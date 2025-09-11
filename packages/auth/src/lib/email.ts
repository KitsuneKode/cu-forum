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

export const sendVerificationCompleteEmail = (to: string) => {
  return resend.emails.send({
    from: 'CU-Forum <onboarding@kitsunelabs.xyz>',
    to: [to],
    subject: 'Verify your email for CU-Forum',
    html: '<h1>Verify your email for CU-Forum</h1><p>Thank you for verifying your email. You can now login to your account.</p>',
  })
}
