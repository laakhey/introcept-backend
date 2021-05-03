export abstract class Constant {
  static readonly ID: 'id';
  static readonly NAME: 'name';
  static readonly GENDER: 'gender';
  static readonly PHONE: 'phone';
  static readonly EMAIL: 'email';
  static readonly ADDRESS: 'address';
  static readonly NATIONALITY: 'nationality';
  static readonly DATE_OF_BIRTH: 'dateOfBirth';
  static readonly EDUCATIONAL_BACKGROUND: 'educationalBackground';
  static readonly PREFERRED_MODE_OF_CONTACT: 'preferredModeOfContact';

  static readonly CLIENTS: 'clients';
  static readonly ID_PARAMS: ':id';

  static readonly CSV_FILE_PATH = '../assets/data.csv';

  static readonly PAGE_LIMIT = 5;
}
