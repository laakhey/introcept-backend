import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  Header,
  Res,
  DefaultValuePipe,
  Query,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './client.model';
import * as fs from 'fs';
import { Constant } from '../constant';
import * as path from 'path';

@Controller()
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  // TODO can be received as a object
  @Post('clients')
  addClient(
    @Body('name') name: string,
    @Body('gender') gender: string,
    @Body('phone') phone: string,
    @Body('email') email: string,
    @Body('address') address: string,
    @Body('nationality') nationality: string,
    @Body('dateOfBirth') dateOfBirth: string,
    @Body('educationalBackground') educationalBackground: string,
    @Body('preferredModeOfContact') preferredModeOfContact: string,
  ): number {
    return this.clientService.insertClient(
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
  }

  @Get('clients')
  getAllClients(@Query('page', new DefaultValuePipe(0)) page: number): any {
    return this.clientService.getAllClients(page);
  }

  @Get('clients/:id')
  getClient(@Param('id') id: number): Client {
    return this.clientService.getClient(id);
  }

  @Delete('clients/:id')
  deleteClient(@Param('id') id: number): string {
    return this.clientService.deleteClient(id);
  }

  // TODO can be received as a object
  @Patch('clients/:id')
  updateClient(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('gender') gender: string,
    @Body('phone') phone: string,
    @Body('email') email: string,
    @Body('address') address: string,
    @Body('nationality') nationality: string,
    @Body('dateOfBirth') dateOfBirth: string,
    @Body('educationalBackground') educationalBackground: string,
    @Body('preferredModeOfContact') preferredModeOfContact: string,
  ): number {
    return this.clientService.updateClient(
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
  }

  @Get('download')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename=clients.csv')
  public downloadCSV(@Res() response) {
    const csvFilePath = path.resolve(__dirname, Constant.CSV_FILE_PATH);
    console.log('sending csv files');
    return fs.createReadStream(csvFilePath).pipe(response);
  }
}
