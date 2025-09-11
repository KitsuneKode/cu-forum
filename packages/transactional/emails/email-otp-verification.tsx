import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface OTPVerificationEmailProps {
  otp?: string
  companyName?: string
  expiryMinutes?: number
}

export const OTPVerificationEmail = ({
  otp = '123456',
  companyName = 'SecureApp',
  expiryMinutes = 10,
}: OTPVerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your verification code: {otp}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={companyHeader}>
            <div style={logoContainer}>
              <div style={logoPlaceholder}></div>
              <Heading style={companyNameStyle}>{companyName}</Heading>
            </div>
            <div style={headerDot}></div>
          </Section>

          <Section style={header}>
            <Heading style={h1}>Verification Code</Heading>
            <Text style={subtitle}>Hi, here's your secure verification code</Text>
          </Section>

          <Section style={otpSection}>
            <div style={otpContainer}>
              <Text style={otpStyle}>{otp}</Text>
            </div>
            <Text style={description}>Code expires in {expiryMinutes} minutes</Text>
          </Section>

          <Section style={securitySection}>
            <div style={securityBox}>
              <Text style={securityTitle}>🔒 This code was sent to verify your identity</Text>
              <Text style={securitySubtext}>Never share this code with anyone</Text>
            </div>
            <Text style={footerText}>Secured by {companyName}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default OTPVerificationEmail

const main = {
  backgroundColor: '#111827',
  fontFamily: "'Space Grotesk', system-ui, -apple-system, sans-serif",
  color: '#ffffff',
  padding: '16px',
}

const container = {
  margin: '0 auto',
  padding: '32px',
  maxWidth: '448px',
  backgroundColor: '#1f2937',
  borderRadius: '16px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(75, 85, 99, 0.3)',
  border: '1px solid rgba(75, 85, 99, 0.3)',
}

const companyHeader = {
  textAlign: 'center' as const,
  marginBottom: '32px',
  borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
  paddingBottom: '24px',
}

const logoContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  marginBottom: '16px',
}

const logoPlaceholder = {
  width: '32px',
  height: '32px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  display: 'inline-block',
}

const companyNameStyle = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0',
  display: 'inline-block',
}

const headerDot = {
  width: '8px',
  height: '8px',
  backgroundColor: '#9ca3af',
  borderRadius: '50%',
  margin: '0 auto',
}

const header = {
  textAlign: 'center' as const,
  marginBottom: '32px',
}

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '500',
  margin: '0 0 12px 0',
  lineHeight: '1.2',
}

const subtitle = {
  color: '#d1d5db',
  fontSize: '14px',
  margin: '0',
  fontWeight: '400',
}

const otpSection = {
  textAlign: 'center' as const,
  marginBottom: '32px',
}

const otpContainer = {
  backgroundColor: 'rgba(17, 24, 39, 0.5)',
  borderRadius: '12px',
  padding: '24px',
  margin: '0 auto 16px auto',
  border: '1px solid rgba(107, 114, 128, 0.3)',
  boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  display: 'inline-block',
}

const otpStyle = {
  color: '#ffffff',
  fontSize: '36px',
  fontWeight: '700',
  fontFamily: 'monospace',
  margin: '0',
  letterSpacing: '0.5em',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
}

const description = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '0',
  fontWeight: '400',
}

const securitySection = {
  textAlign: 'center' as const,
  borderTop: '1px solid rgba(75, 85, 99, 0.3)',
  paddingTop: '24px',
}

const securityBox = {
  backgroundColor: 'rgba(17, 24, 39, 0.3)',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '16px',
  border: '1px solid rgba(75, 85, 99, 0.3)',
  boxShadow: 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)',
}

const securityTitle = {
  color: '#d1d5db',
  fontSize: '12px',
  margin: '0 0 8px 0',
  fontWeight: '400',
}

const securitySubtext = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '0',
  fontWeight: '400',
}

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  margin: '0',
  fontWeight: '500',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
}
