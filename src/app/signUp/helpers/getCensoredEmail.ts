export default function getCensoredEmail(email: string) {
  const [userName, mailProvider] = email.split("@");

  if (!userName || !mailProvider) {
    return "Invalid email";
  }

  let censoredUserName = userName.slice(0, 2);
  while (censoredUserName.length < userName.length) {
    censoredUserName += "*";
  }

  return censoredUserName + "@" + mailProvider;
}
