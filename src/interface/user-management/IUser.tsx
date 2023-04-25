export default interface IUser {
  user_id?: number;
  address?: string;
  dob?: string;
  email?: string;
  fullname?: string;
  gender?: string;
  password?: string;
  phone_number?: string;
  username?: string;
  role_id?: number;
  enabled?: true;
  authorities?: [];
  accountNonExpired?: true;
  credentialsNonExpired?: true;
  accountNonLocked?: true;
}
export interface IAdminAccount {
  user_id?: number;
  address?: string;
  dob?: string;
  email?: string;
  fullname?: string;
  gender?: number;
  password?: string;
  phone_number?: string;
  username?: string;
  role_id?: number;
}
