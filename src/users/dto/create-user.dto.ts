import {IsEmail, IsString, IsEnum, MinLength, IsPhoneNumber, IsNumber, ValidateIf} from 'class-validator'
export class CreateUserDto {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(['buyer','seller'])
    role: 'buyer'|'seller';

    @IsEnum([
        'SINES', 'SEECS', 'SMME', 'SNS', 'NBS', 'SCME',
        'NICE', 'NIPCONS', 'ASAB', 'SADA', 'NSTP',
        'RIMMES', 'IAEC', 'RIC', 'Main Office'
      ])
      department: string;

    @IsPhoneNumber('PK')
    phoneNumber: string;

    @IsEnum(['hostelite','dayscholar'])
    residenceStatus: 'hostelite'| 'dayscholar';

    @ValidateIf(o=> o.residenceStatus === 'hostelite')
    @IsEnum([
        'rumi','johar','ghazali','beruni','razi','rahmat',
        'attar','liaquat','hajveri','zakariya','fatima_I',
        'fatima_block_II','fatima_block_III','zainab','ayesha',
        'khadija','amna'
    ])
    Hostel ?: string;

    @ValidateIf(o => o.residenceStatus === 'hostelite')
    @IsNumber()
    RoomNumber ?: number;
}