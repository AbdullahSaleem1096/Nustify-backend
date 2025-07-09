import {IsEmail, IsString, IsEnum, MinLength, IsPhoneNumber, IsNumber, ValidateIf} from 'class-validator'
export class CreateUserDto {
    @IsString({groups:['create','update']})
    username: string;

    @IsEmail({},{groups:['create','login']})
    email: string;

    @IsString({groups:['create','login']})
    @MinLength(6,{groups:['create','login']})
    password: string;

    @IsEnum(['buyer','seller'],{groups:['create']})
    role: 'buyer'|'seller';

    @IsEnum([
        'SINES', 'SEECS', 'SMME', 'SNS', 'NBS', 'SCME',
        'NICE', 'NIPCONS', 'ASAB', 'SADA', 'NSTP',
        'RIMMES', 'IAEC', 'RIC', 'Main Office'
      ],{groups:['create','update']})
      department: string;

    @IsPhoneNumber('PK',{groups:['create','update']})
    phoneNumber: string;

    @IsEnum(['hostelite','dayscholar'],{groups:['create','update']})
    residenceStatus: 'hostelite'| 'dayscholar';

    @ValidateIf(o=> o.residenceStatus === 'hostelite')
    @IsEnum([
        'rumi','johar','ghazali','beruni','razi','rahmat',
        'attar','liaquat','hajveri','zakariya','fatima_I',
        'fatima_block_II','fatima_block_III','zainab','ayesha',
        'khadija','amna'
    ],{groups:['create','update']})
    Hostel ?: string;

    @ValidateIf(o => o.residenceStatus === 'hostelite')
    @IsNumber({},{groups:['create','update']})
    RoomNumber ?: number;
}