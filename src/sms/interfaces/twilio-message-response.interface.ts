export interface TwilioMessageResponse {
  sid: string;
  status: string;
  to: string;
  from: string | null;
  body: string;
  dateCreated: Date;
  errorCode: number | null;
  errorMessage: string | null;
  accountSid?: string;
  messagingServiceSid?: string | null;
  numSegments?: string;
  price?: string | null;
  priceUnit?: string | null;
  apiVersion?: string;
  direction?: string;
  uri?: string;
}

export interface TwilioResponseMapper {
  mapToSmsResponse(
    twilioResponse: TwilioMessageResponse,
    fallbackFromNumber: string,
  ): {
    sid: string;
    status: string;
    to: string;
    from: string;
    body: string;
    dateCreated: Date;
    errorCode?: string;
    errorMessage?: string;
  };
}
