export class Client {
  constructor(
    public id: number,
    public name: string,
    public gender: string,
    public phone: string,
    public email: string,
    public address: string,
    public nationality: string,
    public dateOfBirth: string,
    public educationalBackground: string,
    public preferredModeOfContact: string,
  ) {
    this.id = id;
    this.name = name.trim();
    this.gender = gender.trim();
    this.phone = phone.trim();
    this.email = email.trim();
    this.address = address.trim();
    this.nationality = nationality.trim();
    this.dateOfBirth = dateOfBirth.trim();
    this.educationalBackground = educationalBackground.trim();
    this.preferredModeOfContact = preferredModeOfContact.trim();
  }
}
