import { AdvancedProblem } from '../types/math';

export const DRIVE_FOLDER_URL = 'https://drive.google.com/drive/u/0/folders/1yhSjb4sMRjAx14GLspPT1jRUZLDokXSM';

export const ADVANCED_PROBLEMS: AdvancedProblem[] = [
  {
    id: 'adv-1',
    title: 'Tính tổng dãy phân số có quy luật triệt tiêu (Sai phân)',
    category: 'Phân số quy luật',
    difficulty: 'Điểm 9 - 10',
    problemText: 'Tính giá trị của biểu thức: A = 1/(1·2) + 1/(2·3) + 1/(3·4) + ... + 1/(99·100) và B = 3/(1·4) + 3/(4·7) + 3/(7·10) + ... + 3/(97·100)',
    hints: [
      'Nhận xét: 1 / [n·(n+1)] = 1/n - 1/(n+1).',
      'Với dãy B có khoảng cách ở mẫu là 3, tử số chính là 3: 3 / [n·(n+3)] = 1/n - 1/(n+3).'
    ],
    solution: [
      '1) Xét biểu thức A:',
      'Ta có công thức tổng quát: 1/[k(k+1)] = (k+1 - k)/[k(k+1)] = 1/k - 1/(k+1).',
      'Áp dụng vào biểu thức:',
      'A = (1/1 - 1/2) + (1/2 - 1/3) + (1/3 - 1/4) + ... + (1/99 - 1/100).',
      'Các số hạng đối nhau ở giữa triệt tiêu hết, ta còn lại:',
      'A = 1 - 1/100 = 99/100.',
      '2) Xét biểu thức B:',
      'Ta có: 3/[k(k+3)] = 1/k - 1/(k+3).',
      'B = (1/1 - 1/4) + (1/4 - 1/7) + (1/7 - 1/10) + ... + (1/97 - 1/100).',
      'Triệt tiêu các cặp số hạng đối nhau:',
      'B = 1 - 1/100 = 99/100.',
      'Kết luận: A = 99/100 và B = 99/100.'
    ],
    takeaways: [
      'Công thức vàng dạng 1: a / [n·(n+a)] = 1/n - 1/(n+a).',
      'Nếu tử số chưa bằng khoảng cách hai thừa số ở mẫu, hãy nhân cả hai vế với khoảng cách đó rồi mới phân tích.'
    ]
  },
  {
    id: 'adv-2',
    title: 'So sánh hai lũy thừa có số mũ lớn',
    category: 'So sánh lũy thừa',
    difficulty: 'Vận dụng cao',
    problemText: 'So sánh các cặp số sau:\na) 2³⁰⁰ và 3²⁰⁰\nb) 31¹¹ và 17¹⁴\nc) 5³⁰⁰ và 3⁵⁰⁰',
    hints: [
      'Đưa về cùng số mũ bằng cách tìm ƯCLN của hai số mũ.',
      'So sánh qua số trung gian là lũy thừa của 2, 10 hoặc đưa về cùng cơ số gần nhất.'
    ],
    solution: [
      'a) So sánh 2³⁰⁰ và 3²⁰⁰:',
      '+ Ta có: ƯCLN(300, 200) = 100.',
      '+ 2³⁰⁰ = (2³)¹⁰⁰ = 8¹⁰⁰.',
      '+ 3²⁰⁰ = (3²)¹⁰⁰ = 9¹⁰⁰.',
      '+ Vì 8 < 9 nên 8¹⁰⁰ < 9¹⁰⁰.',
      '+ Vậy 2³⁰⁰ < 3²⁰⁰.',
      'b) So sánh 31¹¹ và 17¹⁴ qua số trung gian lũy thừa của 2:',
      '+ 31¹¹ < 32¹¹ = (2⁵)¹¹ = 2⁵⁵.',
      '+ 17¹⁴ > 16¹⁴ = (2⁴)¹⁴ = 2⁵⁶.',
      '+ Vì 2⁵⁵ < 2⁵⁶ nên 31¹¹ < 2⁵⁵ < 2⁵⁶ < 17¹⁴.',
      '+ Vậy 31¹¹ < 17¹⁴.',
      'c) So sánh 5³⁰⁰ và 3⁵⁰⁰:',
      '+ 5³⁰⁰ = (5³)¹⁰⁰ = 125¹⁰⁰.',
      '+ 3⁵⁰⁰ = (3⁵)¹⁰⁰ = 243¹⁰⁰.',
      '+ Vì 125 < 243 nên 125¹⁰⁰ < 243¹⁰⁰, suy ra 5³⁰⁰ < 3⁵⁰⁰.'
    ],
    takeaways: [
      'Phương pháp 1: Đưa về cùng số mũ (aⁿ và bⁿ với a < b ⇒ aⁿ < bⁿ).',
      'Phương pháp 2: Đưa về cùng cơ số (aᵐ và aⁿ với a > 1, m < n ⇒ aᵐ < aⁿ).',
      'Phương pháp 3: Dùng lũy thừa trung gian cơ số 2: 31 < 32 = 2⁵, 17 > 16 = 2⁴.'
    ]
  },
  {
    id: 'adv-3',
    title: 'Tìm x chứa dấu giá trị tuyệt đối nâng cao',
    category: 'Giá trị tuyệt đối',
    difficulty: 'Vận dụng cao',
    problemText: 'Tìm số hữu tỉ x, biết:\na) |2x - 3| = x + 1\nb) |x - 1/2| + |x - 3/2| = 1',
    hints: [
      'Với phương trình |A| = B: Điều kiện B ≥ 0, sau đó giải A = B hoặc A = -B.',
      'Với dạng |x - a| + |x - b|: Áp dụng bất đẳng thức giá trị tuyệt đối |A| + |B| ≥ |A + B|.'
    ],
    solution: [
      'a) Giải phương trình |2x - 3| = x + 1 (*):',
      'Điều kiện: x + 1 ≥ 0 ⇔ x ≥ -1.',
      'Khi đó (*) tương đương với hai trường hợp:',
      '+ TH1: 2x - 3 = x + 1 ⇔ 2x - x = 1 + 3 ⇔ x = 4 (thỏa mãn x ≥ -1).',
      '+ TH2: 2x - 3 = -(x + 1) ⇔ 2x - 3 = -x - 1 ⇔ 3x = 2 ⇔ x = 2/3 (thỏa mãn x ≥ -1).',
      'Vậy x ∈ {4; 2/3}.',
      'b) Giải: |x - 1/2| + |x - 3/2| = 1:',
      'Áp dụng bất đẳng thức: |A| + |B| ≥ |A + B|.',
      'Ta viết lại: |x - 1/2| + |3/2 - x| ≥ |(x - 1/2) + (3/2 - x)| = |1| = 1.',
      'Dấu "=" xảy ra khi và chỉ khi A và B cùng dấu, tức (x - 1/2)(3/2 - x) ≥ 0.',
      'Suy ra 1/2 ≤ x ≤ 3/2.',
      'Vậy tập hợp các giá trị của x thỏa mãn là 1/2 ≤ x ≤ 3/2.'
    ],
    takeaways: [
      '|A| = |-A| luôn đúng với mọi A.',
      'Bất đẳng thức vàng: |A| + |B| ≥ |A + B|, đẳng thức xảy ra ⇔ A·B ≥ 0.'
    ]
  },
  {
    id: 'adv-4',
    title: 'Hình học: Kẻ đường phụ giải bài toán góc zích-zắc (Chữ V)',
    category: 'Hình học kẻ đường phụ',
    difficulty: 'Điểm 9 - 10',
    problemText: 'Cho hình vẽ có Ax // By. Điểm O nằm giữa hai đường thẳng sao cho góc xAO = 40° và góc OBy = 50° (tia Ax và By cùng nằm về một phía). Tính số đo góc AOB.',
    hints: [
      'Kẻ qua đỉnh O đường thẳng Ot song song với Ax.',
      'Vì Ax // By nên Ot cũng song song với By. Khi đó sử dụng các cặp góc so le trong bằng nhau.'
    ],
    solution: [
      'Bước 1: Vẽ thêm đường phụ:',
      'Qua điểm O, kẻ tia Ot song song với tia Ax (cùng hướng với Ax).',
      'Bước 2: Sử dụng tính chất song song thứ nhất:',
      'Vì Ot // Ax nên góc AOt = góc xAO (hai góc so le trong).',
      'Mà góc xAO = 40° nên góc AOt = 40°.',
      'Bước 3: Sử dụng tính chất bắc cầu song song:',
      'Vì Ax // By và Ot // Ax nên Ot // By.',
      'Suy ra góc tOB = góc OBy (hai góc so le trong).',
      'Mà góc OBy = 50° nên góc tOB = 50°.',
      'Bước 4: Tính góc AOB:',
      'Vì tia Ot nằm giữa hai tia OA và OB nên:',
      'góc AOB = góc AOt + góc tOB = 40° + 50° = 90°.',
      'Kết luận: góc AOB = 90° (tức OA ⊥ OB).'
    ],
    takeaways: [
      'Kỹ thuật "Kẻ đường song song qua đỉnh góc gãy" là chìa khóa then chốt cho 99% các bài toán góc zích-zắc hình học 7!',
      'Góc ở đỉnh = Tổng hai góc so le trong ở hai đáy (khi cùng hướng).'
    ]
  },
  {
    id: 'adv-5',
    title: 'Tìm giá trị lớn nhất (GTLN) và nhỏ nhất (GTNN) của phân số',
    category: 'Cực trị phân số',
    difficulty: 'Điểm 9 - 10',
    problemText: 'a) Tìm GTLN của biểu thức P = 2025 / (|x - 3| + 5)\nb) Tìm số nguyên x để phân số M = (2x + 7) / (x + 2) nhận giá trị nguyên.',
    hints: [
      'Phân số có tử dương không đổi, muốn đạt GTLN thì mẫu số phải đạt GTNN dương.',
      'Tách tử số theo mẫu số: (2x + 7) = 2(x + 2) + 3, rồi dùng ước số của 3.'
    ],
    solution: [
      'a) Tìm GTLN của P = 2025 / (|x - 3| + 5):',
      '+ Với mọi số hữu tỉ x, ta luôn có |x - 3| ≥ 0.',
      '+ Suy ra |x - 3| + 5 ≥ 5 > 0.',
      '+ Do tử số 2025 > 0 nên: P = 2025 / (|x - 3| + 5) ≤ 2025 / 5 = 405.',
      '+ Dấu "=" xảy ra khi và chỉ khi |x - 3| = 0 ⇔ x = 3.',
      '+ Vậy GTLN của P là 405, đạt được khi x = 3.',
      'b) Tìm x nguyên để M = (2x + 7) / (x + 2) là số nguyên:',
      '+ Biến đổi tử số: M = [2(x + 2) + 3] / (x + 2) = 2 + 3 / (x + 2).',
      '+ Để M là số nguyên thì 3 / (x + 2) phải là số nguyên, tức (x + 2) là ước của 3.',
      '+ Ư(3) = {-3; -1; 1; 3}.',
      '+ Bảng giá trị:',
      '  - x + 2 = -3 ⇒ x = -5',
      '  - x + 2 = -1 ⇒ x = -3',
      '  - x + 2 = 1  ⇒ x = -1',
      '  - x + 2 = 3  ⇒ x = 1',
      '+ Vậy x ∈ {-5; -3; -1; 1}.'
    ],
    takeaways: [
      'Khi tìm GTLN của A / B (với A > 0 hằng số): P đạt max khi mẫu B đạt min > 0.',
      'Phương pháp tách phần nguyên: Chia đa thức tử cho mẫu để đưa về dạng k + c/(mẫu), rồi tìm ước của hằng số c.'
    ]
  }
];
