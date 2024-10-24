import {IsStringLength} from "../../../../../infrastructure/decorators/validate/is.string.length";
import {IsOptionalEmail} from "../../../../../infrastructure/decorators/validate/is.optional.email";
import {IsOptionalString} from "../../../../../infrastructure/decorators/validate/is.optional.string";
import {ApiProperty} from "@nestjs/swagger";

export const validationsConstants = {
    username: {
        minLength: 6,
        maxLength: 30,
    },
    password: {
        minLength: 6,
        maxLength: 20,
    },
    email:{
        pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
    }
};

export class RegistrationInputModel {
    @ApiProperty({
        example: 'Username',
        required: true,
        ... validationsConstants.username
    })
    @IsStringLength(validationsConstants.username)
    username: string

    @ApiProperty({
        example: 'example@example.com',
        required: true,
        ... validationsConstants.email
    })
    @IsOptionalEmail()
    email: string

    @ApiProperty({
        example: 'qwerty123',
        required: true,
        ... validationsConstants.password
    })
    @IsStringLength(validationsConstants.password)
    password: string
}

export class LoginInputModel {
    @ApiProperty()
    @IsOptionalEmail()
    email: string

    @ApiProperty()
    @IsStringLength(validationsConstants.password)
    password: string
}

export class ResetPasswordInputModel {
    @ApiProperty()
    @IsOptionalEmail()
    email: string
}

export class SetNewPasswordInputModel {
    @ApiProperty()
    @IsOptionalString()
    code: string

    @ApiProperty()
    @IsStringLength(validationsConstants.password)
    password: string
}

export class EmailConfirmationCodeInputModel {
    @ApiProperty()
    @IsOptionalEmail()
    code: string
}

export class ConfirmationEmailInputModel {
    @ApiProperty()
    @IsOptionalString()
    code: string
}