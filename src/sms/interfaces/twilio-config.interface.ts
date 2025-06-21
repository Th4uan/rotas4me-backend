export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  fromNumber: string;
}

export interface SmsMessage {
  to: string;
  body: string;
}

export interface SmsResponse {
  sid: string;
  status: string;
  to: string;
  from: string;
  body: string;
  dateCreated: Date;
  errorCode?: string;
  errorMessage?: string;
}

export interface EmergencyNotificationData {
  userName: string;
  userLocation?: {
    lat: number;
    lng: number;
    address?: string;
  };
  emergencyType?: string;
  timestamp: Date;
}
