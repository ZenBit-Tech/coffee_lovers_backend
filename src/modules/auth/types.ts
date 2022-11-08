export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface RequestUser {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}
