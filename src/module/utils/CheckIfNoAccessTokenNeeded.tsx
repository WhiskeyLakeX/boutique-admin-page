export function checkIfNoAccessTokenNeeded(req: string) {
  const acceptedList = ["login", "register"];
  return acceptedList.indexOf(req) > -1;
}
