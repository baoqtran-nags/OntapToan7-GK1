import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '1mb' }));

// Server-side Gemini initialization
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System instruction for Math 7 Tutor
const SYSTEM_INSTRUCTION = `Bạn là Cô/Thầy giáo trợ lý dạy Toán lớp 7 theo chương trình GDPT 2018 (sách Kết nối tri thức / Cánh diều / Chân trời sáng tạo).
Phong cách:
- Cực kỳ sư phạm, ân cần, khích lệ học sinh, giải thích từng bước (step-by-step) tỉ mỉ, không nhảy cóc.
- Nêu rõ: 1) Kiến thức / công thức áp dụng; 2) Các bước tính toán cụ thể; 3) Kết luận và lưu ý các sai lầm học sinh lớp 7 hay mắc phải (như quên đổi dấu khi chuyển vế, nhầm lũy thừa, nhầm cặp góc đồng vị với so le trong).
- Nếu học sinh hỏi về các bài toán nâng cao / điểm 10 (từ nguồn ôn tập nâng cao Drive), hướng dẫn các kĩ thuật như:
  + Dãy phân số có quy luật (nhân thêm hệ số, triệt tiêu vi sai)
  + So sánh lũy thừa qua cơ số trung gian hoặc lũy thừa của lũy thừa
  + Kẻ thêm đường thẳng phụ song song để tính góc
  + Tìm giá trị lớn nhất / nhỏ nhất của biểu thức phân số
- Dùng ký hiệu toán rõ ràng, tiếng Việt chuẩn mực.`;

// API endpoint for AI Teacher Chat & Explanation
app.post('/api/chat', async (req, res) => {
  const { message, context } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!aiClient) {
    // Graceful pedagogical fallback when API key is not configured
    return res.json({
      reply: `Chào em! Thầy/Cô rất vui được đồng hành cùng em ôn tập Toán 7. 
Đối với bài toán này:
1. **Phương pháp**: Nhớ chú ý thứ tự thực hiện phép tính (trong ngoặc trước, lũy thừa -> nhân chia -> cộng trừ) và quy tắc chuyển vế: "Chuyển vế phải đổi dấu".
2. **Hình học**: Khi chứng minh hai đường thẳng song song, hãy tìm hai góc so le trong bằng nhau hoặc hai góc đồng vị bằng nhau, hoặc định lý "Hai đường thẳng cùng vuông góc với một đường thẳng thứ ba thì song song với nhau".
3. **Mẹo làm bài**: Sau khi tìm được kết quả x, hãy thay ngược lại vào đề bài để kiểm tra tính đúng đắn trước khi nộp bài nhé!`,
      isFallback: true,
    });
  }

  try {
    const prompt = context
      ? `[Ngữ cảnh bài tập]:\n${context}\n\n[Câu hỏi của học sinh]:\n${message}`
      : message;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const reply = response.text || 'Thầy/Cô chưa kịp nghĩ ra lời giải, em hỏi lại giúp Thầy/Cô nhé!';
    return res.json({ reply, isFallback: false });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.json({
      reply: `Chào em! Có chút gián đoạn kết nối mạng khi tải câu trả lời từ AI. 
Tuy nhiên, quy tắc chính cho dạng bài này là:
- Đưa các phân số về cùng mẫu dương trước khi cộng trừ.
- Khi rút gọn lũy thừa: $a^m : a^n = a^{m-n}$ và $(a^m)^n = a^{m \\cdot n}$.
- Với hình học: Hai góc so le trong hoặc đồng vị bằng nhau thì hai đường thẳng song song.
Em hãy kiểm tra lại từng bước tính theo lời giải chi tiết của hệ thống nhé!`,
      isFallback: true,
      error: error?.message,
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
