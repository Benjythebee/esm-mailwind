/**
 * Credit: https://github.com/jakobo/codedrift/issues/103
 */

/**
 * Originally based on The MailChimp Reset from Fabio Carneiro, MailChimp User Experience Design
 * More info and templates on Github: https://github.com/mailchimp/Email-Blueprints
 * http://www.mailchimp.com &amp; http://www.fabio-carneiro.com
 * These styles are non-inline; they impact UI added by email clients
 * By line:
 * (1) Force Outlook to provide a "view in browser" message
 * (2) Force Hotmail to display emails at full width
 * (3) Force Hotmail to display normal line spacing
 * (4) Prevent WebKit and Windows mobile changing default text sizes
 * (5) Remove spacing between tables in Outlook 2007 and up
 * (6) Remove table borders on MSO 07+ http://www.campaignmonitor.com/blog/post/3392/1px-borders-padding-on-table-cells-in-outlook-07/
 * (7) Specify bicubic resampling for MSO on img objects
 * (8) Media Query block - Pretty phone numbers in email: http://www.campaignmonitor.com/blog/post/3571/using-phone-numbers-in-html-email
 * (9) Media Query block - same as above, but for tablet sized devices
 */
export const universalStyles = /*css*/ `
  #outlook a{ padding:0; }
  .ReadMsgBody{ width:100%; } .ExternalClass{ width:100%; }
  .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
  body, table, td, p, a, li, blockquote{ -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  table, td{ mso-table-lspace:0pt; mso-table-rspace:0pt; }
  table td {border-collapse: collapse;}
  img{-ms-interpolation-mode: bicubic;}
  @media only screen and (max-device-width: 480px) {
    a[href^="tel"],
    a[href^="sms"] {
      text-decoration: default !important;
      pointer-events: auto !important;
      cursor: default !important;
    }
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    a[href^="tel"],
    a[href^="sms"] {
      text-decoration: default !important;
      pointer-events: auto !important;
      cursor: default !important;
    }
  }
`;
