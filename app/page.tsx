'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { defaultMessage, Chat } from "./_utils/ai_schema";
import { Button, Center, TextInput } from '@mantine/core';
import { queryAssistant } from "./_utils/ai_utility";

export default function Home() {
  const [chat, setChat] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [messageKey, setMessageKey] = useState(0);
  const [refresh, setRefresh] = useState<number>(0);

  const handleChat = (newTxt: string) => setChat(newTxt);

  const handleSendMessage = async () => {
    // Create new chat message body with the required attributes
    if (chat) {
      const newAssistantQuery = {
        messages: [
          {
            role: 'user',
            content: `${defaultMessage} \n ${chat}`,
          },
        ],
        model: 'gpt-4o-mini',
        temperature: 0.5,
      };

      try {
        if (chat != '') {
          const response = await queryAssistant(newAssistantQuery);
          if (response) {
            setAssistantResponse(response);
            console.log(assistantResponse);
            setMessageKey((prev) => prev + 1);
            setAssistantResponse('');
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setRefresh((prev: number) => prev + 1);
  }, []);

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory]);






  const employeeChatStyle = {
    width: '70%',
    maxWidth: '70%',
    margin: 5,
    padding: 10,
    backgroundColor: '#1B4965',
    color: '#f2f2f2',
    borderRadius: 8,
  };

  const assistantChatStyle = {
    width: '70%',
    maxWidth: '70%',
    margin: 5,
    padding: 10,
    backgroundColor: '#e8f4f9',
    color: '#000',
    borderRadius: 8,
  };
  const mappedChats = chatHistory.map((chat, index) => {
    return (
      <div
        key={index}
        style={{
          display: 'flex',
          flexDirection: chat.type === 'employee' ? 'row' : 'row-reverse',
          width: '70%',
          alignSelf: 'flex-end',
        }}
      >
        <div style={chat.type === 'employee' ? employeeChatStyle : assistantChatStyle}>
          {chat.message}
        </div>
      </div>
    );
  });

  return (
    <div className={styles.mainDiv}>
      <main className={styles.main}>
          <section
            id="chat-container"
            className={styles.chatcontainer}>
            {mappedChats}
          </section>
          <section>
          <TextInput
              style={{ paddingBottom: 10, }}
              placeholder="enter message"
              value={chat}
              onChange={(event) => handleChat(event.target.value)}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </section>
      </main>
    </div>
  );
}
