export default function generateSixDigitOtp() {
  let otp = "";

  while (otp.length < 6) {
    otp += Math.round(Math.random() * 10);
  }

  return otp;
}
