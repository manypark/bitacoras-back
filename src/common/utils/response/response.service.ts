import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {

    responseSucces( statusCode : number, message : string, response : any ) {
        return { statusCode, message, response };
    }
}
