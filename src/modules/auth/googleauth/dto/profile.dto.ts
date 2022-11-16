interface EmailsDto {
  value: string;
}

interface PhotosDto {
  value: string;
}

interface NameDto {
  givenName: string;
  familyName: string;
}

export interface ProfileDto {
  name: NameDto;
  emails: Array<EmailsDto>;
  photos: Array<PhotosDto>;
}
