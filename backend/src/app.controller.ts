import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Chat')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('api/chat')
  @ApiOperation({ summary: 'Get response from the AI chatbot' })
  @ApiResponse({
    status: 200,
    description: 'Returns the response from the chatbot',
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async getResponse(@Body('text') text: string) {
    return this.appService.getResponse(text);
  }
}
