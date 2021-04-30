import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from './client.model';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { CsvFile } from './CsvFile.class';
import { Constant } from '../constant';

@Injectable()
export class ClientsService {
  constructor() {
    this.init();
  }

  //header content for CSV file
  private csvHeaders = [
    // Constant.ID,
    // Constant.NAME,
    // Constant.GENDER,
    // Constant.PHONE,
    // Constant.EMAIL,
    // Constant.ADDRESS,
    // Constant.NATIONALITY,
    // Constant.DATE_OF_BIRTH,
    // Constant.EDUCATIONAL_BACKGROUND,
    // Constant.PREFERRED_MODE_OF_CONTACT,
    'id',
    'name',
    'gender',
    'phone',
    'email',
    'address',
    'nationality',
    'dateOfBirth',
    'educationalBackground',
    'preferredModeOfContact',
  ];

  //for storing clients data on memory
  private clients: Client[] = [];

  //for CSV file path
  private csvFilePath = path.resolve(__dirname, Constant.CSV_FILE_PATH);

  //creating CSV file on the mentioned path
  private csvFile = new CsvFile({
    path: this.csvFilePath,
    // headers to write
    headers: this.csvHeaders,
  });

  // for loading CSV's file data to memory
  init() {
    fs.createReadStream(this.csvFilePath)
      .pipe(csv.parse({ headers: true, trim: true }))
      .on('error', (error) => {
        console.error(error);
        this.clients = [];
      })
      .on('data', (row) => {
        const client = new Client(
          Number(row.id),
          row.name,
          row.gender,
          row.phone,
          row.email,
          row.address,
          row.nationality,
          row.dateOfBirth,
          row.educationalBackground,
          row.preferredModeOfContact,
        );
        this.clients.push(client);
      })
      .on('end', (rowCount: number) => {
        console.log(`Parsed ${rowCount} rows`);
      });
  }

  insertClient(
    name: string,
    gender: string,
    phone: string,
    email: string,
    address: string,
    nationality: string,
    dateOfBirth: string,
    educationalBackground: string,
    preferredModeOfContact: string,
  ) {
    // eslint-disable-next-line prefer-rest-params
    console.log('arguments: ', arguments);
    const id = Date.now();
    const client = new Client(
      id,
      name,
      gender,
      phone,
      email,
      address,
      nationality,
      dateOfBirth,
      educationalBackground,
      preferredModeOfContact,
    );
    this.clients.push(client);
    this.addClientToCSV(client);
    return id;
  }

  addClientToCSV(client: Client) {
    console.log('saving client to csv');
    this.csvFile
      .append([client])
      // append rows to file
      .then(() => this.csvFile.read())
      .then((contents) => {
        console.log(`${contents}`);
      })
      .catch((err) => {
        console.error(err.stack);
        process.exit(1);
      });
  }

  getAllClients() {
    return [...this.clients];
  }

  getClient(id: number) {
    const client = this.findClientById(id)[0];
    return { ...client };
  }

  updateClient(
    id: number,
    name: string,
    gender: string,
    phone: string,
    email: string,
    address: string,
    nationality: string,
    dateOfBirth: string,
    educationalBackground: string,
    preferredModeOfContact: string,
  ) {
    const [client, index] = this.findClientById(id);
    const updatedClient = { ...client };

    if (name != updatedClient.name) {
      updatedClient.name = name;
    }
    if (gender != updatedClient.gender) {
      updatedClient.gender = gender;
    }
    if (phone != updatedClient.phone) {
      updatedClient.phone = phone;
    }
    if (email != updatedClient.email) {
      updatedClient.email = email;
    }
    if (address != updatedClient.address) {
      updatedClient.address = address;
    }
    if (nationality != updatedClient.nationality) {
      updatedClient.nationality = nationality;
    }
    if (preferredModeOfContact != updatedClient.preferredModeOfContact) {
      updatedClient.preferredModeOfContact = preferredModeOfContact;
    }
    if (educationalBackground != updatedClient.educationalBackground) {
      updatedClient.educationalBackground = educationalBackground;
    }
    if (dateOfBirth != updatedClient.dateOfBirth) {
      updatedClient.dateOfBirth = dateOfBirth;
    }
    this.clients[index] = updatedClient;
    this.updateCsvFile();
    return id;
  }

  private findClientById(id: number): [Client, number] {
    const clientIndex = this.clients.findIndex((c: Client) => c.id == id);
    const client = this.clients[clientIndex];
    if (!client) {
      throw new NotFoundException('Could not find client with id ' + id);
    }
    return [client, clientIndex];
  }

  deleteClient(id: number) {
    console.log('Deleting client with id ', id);
    const index = this.findClientById(id)[1];
    this.clients.splice(index, 1);
    this.updateCsvFile();
    return null;
  }

  updateCsvFile() {
    console.log('Updating CSV File.');
    this.csvFile.create(this.clients).catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
  }
}
