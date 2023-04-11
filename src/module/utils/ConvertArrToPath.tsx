export function handleConvertArrToPath(arr: Array<string>) {
  let finalPath = "";
  arr.reverse().forEach((item) => {
    finalPath = `${finalPath}/${item}`;
  });
  return finalPath;
}
