import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, X, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import { MathText } from './MathText';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeContext?: string;
  activeQuestionTitle?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AITutorDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  activeContext,
  activeQuestionTitle,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Chào em! Thầy/Cô là trợ lý gia sư Toán 7 GDPT 2018. Em đang gặp khó khăn ở bước giải nào, hoặc muốn Thầy/Cô giải thích chi tiết câu hỏi nào không? Hãy chọn các gợi ý bên dưới hoặc nhắn câu hỏi nhé!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  // Quick prompt buttons
  const sendQuickPrompt = (promptText: string) => {
    handleSendMessage(promptText);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          context: activeContext || 'Ôn tập Toán lớp 7 Giữa học kỳ I theo chương trình GDPT 2018',
        }),
      });

      if (!response.ok) {
        throw new Error('Mạng bị lỗi');
      }

      const data = await response.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || 'Thầy/Cô đã nhận được câu hỏi, hãy kiểm tra lại bài làm nhé!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Thầy/Cô khuyên em hãy chú ý: Khi tìm x, chuyển vế phải đổi dấu (+ thành -, - thành +). Khi tính lũy thừa, luôn tính lũy thừa trước khi thực hiện nhân chia cộng trừ. Đối với hình học, để chứng minh hai đường thẳng song song, hãy tìm cặp góc so le trong bằng nhau hoặc đồng vị bằng nhau!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white shadow-2xl border-l border-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Bot size={20} />
          </div>
          <div>
            <div className="font-semibold text-sm flex items-center gap-2">
              Trợ Lý Toán 7 GDPT 2018
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-normal px-2 py-0.5 rounded-full">
                Sẵn sàng
              </span>
            </div>
            <div className="text-xs text-slate-300">
              {activeQuestionTitle ? `Đang xem: ${activeQuestionTitle}` : 'Gia sư giảng giải từng bước'}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Đóng"
        >
          <X size={20} />
        </button>
      </div>

      {/* Context banner if attached to a specific question */}
      {activeQuestionTitle && (
        <div className="px-4 py-2 bg-blue-50 border-b border-blue-100 flex items-center gap-2 text-xs text-blue-800">
          <BookOpen size={14} className="shrink-0" />
          <span className="truncate">Ngữ cảnh: {activeQuestionTitle}</span>
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white border border-slate-200 text-slate-800 shadow-xs rounded-bl-none'
              }`}
            >
              <MathText content={m.text} />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-slate-500 text-xs py-2 px-1">
            <RefreshCw size={14} className="animate-spin text-blue-600" />
            <span>Thầy/Cô đang phân tích và chuẩn bị lời giảng...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="p-3 bg-white border-t border-slate-200 flex flex-wrap gap-1.5">
        <button
          onClick={() => sendQuickPrompt('Giải thích chi tiết từng bước cho bài toán này')}
          className="text-xs px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-1 font-medium"
        >
          <Sparkles size={12} className="text-amber-500" />
          Giải thích từng bước
        </button>
        <button
          onClick={() => sendQuickPrompt('Những lỗi sai học sinh lớp 7 hay mắc phải ở dạng bài này?')}
          className="text-xs px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-1 font-medium"
        >
          <AlertCircle size={12} className="text-red-500" />
          Lỗi sai thường gặp
        </button>
        <button
          onClick={() => sendQuickPrompt('Nhắc lại kiến thức và công thức trọng tâm cần dùng cho bài này')}
          className="text-xs px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-1 font-medium"
        >
          <BookOpen size={12} className="text-blue-500" />
          Công thức trọng tâm
        </button>
      </div>

      {/* Input bar */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hỏi Thầy/Cô về bài toán này..."
            disabled={isLoading}
            className="flex-1 text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition-colors shrink-0"
            aria-label="Gửi tin nhắn"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
