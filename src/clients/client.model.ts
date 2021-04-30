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
    this.name = name;
    this.gender = gender;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.nationality = nationality;
    this.dateOfBirth = dateOfBirth;
    this.educationalBackground = educationalBackground;
    this.preferredModeOfContact = preferredModeOfContact;
  }
}
