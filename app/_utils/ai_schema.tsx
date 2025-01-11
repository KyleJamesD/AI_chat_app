export interface Chat {
    chatId: string;
    type: string;
    userId: string;
    message: string;
    timestamp: string;
  }



  export const defaultMessage: string = `

  Formatting guidelines: Format the response to remove Markdown/HTML elements and convert \n to actual linebreaks. 
  `;