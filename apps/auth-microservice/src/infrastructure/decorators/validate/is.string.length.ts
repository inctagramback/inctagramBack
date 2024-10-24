import { applyDecorators } from '@nestjs/common';
import { Trim } from '../transform/trim';
import { IsNotEmpty, IsString, Length } from 'class-validator';

type StringLength ={minLength: number, maxLength: number}

export const IsStringLength = (lengthParams:StringLength) => {
  return applyDecorators(Trim(), IsString(), IsNotEmpty(), Length(lengthParams.minLength, lengthParams.maxLength));
};
