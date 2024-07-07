import { ApiHideProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {
  /**
   * El nombre del usuario. Deber ser un string entre 3 y 80 caracteres.
   * @example 'Test User01'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * El correo electrónico del usuario. Deber ser un string con formato email válido.
   * @example 'user01@example.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * La contraseña del usuario. Deber contener entre 8 y 15 caracteres, e incluir al menos una minúscula, una mayúscula, un número y un carácter especial.
   * @example 'aaBB33##'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una mayúscula, un número y al menos uno de los siguientes caracteres !@#$%^&*',
  })
  password: string;

  /**
   * Confirmación de la contraseña. Deber coincidir con la contraseña.
   * @example 'aaBB33##'
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   * La dirección del usuario. Debe ser un string entre 3 y 88 caracteres.
   * @example 'Test Street 1234'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(88)
  address: string;

  /**
   * El número de teléfono del usuario. Debe ser un número.
   * @example '123456789'
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * El país del usuario. Deber ser un string entre 4 y 20 caracteres.
   * @example 'Test Country'
   */
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  country: string;

  /**
   * La ciudad del usuario. Deber ser un string entre 5 y 20 caracteres.
   * @example 'Test City'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  /**
   * Indica si el usuario es administrador. Es una propiedad oculta y debe estar vacía.
   */
  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean;
}

export class LogginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
