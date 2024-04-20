import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private responses: { [key: string]: string } = {
    hello: 'Hello! How can I help you today?',
    hi: "Hi there! What's on your mind?",
    how: 'I am an AI assistant designed to help you with various tasks and questions.',
  };

  getResponse(text: string): { response: string } {
    // Trim leading and trailing whitespace and convert to lowercase
    const normalizedText = text.trim().toLowerCase();
    // Split text into words
    const words = normalizedText.split(' ');

    // Iterate through each word and check for partial matches
    for (const word of words) {
      for (const key in this.responses) {
        if (this.responses.hasOwnProperty(key) && word.includes(key)) {
          return { response: this.responses[key] };
        }
      }
    }

    return {
      response:
        'I am not sure how to respond to that. Can you please try again?',
    };
  }
}
