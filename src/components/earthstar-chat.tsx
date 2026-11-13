"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, User } from "lucide-react";

interface Message {
  id: string;
  author: string;
  text: string;
  timestamp: number;
}

// Sistema de chat simples sem Earthstar (por enquanto)
// O Earthstar requer instalação mais complexa
export function EarthstarChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isUsernameConfirmed, setIsUsernameConfirmed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasLoadedData = useRef(false);

  // Carregar dados iniciais apenas uma vez
  useEffect(() => {
    if (typeof window === "undefined" || hasLoadedData.current) return;
    
    const storedMessages = localStorage.getItem("chat_messages");
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (error) {
        console.error("Erro ao carregar mensagens:", error);
      }
    }

    const storedUsername = localStorage.getItem("chat_username");
    if (storedUsername) {
      setUsername(storedUsername);
      setIsUsernameConfirmed(true);
    }
    
    hasLoadedData.current = true;
  }, []);

  const confirmUsername = () => {
    if (username.trim()) {
      localStorage.setItem("chat_username", username.trim());
      setIsUsernameConfirmed(true);
    }
  };

  const changeUsername = () => {
    setIsUsernameConfirmed(false);
    setUsername("");
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !username.trim()) return;

    const newMsg: Message = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      author: username,
      text: newMessage.trim(),
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    localStorage.setItem("chat_messages", JSON.stringify(updatedMessages));
    setNewMessage("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Chat do Quintal à Cozinha</span>
              {isUsernameConfirmed && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={changeUsername}
                  className="text-xs"
                >
                  <User className="h-3 w-3 mr-1" />
                  {username}
                </Button>
              )}
            </DialogTitle>
          </DialogHeader>

          {!isUsernameConfirmed ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4">
              <p className="text-sm text-muted-foreground text-center">
                Digite seu nome para começar a conversar:
              </p>
              <div className="flex gap-2 w-full max-w-xs">
                <Input
                  placeholder="Seu nome"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && username.trim()) {
                      e.preventDefault();
                      confirmUsername();
                    }
                  }}
                  autoFocus
                />
                <Button
                  onClick={confirmUsername}
                  disabled={!username.trim()}
                >
                  Entrar
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-3 p-4 border rounded-lg">
                {messages.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center">
                    Nenhuma mensagem ainda. Seja o primeiro a conversar!
                  </p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.author === username ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.author === username
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-xs font-semibold mb-1">{msg.author}</p>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
