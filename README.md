# Toán 7 GDPT 2018 - Ôn Thi Giữa Kỳ I Thông Minh 🎓📐

Ứng dụng web ôn tập và luyện thi môn **Toán lớp 7 - Giữa Học kỳ I** theo chuẩn chương trình **Giáo dục Phổ thông (GDPT) 2018** (đồng bộ với 3 bộ sách giáo khoa: *Kết nối tri thức với cuộc sống*, *Cánh diều*, *Chân trời sáng tạo*).

---

## 🌟 Tính Năng Nổi Bật

### 1. 📚 6 Bộ đề thi chuẩn ma trận GDPT 2018
- Mỗi đề gồm đầy đủ: **12 câu trắc nghiệm khách quan (3,0 điểm)** và **5 bài tự luận (7,0 điểm)** từ cơ bản đến câu phân loại điểm 10.
- Lời giải chi tiết từng bước, barem chấm điểm minh bạch.
- Tích hợp công thức toán học sắc nét hiển thị qua **KaTeX**.

### 2. ⚡ Chế độ kiểm tra câu trả lời ngay sau mỗi câu (Instant Feedback)
- Hỗ trợ ở tất cả các chế độ:
  - **Luyện tập tương tác (Interactive Practice)**: Chọn đáp án hoặc nhập nháp kết quả để kiểm tra ngay, xem lời giải và đáp số chuẩn.
  - **Thi thử tính giờ (Exam Mode)**: Tùy chọn bật/tắt chế độ *Kiểm tra câu trả lời ngay* trên thanh điều khiển sticky header.

### 3. 🎯 Danh mục "Các câu hỏi cần luyện tập lại"
- Mọi câu trắc nghiệm làm sai hoặc câu tự luận chưa đạt điểm tối đa ở mọi chế độ sẽ được **tự động tập hợp** vào mục **"Câu Cần Luyện Lại"**.
- Học sinh có thể làm lại bài trực tiếp, xem gợi ý, và đánh dấu "Đã sửa đúng" để loại bỏ khỏi danh sách câu sai.
- Hỗ trợ lọc theo từng bộ đề và tìm kiếm nhanh.

### 4. 📊 Dashboard & Progress Bar theo dõi tiến độ
- Dashboard trực quan hiển thị tổng số câu hỏi đã hoàn thành, số đề đã làm, tỉ lệ chính xác và thời gian ôn luyện.
- Mỗi bộ đề có **thanh tiến độ (Progress Bar)** riêng hiển thị chi tiết số câu trắc nghiệm và câu tự luận đã hoàn thành.

### 5. 📐 Hình học tương tác trực quan (SVG Geometry)
- Các bài toán hình học về góc kề bù, so le trong, đồng vị, hai đường thẳng song song, tia phân giác được dựng hình vector SVG trực quan, rõ ràng, giúp học sinh nắm vững bản chất hình học.

### 6. 🤖 Trợ lý AI Gia sư Toán 7 (Google Gemini)
- Trợ lý AI sư phạm giảng giải từng bước, chỉ ra sai lầm thường gặp (quên đổi dấu khi chuyển vế, nhầm lũy thừa, nhầm cặp góc đồng vị,...).
- Có cơ chế fallback sư phạm thông minh ngay cả khi chưa cấu hình API Key.

### 7. 📖 Sổ tay công thức & Các dạng bài điểm 10 nâng cao
- Tóm tắt toàn bộ lý thuyết Số hữu tỉ, Lũy thừa, Số thập phân, Hình hộp chữ nhật, Lăng trụ đứng, Các góc vị trí đặc biệt.
- Tổng hợp chuyên đề nâng cao: Tính tổng dãy phân số có quy luật, so sánh lũy thừa, kẻ đường phụ hình học.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React, KaTeX, Motion
- **Backend / Dev Server**: Node.js, Express, Vite, TSX
- **Trí tuệ nhân tạo (AI)**: Google GenAI SDK (`@google/genai` - Gemini 3.8 Flash)
- **Quản lý dữ liệu**: LocalStorage (Lưu trữ an toàn tiến độ bài tập và danh sách câu sai trên trình duyệt)

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### Yêu cầu hệ thống
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (hoặc pnpm / yarn / bun)

### 1. Clone repository
```bash
git clone https://github.com/<tai-khoan-cua-ban>/toan-7-on-thi-giua-ky-1.git
cd toan-7-on-thi-giua-ky-1
```

### 2. Cài đặt các gói thư viện
```bash
npm install
```

### 3. Cấu hình biến môi trường
Tạo file `.env` từ file mẫu `.env.example`:
```bash
cp .env.example .env
```
Mở file `.env` và điền khóa API Gemini (tùy chọn):
```env
GEMINI_API_KEY="AIzaSy..."
PORT=3000
```
*(Nếu chưa có API Key, hệ thống vẫn hoạt động bình thường với trợ lý giải thích mẫu được tích hợp sẵn).*

### 4. Chạy chế độ phát triển (Development)
```bash
npm run dev
```
Mở trình duyệt tại: [http://localhost:3000](http://localhost:3000)

### 5. Build và chạy sản phẩm (Production)
```bash
# Kiểm tra TypeScript
npm run lint

# Đóng gói bản build
npm run build

# Khởi chạy server production
npm start
```

---

## 📁 Cấu Trúc Thư Mục

```
.
├── index.html                   # HTML entry point với hỗ trợ tiếng Việt và KaTeX
├── server.ts                    # Express server tích hợp proxy Gemini API & Vite middleware
├── package.json                 # Danh sách thư viện và scripts
├── tsconfig.json                # Cấu hình TypeScript
├── vite.config.ts               # Cấu hình Vite & Tailwind CSS
├── .env.example                 # Mẫu biến môi trường
├── .gitignore                   # Cấu hình bỏ qua các file thừa khi commit
├── src/
│   ├── main.tsx                 # Điểm khởi chạy React app
│   ├── App.tsx                  # Component trung tâm điều hướng các chế độ
│   ├── index.css                # Style chung với Tailwind CSS
│   ├── types/
│   │   └── math.ts              # Định nghĩa types cho đề thi, câu hỏi, điểm số
│   ├── data/
│   │   ├── examsData.ts         # Dữ liệu 6 bộ đề thi chuẩn ma trận GDPT 2018
│   │   ├── cheatSheetData.ts    # Lý thuyết và công thức trọng tâm
│   │   └── advancedTopics.ts    # Các dạng bài phân loại điểm 10
│   ├── utils/
│   │   ├── progressStorage.ts   # Quản lý lưu trữ tiến độ học sinh
│   │   └── wrongQuestionsStorage.ts # Quản lý và đồng bộ danh sách câu làm sai
│   └── components/
│       ├── Navbar.tsx           # Thanh điều hướng với huy hiệu đếm câu sai
│       ├── ProgressDashboard.tsx # Bảng Dashboard tổng quan tiến độ
│       ├── ExamProgressBar.tsx  # Thanh tiến độ từng bộ đề
│       ├── InteractivePractice.tsx # Chế độ Luyện tập tương tác (Instant Check)
│       ├── ExamMode.tsx         # Chế độ Thi thử tính giờ 90 phút
│       ├── WrongQuestionsView.tsx # Giao diện "Các câu hỏi cần luyện tập lại"
│       ├── CheatSheetView.tsx   # Giao diện Sổ tay công thức
│       ├── AdvancedProblemsView.tsx # Chuyên đề điểm 10 nâng cao
│       ├── GeometryDiagram.tsx  # Vẽ hình học tương tác SVG
│       ├── MathText.tsx         # Render công thức toán LaTeX qua KaTeX
│       └── AITutorDrawer.tsx    # Ngăn trợ lý AI sư phạm giảng giải
```

---

## 📤 Hướng Dẫn Đẩy Lên GitHub (Publish to GitHub)

Nếu bạn vừa tải mã nguồn về hoặc muốn đẩy lên repository mới trên GitHub:

```bash
# 1. Khởi tạo Git repository
git init

# 2. Thêm tất cả các file
git add .

# 3. Tạo commit đầu tiên
git commit -m "feat: initial commit - toan 7 giua ky 1 GDPT 2018 app"

# 4. Đổi tên branch chính thành main
git branch -M main

# 5. Liên kết tới repository GitHub của bạn (thay URL bằng repo của bạn)
git remote add origin https://github.com/<tai-khoan-cua-ban>/toan-7-on-thi-giua-ky-1.git

# 6. Đẩy mã nguồn lên GitHub
git push -u origin main
```

---

## 📄 Bản Quyền (License)

Dự án phát hành dưới giấy phép [MIT License](LICENSE). Phục vụ mục đích học tập và ôn thi cho học sinh, giáo viên và phụ huynh.
