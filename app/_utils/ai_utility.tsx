import { Chat } from './ai_schema';
import {marked} from 'marked';


// Communicate with AI assistant
export const queryAssistant = async (newChatRequest: object) => {
    // Create a request to send to the api
    const request = new Request('/api/assistant', {
      method: 'POST',
      body: JSON.stringify(newChatRequest),
    });
  
    try {
      // API call and response
      const response = await fetch(request);
      const data = await response.text();
  
      const formattedText = await markdownToPlainText(data)
  
      return formattedText;
    } catch (error) {
      console.log(error);
    }
  };
  

  export const markdownToPlainText = async (text: string) => {
    const html = await marked.parse(text);
    const newText = html
      .replace(/<[^>]*>/g, '')
      .replace(/&quot;/g, '')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\\n/g, '\n');
    return newText;
  };