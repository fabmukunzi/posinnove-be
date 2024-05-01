import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const VerificationEmail = ({ userFirstname, verificationLink }) => (
  <Html>
    <Head />
    <Preview>
      Verify your email address for Posinnove Tech Solutions e-learning platform
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/static/posinnove-logo.png`}
          width="170"
          height="50"
          alt="Posinnove Tech Solutions"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Welcome to Posinnove Tech Solutions e-learning platform! Before you can access all the amazing features and courses, please verify your email address by clicking the button below.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={verificationLink}>
            Verify Email
          </Button>
        </Section>
        <Text style={paragraph}>
          Thank you for joining us!
          <br />
          The Posinnove Tech Solutions Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Posinnove Tech Solutions | Address, City
        </Text>
      </Container>
    </Body>
  </Html>
);

VerificationEmail.PreviewProps = {
  userFirstname: '',
  verificationLink: 'https://posinnove.com//verify-email',
};

export default VerificationEmail;

const main = {
  backgroundColor: '#f5f5f5',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#444444',
};

const btnContainer = {
  textAlign: 'center',
};

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#ffffff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  padding: '12px',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#777777',
  fontSize: '12px',
};