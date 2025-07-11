import { CreateUserDto } from './create-user.dto';
import { PickType } from '@nestjs/mapped-types';

export class LoginUserDto extends PickType(
    CreateUserDto, [
        'email',
        'password'
    ] as const
){}
