import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUpdateAddressDto } from './dto/create-update-address.dto';

@Controller('direcciones')
@ApiTags('Direcciones')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAddressDto: CreateUpdateAddressDto,
  ) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
