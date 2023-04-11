export const maxLengthMessage = (field: string, max: number) => {
  return `${field} không vượt quá ${max} ký tự`;
};
export const minLengthMessage = (field: string, min: number) => {
  return `${field} không ít hơn ${min} ký tự`;
};
export const requiredMessage = (field: string) => {
  return `Dữ liệu ${field} là bắt buộc`;
};
export const maxMessage = (field: string, max: number) => {
  return `Giá trị ${field} không vượt quá ${max}`;
};
export const minMessage = (field: string, min: number) => {
  return `Giá trị ${field} không nhỏ hơn ${min}`;
};
export const patternMessage = (field: string, pattern: string) => {
  return `${field} yêu cầu ${pattern}`;
};
