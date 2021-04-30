import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './client.model';
import { Constant } from '../constant';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  // TODO can be received as a object
  @Post()
  addClient(
    // @Body(Constant.NAME) name: string,
    // @Body(Constant.GENDER) gender: string,
    // @Body(Constant.PHONE) phone: string,
    // @Body(Constant.EMAIL) email: string,
    // @Body(Constant.ADDRESS) address: string,
    // @Body(Constant.NATIONALITY) nationality: string,
    // @Body(Constant.DATE_OF_BIRTH) dateOfBirth: string,
    // @Body(Constant.EDUCATIONAL_BACKGROUND) educationalBackground: string,
    // @Body(Constant.PREFERRED_MODE_OF_CONTACT) preferredModeOfContact: string,

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

  @Get()
  getAllClients(): Client[] {
    return this.clientService.getAllClients();
  }

  @Get(Constant.ID_PARAMS)
  getClient(@Param(Constant.ID) id: number): Client {
    return this.clientService.getClient(id);
  }

  @Delete(Constant.ID_PARAMS)
  deleteClient(@Param(Constant.ID) id: number): string {
    return this.clientService.deleteClient(id);
  }

  // TODO can be received as a object
  @Patch(Constant.ID_PARAMS)
  updateClient(
    @Param(Constant.ID) id: number,
    @Body(Constant.NAME) name: string,
    @Body(Constant.GENDER) gender: string,
    @Body(Constant.PHONE) phone: string,
    @Body(Constant.EMAIL) email: string,
    @Body(Constant.ADDRESS) address: string,
    @Body(Constant.NATIONALITY) nationality: string,
    @Body(Constant.DATE_OF_BIRTH) dateOfBirth: string,
    @Body(Constant.EDUCATIONAL_BACKGROUND) educationalBackground: string,
    @Body(Constant.PREFERRED_MODE_OF_CONTACT) preferredModeOfContact: string,
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
}
