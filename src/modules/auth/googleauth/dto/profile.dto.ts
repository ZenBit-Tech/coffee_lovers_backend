interface Emails {
  value: string;
}

interface Photos {
  value: string;
}

interface Name {
  givenName: string;
  familyName: string;
}

export interface Prof {
  name: Name;
  emails: Array<Emails>;
  photos: Array<Photos>;
}
