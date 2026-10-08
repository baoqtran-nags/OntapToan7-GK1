import { Exam } from '../types/math';

export const EXAMS_DATA: Exam[] = [
  // ==========================================
  // ĐỀ MẪU SỐ 1
  // ==========================================
  {
    id: 'de-1',
    code: 'ĐỀ 01',
    title: 'Đề Ôn Tập Giữa Kỳ I - Số 01 (Đề Chuẩn)',
    type: 'sample',
    description: 'Bám sát ma trận chuẩn GDPT 2018: Số hữu tỉ, số thập phân tuần hoàn, góc đối đỉnh - kề bù, quan hệ vuông góc song song.',
    durationMinutes: 90,
    multipleChoice: [
      {
        id: 'de1-mc-1',
        number: 1,
        question: 'Tập hợp số hữu tỉ được kí hiệu là:',
        options: ['N', 'Z', 'Q', 'N*'],
        correctAnswer: 2,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Theo định nghĩa trong SGK Toán 7, tập hợp các số hữu tỉ được kí hiệu là \\(\\mathbb{Q}\\). (Tập số tự nhiên là \\(\\mathbb{N}\\), tập số nguyên là \\(\\mathbb{Z}\\)).',
      },
      {
        id: 'de1-mc-2',
        number: 2,
        question: 'Khẳng định nào dưới đây sai?',
        options: [
          'Số đối của số 12 là -12.',
          'Số đối của -3(5/2) là 3(5/2).',
          'Số đối của 2025 là (-2025).',
          'Số đối của 0 là 0.'
        ],
        correctAnswer: 1,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Số đối của số x là -x. Số đối của 12 là -12; của 2025 là -2025; của 0 là 0. Khẳng định B viết hỗn số không chuẩn hoặc sai quy tắc dấu của phân số, do đó B là phương án sai cần chọn.',
      },
      {
        id: 'de1-mc-3',
        number: 3,
        question: 'Tìm x, biết: 2/3 - (1/3)x = 0',
        options: ['x = -2', 'x = 2', 'x = 0', 'x = 1/3'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Ta có: \\(\\frac{2}{3} - \\frac{1}{3}x = 0 \\Rightarrow \\frac{1}{3}x = \\frac{2}{3} \\Rightarrow x = \\frac{2}{3} : \\frac{1}{3} = 2\\).',
      },
      {
        id: 'de1-mc-4',
        number: 4,
        question: 'Tính giá trị biểu thức A = (2023³ / 2023²) · (1/2)',
        options: ['A = 4046', 'A = 2023/2', 'A = 2/2023', 'A = 1/4046'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Áp dụng quy tắc chia hai lũy thừa cùng cơ số: \\(2023^3 : 2023^2 = 2023^{3-2} = 2023\\). Khi đó: \\(A = 2023 \\cdot \\frac{1}{2} = \\frac{2023}{2}\\).',
      },
      {
        id: 'de1-mc-5',
        number: 5,
        question: 'Chu kỳ của số thập phân vô hạn tuần hoàn -3,45(27) là:',
        options: ['34527', '27', '45', '0,27'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'SoThuc',
        explanation: 'Phần nằm trong dấu ngoặc đơn của số thập phân vô hạn tuần hoàn biểu diễn chu kỳ của số đó. Vậy chu kỳ của -3,45(27) là 27.',
      },
      {
        id: 'de1-mc-6',
        number: 6,
        question: 'Kết quả làm tròn số 0,999 đến chữ số thập phân thứ hai là:',
        options: ['0,10', '0,910', '0,99', '1,00'],
        correctAnswer: 3,
        points: 0.25,
        topic: 'SoThuc',
        explanation: 'Chữ số thập phân thứ hai là 9. Chữ số thập phân ngay sau nó (thứ ba) là 9 (≥ 5), nên ta cộng thêm 1 đơn vị vào chữ số hàng làm tròn: 0,99 + 0,01 = 1,00.',
      },
      {
        id: 'de1-mc-7',
        number: 7,
        question: 'Cho hình vẽ có đường thẳng AH cắt BC tại E. Cặp góc BAH và CBE là cặp góc:',
        options: ['đồng vị', 'trong cùng phía', 'so le trong', 'kề bù'],
        correctAnswer: 2,
        points: 0.25,
        topic: 'HinhHoc',
        diagram: {
          type: 'parallel_transversal',
          title: 'Hình vẽ hai góc BAH và CBE',
          labels: { line1: 'AH', line2: 'BC', trans: 'AB' },
          angles: { angle1: 'BAH', angle2: 'CBE' },
        },
        explanation: 'Hai góc nằm ở hai phía so với đường thẳng cắt (cát tuyến AB) và nằm phía trong hai đường thẳng AH và BC được gọi là cặp góc so le trong.',
      },
      {
        id: 'de1-mc-8',
        number: 8,
        question: 'Cho góc xOy kề bù với góc tOy. Biết góc xOy = 120°. Tính số đo góc tOy:',
        options: ['tOy = 60°', 'tOy = 180°', 'tOy = 120°', 'tOy = 90°'],
        correctAnswer: 0,
        points: 0.25,
        topic: 'HinhHoc',
        diagram: {
          type: 'adjacent_supplementary',
          title: 'Hai góc kề bù xOy và tOy',
          angles: { xOy: 120, tOy: 60 },
        },
        explanation: 'Hai góc kề bù có tổng số đo bằng 180°. Do đó: \\(\\widehat{tOy} = 180^\\circ - \\widehat{xOy} = 180^\\circ - 120^\\circ = 60^\\circ\\).',
      },
    ],
    essay: [
      {
        id: 'de1-es-1',
        number: 1,
        title: 'Bài 1 (2,0 điểm): Thực hiện phép tính',
        totalPoints: 2.0,
        topic: 'SoHuuTi',
        subQuestions: [
          {
            id: 'de1-es-1a',
            label: 'a',
            question: 'Tính: 5/6 - 3/4 + 5/12',
            points: 0.75,
            finalAnswer: '1/2',
            stepByStepSolution: [
              'Tìm mẫu số chung của 6, 4, 12 là 12.',
              'Quy đồng các phân số: 5/6 = 10/12; 3/4 = 9/12; 5/12 = 5/12.',
              'Thực hiện phép tính: 10/12 - 9/12 + 5/12 = (10 - 9 + 5)/12 = 6/12.',
              'Rút gọn phân số về tối giản: 6/12 = 1/2.'
            ],
            rubric: [
              { step: 'Quy đồng mẫu số chung đúng (MC = 12)', points: 0.25 },
              { step: 'Thực hiện phép cộng trừ tử số', points: 0.25 },
              { step: 'Rút gọn ra kết quả tối giản 1/2', points: 0.25 }
            ],
            commonMistakes: ['Quên rút gọn 6/12 thành 1/2', 'Quy đồng sai dấu trừ']
          },
          {
            id: 'de1-es-1b',
            label: 'b',
            question: 'Tính: 5/6 + (2/9) · (3/2)²',
            points: 0.75,
            finalAnswer: '4/3',
            stepByStepSolution: [
              'Tính lũy thừa trước: (3/2)² = 9/4.',
              'Thực hiện phép nhân: (2/9) · (9/4) = 2/4 = 1/2.',
              'Thực hiện phép cộng: 5/6 + 1/2 = 5/6 + 3/6 = 8/6.',
              'Rút gọn: 8/6 = 4/3.'
            ],
            rubric: [
              { step: 'Tính đúng lũy thừa (3/2)² = 9/4', points: 0.25 },
              { step: 'Tính đúng phép nhân (2/9) · (9/4) = 1/2', points: 0.25 },
              { step: 'Cộng và rút gọn ra 4/3 (hoặc 1 1/3)', points: 0.25 }
            ],
            commonMistakes: ['Thực hiện phép cộng trước phép nhân là sai thứ tự ưu tiên', 'Tính nhầm (3/2)² thành 6/4']
          },
          {
            id: 'de1-es-1c',
            label: 'c',
            question: 'Tính hợp lý: (3/20) · (3/2) + (17/20) · (3/2)',
            points: 0.5,
            finalAnswer: '3/2 (hoặc 1,5)',
            stepByStepSolution: [
              'Nhận thấy thừa số chung là (3/2). Áp dụng tính chất phân phối: a·b + a·c = a·(b + c).',
              'Đặt 3/2 ra ngoài: (3/2) · [3/20 + 17/20].',
              'Tính biểu thức trong ngoặc: 3/20 + 17/20 = 20/20 = 1.',
              'Kết quả: (3/2) · 1 = 3/2.'
            ],
            rubric: [
              { step: 'Đặt đúng thừa số chung 3/2', points: 0.25 },
              { step: 'Tính tổng trong ngoặc bằng 1 và ra kết quả 3/2', points: 0.25 }
            ]
          }
        ]
      },
      {
        id: 'de1-es-2',
        number: 2,
        title: 'Bài 2 (1,0 điểm): Tìm x',
        totalPoints: 1.0,
        topic: 'SoHuuTi',
        subQuestions: [
          {
            id: 'de1-es-2a',
            label: 'a',
            question: 'Tìm x, biết: 1/3 - x = 4/7',
            points: 0.5,
            finalAnswer: 'x = -5/21',
            stepByStepSolution: [
              'Chuyển vế: x = 1/3 - 4/7.',
              'Quy đồng mẫu chung là 21: x = 7/21 - 12/21.',
              'Tính toán: x = -5/21.',
              'Kết luận: Vậy x = -5/21.'
            ],
            rubric: [
              { step: 'Chuyển vế đúng: x = 1/3 - 4/7', points: 0.25 },
              { step: 'Tính ra kết quả x = -5/21 và kết luận', points: 0.25 }
            ],
            commonMistakes: ['Chuyển vế quên đổi dấu hoặc lấy 4/7 - 1/3']
          },
          {
            id: 'de1-es-2b',
            label: 'b',
            question: 'Tìm x, biết: 5/4 - (1/4) · (x - 2/3) = 1(3/2) [Quy đổi 1(3/2) = 1 + 3/2 = 5/2]',
            points: 0.5,
            finalAnswer: 'x = -13/3',
            stepByStepSolution: [
              'Chuyển đổi hỗn số: 1(3/2) = 1 + 3/2 = 5/2 (hoặc đề quy ước 5/2).',
              'Giữ nguyên cụm chứa x: (1/4) · (x - 2/3) = 5/4 - 5/2.',
              'Tính vế phải: 5/4 - 10/4 = -5/4.',
              'Chia cả hai vế cho 1/4: x - 2/3 = (-5/4) : (1/4) = -5.',
              'Chuyển vế tìm x: x = -5 + 2/3 = -15/3 + 2/3 = -13/3.',
              'Kết luận: Vậy x = -13/3.'
            ],
            rubric: [
              { step: 'Quy đổi hỗn số và chuyển vế tìm (1/4)(x - 2/3)', points: 0.25 },
              { step: 'Giải tìm x = -13/3 chính xác', points: 0.25 }
            ]
          }
        ]
      },
      {
        id: 'de1-es-3',
        number: 3,
        title: 'Bài 3 (2,0 điểm): Hình học góc đối đỉnh và kề bù',
        totalPoints: 2.0,
        topic: 'HinhHoc',
        diagram: {
          type: 'intersecting_lines',
          title: 'Hai đường thẳng AB và CD cắt nhau tại O (góc AOC = 42°)',
          labels: { line1: 'AB', line2: 'CD', intersection: 'O' },
          angles: { AOC: 42, BOD: 42, AOD: 138, BOC: 138 },
        },
        subQuestions: [
          {
            id: 'de1-es-3a',
            label: 'a',
            question: 'Hai đường thẳng AB và CD cắt nhau tại O tạo thành góc AOC = 42°. Kể tên các cặp góc đối đỉnh.',
            points: 1.0,
            finalAnswer: 'Cặp 1: góc AOC và góc BOD; Cặp 2: góc AOD và góc BOC',
            stepByStepSolution: [
              'Hai đường thẳng AB và CD cắt nhau tại O tạo ra 4 góc: AOC, BOD, AOD, BOC.',
              'Cặp góc đối đỉnh thứ nhất là: góc AOC và góc BOD (tia OA đối tia OB, tia OC đối tia OD).',
              'Cặp góc đối đỉnh thứ hai là: góc AOD và góc BOC (tia OA đối tia OB, tia OD đối tia OC).'
            ],
            rubric: [
              { step: 'Chỉ ra đúng cặp góc AOC và BOD', points: 0.5 },
              { step: 'Chỉ ra đúng cặp góc AOD và BOC', points: 0.5 }
            ]
          },
          {
            id: 'de1-es-3b',
            label: 'b',
            question: 'Tính số đo các góc AOD, BOD và BOC.',
            points: 1.0,
            finalAnswer: 'BOD = 42°; AOD = 138°; BOC = 138°',
            stepByStepSolution: [
              'Vì góc BOD đối đỉnh với góc AOC nên: góc BOD = góc AOC = 42°.',
              'Vì góc AOD và góc AOC là hai góc kề bù nên: góc AOD + góc AOC = 180°.',
              'Suy ra: góc AOD = 180° - 42° = 138°.',
              'Vì góc BOC đối đỉnh với góc AOD nên: góc BOC = góc AOD = 138°.'
            ],
            rubric: [
              { step: 'Tính đúng góc BOD = 42° (nêu lý do đối đỉnh)', points: 0.25 },
              { step: 'Nêu góc kề bù AOD + AOC = 180°', points: 0.25 },
              { step: 'Tính đúng AOD = 138°', points: 0.25 },
              { step: 'Tính đúng BOC = 138° (đối đỉnh)', points: 0.25 }
            ]
          }
        ]
      },
      {
        id: 'de1-es-4',
        number: 4,
        title: 'Bài 4 (2,0 điểm): Hình học đường thẳng song song',
        totalPoints: 2.0,
        topic: 'HinhHoc',
        diagram: {
          type: 'parallel_perpendicular',
          title: 'c ⊥ a tại G, c ⊥ b tại K; góc HEF = 62°',
          labels: { line_a: 'a', line_b: 'b', perp: 'c', trans: 'd' },
          angles: { HEF: 62 },
        },
        subQuestions: [
          {
            id: 'de1-es-4a',
            label: 'a',
            question: 'Cho hình vẽ có c ⊥ a tại G, c ⊥ b tại K. Giải thích tại sao a // b.',
            points: 0.75,
            finalAnswer: 'a // b (vì cùng vuông góc với đường thẳng c)',
            stepByStepSolution: [
              'Ta có: c ⊥ a tại G (theo giả thiết).',
              'Và: c ⊥ b tại K (theo giả thiết).',
              'Áp dụng tính chất từ vuông góc đến song song: "Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì chúng song song với nhau".',
              'Suy ra: a // b.'
            ],
            rubric: [
              { step: 'Nêu giả thiết c ⊥ a và c ⊥ b', points: 0.25 },
              { step: 'Áp dụng định lý từ vuông góc đến song song', points: 0.25 },
              { step: 'Kết luận a // b', points: 0.25 }
            ]
          },
          {
            id: 'de1-es-4b',
            label: 'b',
            question: 'Biết góc HEF = 62°. Tính số đo góc KED (vị trí đối đỉnh với HEF).',
            points: 0.5,
            finalAnswer: 'KED = 62°',
            stepByStepSolution: [
              'Hai góc KED và HEF là hai góc đối đỉnh.',
              'Do hai góc đối đỉnh thì bằng nhau nên: góc KED = góc HEF = 62°.'
            ],
            rubric: [
              { step: 'Chỉ ra hai góc đối đỉnh', points: 0.25 },
              { step: 'Tính ra số đo 62°', points: 0.25 }
            ]
          },
          {
            id: 'de1-es-4c',
            label: 'c',
            question: 'Tính số đo góc GHE (góc trong cùng phía hoặc so le trong với HEF).',
            points: 0.75,
            finalAnswer: 'GHE = 118° (hoặc 62° tuỳ theo vị trí so le hay trong cùng phía)',
            stepByStepSolution: [
              'Vì a // b, góc GHE và góc HEF là hai góc trong cùng phía.',
              'Hai góc trong cùng phía có tổng bằng 180°: góc GHE + góc HEF = 180°.',
              'Suy ra: góc GHE = 180° - 62° = 118°.'
            ],
            rubric: [
              { step: 'Nêu quan hệ góc do a // b', points: 0.25 },
              { step: 'Lập biểu thức tính góc', points: 0.25 },
              { step: 'Tính đúng số đo góc', points: 0.25 }
            ]
          }
        ]
      },
      {
        id: 'de1-es-5',
        number: 5,
        title: 'Bài 6 (1,0 điểm): Bài toán thực tế phân số & số thập phân',
        totalPoints: 1.0,
        topic: 'ThucTe',
        subQuestions: [
          {
            id: 'de1-es-5a',
            label: 'a',
            question: 'Để pha một bình sinh tố, Mai cần dùng sữa, nước ép trái cây và nước. Mai đã cho vào bình 0,75 lít sữa và 1/6 lít nước ép. Tổng thể tích cần dùng là 1(1/4) lít. Hỏi Mai cần thêm bao nhiêu lít nước?',
            points: 1.0,
            finalAnswer: '1/3 lít nước',
            stepByStepSolution: [
              'Đổi các số về cùng đơn vị phân số:',
              '+ Thể tích sữa: 0,75 lít = 3/4 lít.',
              '+ Tổng thể tích: 1(1/4) lít = 1 + 1/4 = 5/4 lít.',
              'Tổng thể tích sữa và nước ép đã cho vào bình là: 3/4 + 1/6 = 9/12 + 2/12 = 11/12 (lít).',
              'Thể tích nước Mai cần thêm là: 5/4 - 11/12 = 15/12 - 11/12 = 4/12 = 1/3 (lít).',
              'Đáp số: Mai cần thêm 1/3 lít nước (khoảng 0,33 lít).'
            ],
            rubric: [
              { step: 'Đổi đúng 0,75 = 3/4 và 1(1/4) = 5/4', points: 0.25 },
              { step: 'Tính tổng lượng sữa và nước ép: 11/12 lít', points: 0.25 },
              { step: 'Lấy tổng trừ đi để tìm lượng nước cần thêm', points: 0.25 },
              { step: 'Rút gọn ra đáp số 1/3 lít và kết luận', points: 0.25 }
            ],
            commonMistakes: ['Đổi sai hỗn số 1 1/4', 'Quy đồng sai mẫu chung của 4 và 6']
          }
        ]
      }
    ]
  },

  // ==========================================
  // ĐỀ MẪU SỐ 2
  // ==========================================
  {
    id: 'de-2',
    code: 'ĐỀ 02',
    title: 'Đề Ôn Tập Giữa Kỳ I - Số 02 (Đề Chuẩn)',
    type: 'sample',
    description: 'Bám sát ma trận: Số hữu tỉ âm, lũy thừa số mũ lớn, làm tròn theo độ chính xác 0,05, góc cắt nhau và góc so le trong.',
    durationMinutes: 90,
    multipleChoice: [
      {
        id: 'de2-mc-1',
        number: 1,
        question: 'Số nào là số hữu tỉ âm?',
        options: ['1(2/7)', '0/11', '-0,22', '3,45'],
        correctAnswer: 2,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Số -0,22 < 0 và viết được dưới dạng phân số -22/100, do đó -0,22 là số hữu tỉ âm. (0/11 = 0 không âm không dương; 1(2/7) và 3,45 là số hữu tỉ dương).',
      },
      {
        id: 'de2-mc-2',
        number: 2,
        question: 'Khẳng định nào sau đây sai?',
        options: [
          'Số đối của -5,9 là 5,9.',
          'Số đối của -1,(74) là 1,(74).',
          'Số đối của 9/8 là -9/8.',
          'Số đối của -1/2 là -2.'
        ],
        correctAnswer: 3,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Số đối của -1/2 phải là 1/2. Khẳng định "Số đối của -1/2 là -2" là sai (đó là số nghịch đảo, không phải số đối).',
      },
      {
        id: 'de2-mc-3',
        number: 3,
        question: 'Tìm x, biết: -x - 1/8 = 1/4',
        options: ['x = -3/8', 'x = -1/2', 'x = 1/8', 'x = -3/4'],
        correctAnswer: 0,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Ta có: -x = 1/4 + 1/8 = 2/8 + 1/8 = 3/8. Suy ra: x = -3/8.',
      },
      {
        id: 'de2-mc-4',
        number: 4,
        question: 'Tính giá trị biểu thức M = (99⁴ · 7¹⁰) / (99² · 7⁹ · 81):',
        options: ['M = 847', 'M = 99/81', 'M = 7/81', 'M = 99'],
        correctAnswer: 0,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Rút gọn từng phần tử cùng cơ số: 99⁴ / 99² = 99² = (9 · 11)² = 81 · 121. Lại có 7¹⁰ / 7⁹ = 7. Do đó: M = (81 · 121 · 7) / 81 = 121 · 7 = 847.',
      },
      {
        id: 'de2-mc-5',
        number: 5,
        question: 'Số thập phân 12,45555... viết gọn là:',
        options: ['12,45', '12,4(5)', '12,(45)', '(12,45)'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'SoThuc',
        explanation: 'Chữ số 5 lặp lại vô hạn bắt đầu sau chữ số 4, nên phần chu kỳ là 5. Viết gọn là 12,4(5).',
      },
      {
        id: 'de2-mc-6',
        number: 6,
        question: 'Làm tròn số 1835,42 với độ chính xác 0,05:',
        options: ['1800', '1835,42', '1840', '1835,4'],
        correctAnswer: 3,
        points: 0.25,
        topic: 'SoThuc',
        explanation: 'Độ chính xác d = 0,05 (ở hàng phần trăm) nên ta làm tròn đến hàng phần mười (hàng lớn hơn liền trước). Chữ số hàng phần trăm là 2 < 5 nên giữ nguyên chữ số hàng phần mười là 4. Kết quả là 1835,4.',
      },
      {
        id: 'de2-mc-7',
        number: 7,
        question: 'Trong hình hai đường thẳng cắt nhau tạo 4 góc O₁, O₂, O₃, O₄ liên tiếp. Cặp góc kề bù là:',
        options: ['O₄ và O₂', 'O₃ và O₁', 'O₂ và O₃', 'Tất cả đều đúng'],
        correctAnswer: 2,
        points: 0.25,
        topic: 'HinhHoc',
        explanation: 'Hai góc kề nhau và có hai tia đối nhau tạo thành góc bẹt (180°) là hai góc kề bù. O₂ và O₃ là hai góc kề bù liên tiếp. (O₁ và O₃; O₂ và O₄ là các cặp góc đối đỉnh).',
      },
      {
        id: 'de2-mc-8',
        number: 8,
        question: 'Cho góc xOy kề bù với góc tOy, biết góc xOy = 120°. Tính số đo góc tOy:',
        options: ['180°', '90°', '120°', '60°'],
        correctAnswer: 3,
        points: 0.25,
        topic: 'HinhHoc',
        explanation: 'Vì hai góc kề bù nên tổng số đo là 180°: \\(\\widehat{tOy} = 180^\\circ - 120^\\circ = 60^\\circ\\).',
      },
    ],
    essay: [
      {
        id: 'de2-es-1',
        number: 1,
        title: 'Bài 1 (2,0 điểm): Thực hiện phép tính',
        totalPoints: 2.0,
        topic: 'SoHuuTi',
        subQuestions: [
          {
            id: 'de2-es-1a',
            label: 'a',
            question: 'Tính: (0,8 - 1/10) - 2',
            points: 0.75,
            finalAnswer: '-1,3 (hoặc -13/10)',
            stepByStepSolution: [
              'Đổi 0,8 về phân số: 0,8 = 8/10.',
              'Tính trong ngoặc: 8/10 - 1/10 = 7/10 = 0,7.',
              'Trừ tiếp cho 2: 0,7 - 2 = -1,3 (hoặc 7/10 - 20/10 = -13/10).'
            ],
            rubric: [
              { step: 'Tính đúng trong ngoặc = 7/10', points: 0.25 },
              { step: 'Thực hiện phép trừ với 2', points: 0.25 },
              { step: 'Ra đáp số chính xác -1,3 hoặc -13/10', points: 0.25 }
            ]
          },
          {
            id: 'de2-es-1b',
            label: 'b',
            question: 'Tính: (4/3 - 1/2) · (2/5)²',
            points: 0.75,
            finalAnswer: '2/15',
            stepByStepSolution: [
              'Tính trong ngoặc: 4/3 - 1/2 = 8/6 - 3/6 = 5/6.',
              'Tính lũy thừa: (2/5)² = 4/25.',
              'Nhân hai phân số: (5/6) · (4/25) = (5 · 4) / (6 · 25) = 20 / 150 = 2/15.'
            ],
            rubric: [
              { step: 'Tính trong ngoặc đúng = 5/6', points: 0.25 },
              { step: 'Tính lũy thừa (2/5)² = 4/25', points: 0.25 },
              { step: 'Nhân và rút gọn ra 2/15', points: 0.25 }
            ]
          },
          {
            id: 'de2-es-1c',
            label: 'c',
            question: 'Tính hợp lý: (1/2) · (3/7) - (1/2) · (4/21)',
            points: 0.5,
            finalAnswer: '5/42',
            stepByStepSolution: [
              'Đặt thừa số chung 1/2 ra ngoài: (1/2) · [3/7 - 4/21].',
              'Quy đồng trong ngoặc với mẫu chung là 21: 3/7 = 9/21.',
              'Tính trong ngoặc: 9/21 - 4/21 = 5/21.',
              'Nhân với 1/2: (1/2) · (5/21) = 5/42.'
            ],
            rubric: [
              { step: 'Đặt đúng thừa số chung 1/2', points: 0.25 },
              { step: 'Tính hiệu trong ngoặc và nhân ra 5/42', points: 0.25 }
            ]
          }
        ]
      },
      {
        id: 'de2-es-2',
        number: 2,
        title: 'Bài 2 (1,0 điểm): Tìm x',
        totalPoints: 1.0,
        topic: 'SoHuuTi',
        subQuestions: [
          {
            id: 'de2-es-2a',
            label: 'a',
            question: 'Tìm x, biết: 2x - 4/3 = 5/6',
            points: 0.5,
            finalAnswer: 'x = 13/12',
            stepByStepSolution: [
              'Chuyển vế: 2x = 5/6 + 4/3.',
              'Quy đồng mẫu số chung là 6: 2x = 5/6 + 8/6 = 13/6.',
              'Tìm x: x = (13/6) : 2 = 13/12.',
              'Kết luận: Vậy x = 13/12.'
            ],
            rubric: [
              { step: 'Chuyển vế và cộng vế phải = 13/6', points: 0.25 },
              { step: 'Tìm ra x = 13/12 và kết luận', points: 0.25 }
            ]
          },
          {
            id: 'de2-es-2b',
            label: 'b',
            question: 'Tìm x, biết: 1/8 - (x + 0,25) = 0',
            points: 0.5,
            finalAnswer: 'x = -1/8',
            stepByStepSolution: [
              'Đổi 0,25 sang phân số: 0,25 = 1/4.',
              'Phương trình trở thành: 1/8 - (x + 1/4) = 0.',
              'Chuyển cụm (x + 1/4) sang vế phải: x + 1/4 = 1/8.',
              'Chuyển vế tìm x: x = 1/8 - 1/4 = 1/8 - 2/8 = -1/8.',
              'Kết luận: Vậy x = -1/8.'
            ],
            rubric: [
              { step: 'Đổi 0,25 = 1/4 và chuyển vế tìm x + 1/4', points: 0.25 },
              { step: 'Tính ra x = -1/8 và kết luận', points: 0.25 }
            ]
          }
        ]
      },
      {
        id: 'de2-es-3',
        number: 3,
        title: 'Bài 3 (2,0 điểm): Hình học góc đối đỉnh',
        totalPoints: 2.0,
        topic: 'HinhHoc',
        diagram: {
          type: 'intersecting_lines',
          title: 'Hai đường thẳng xx\' và yy\' cắt nhau tại O, góc xOy = 60°',
          labels: { line1: 'xx\'', line2: 'yy\'', intersection: 'O' },
          angles: { xOy: 60, "x'Oy'": 60, "x'Oy": 120, "xOy'": 120 },
        },
        subQuestions: [
          {
            id: 'de2-es-3a',
            label: 'a',
            question: 'Cho hai đường thẳng xx\' và yy\' cắt nhau tại O, góc xOy = 60°. Kể tên các cặp góc đối đỉnh.',
            points: 1.0,
            finalAnswer: 'Cặp 1: góc xOy và góc x\'Oy\'; Cặp 2: góc x\'Oy và góc xOy\'',
            stepByStepSolution: [
              'Vẽ hình minh họa: hai đường thẳng xx\' và yy\' giao nhau tại gốc O.',
              'Tia Ox đối với tia Ox\', tia Oy đối với tia Oy\'.',
              'Cặp góc đối đỉnh thứ nhất là: góc xOy và góc x\'Oy\'.',
              'Cặp góc đối đỉnh thứ hai là: góc x\'Oy và góc xOy\'.'
            ],
            rubric: [
              { step: 'Nêu đúng cặp góc xOy và x\'Oy\'', points: 0.5 },
              { step: 'Nêu đúng cặp góc x\'Oy và xOy\'', points: 0.5 }
            ]
          },
          {
            id: 'de2-es-3b',
            label: 'b',
            question: 'Tính số đo góc x\'Oy\' và góc x\'Oy.',
            points: 1.0,
            finalAnswer: "x'Oy' = 60°; x'Oy = 120°",
            stepByStepSolution: [
              'Vì góc x\'Oy\' và góc xOy là hai góc đối đỉnh nên:',
              'góc x\'Oy\' = góc xOy = 60°.',
              'Vì góc x\'Oy và góc xOy là hai góc kề bù nên: góc x\'Oy + góc xOy = 180°.',
              'Suy ra: góc x\'Oy = 180° - 60° = 120°.'
            ],
            rubric: [
              { step: 'Tính đúng góc x\'Oy\' = 60° kèm lý do đối đỉnh', points: 0.5 },
              { step: 'Tính đúng góc x\'Oy = 120° kèm lý do kề bù', points: 0.5 }
            ]
          }
        ]
      },
      {
        id: 'de2-es-4',
        number: 4,
        title: 'Bài 4 (2,0 điểm): Chứng minh song song và tính góc',
        totalPoints: 2.0,
        topic: 'HinhHoc',
        diagram: {
          type: 'zigzag_angle',
          title: 'AB // tia Dx, góc ABD = 35° và góc BDC = 35°',
          angles: { ABD: 35, BDC: 35 },
        },
        subQuestions: [
          {
            id: 'de2-es-4a',
            label: 'a',
            question: 'Cho hình vẽ có tia BD cắt đường thẳng DC tại D sao cho góc ABD = 35° và góc BDC = 35°. Giải thích tại sao AB // DC.',
            points: 1.0,
            finalAnswer: 'AB // DC vì có cặp góc so le trong bằng nhau (góc ABD = góc BDC = 35°)',
            stepByStepSolution: [
              'Xét hai đường thẳng AB và DC cùng bị cắt bởi đường thẳng BD.',
              'Ta có góc ABD và góc BDC ở vị trí so le trong.',
              'Mà theo giả thiết: góc ABD = góc BDC = 35°.',
              'Theo dấu hiệu nhận biết hai đường thẳng song song: "Nếu một đường thẳng cắt hai đường thẳng mà tạo thành một cặp góc so le trong bằng nhau thì hai đường thẳng đó song song".',
              'Vậy AB // DC.'
            ],
            rubric: [
              { step: 'Chỉ ra vị trí hai góc là so le trong', points: 0.5 },
              { step: 'Nêu số đo bằng nhau (= 35°) và kết luận AB // DC', points: 0.5 }
            ]
          },
          {
            id: 'de2-es-4b',
            label: 'b',
            question: 'Nếu kẻ tia Bx cùng hướng với DC, tính số đo các góc liên quan DBx và ABy (biết góc kề bù với ABD là 145°).',
            points: 1.0,
            finalAnswer: 'Góc kề bù = 180° - 35° = 145°',
            stepByStepSolution: [
              'Vì góc ABy kề bù với góc ABD nên: góc ABy = 180° - góc ABD = 180° - 35° = 145°.',
              'Áp dụng tính chất các góc so le trong và đồng vị khi AB // DC để suy ra các số đo góc tương ứng.'
            ],
            rubric: [
              { step: 'Sử dụng tính chất kề bù hoặc tính chất góc song song', points: 0.5 },
              { step: 'Tính ra kết quả góc chính xác', points: 0.5 }
            ]
          }
        ]
      },
      {
        id: 'de2-es-5',
        number: 5,
        title: 'Bài 5 (1,0 điểm): Bài toán thực tế khối lượng',
        totalPoints: 1.0,
        topic: 'ThucTe',
        subQuestions: [
          {
            id: 'de2-es-5a',
            label: 'a',
            question: 'Nam mua 750 g quýt, 1(3/5) kg táo và một lượng mận. Tổng khối lượng trái cây Nam đã mua là 4,4 kg. Tính khối lượng mận Nam đã mua (theo đơn vị kg).',
            points: 1.0,
            finalAnswer: '2,05 kg (hoặc 2050 g)',
            stepByStepSolution: [
              'Đổi các khối lượng về cùng đơn vị kilôgam (kg):',
              '+ Khối lượng quýt: 750 g = 750 : 1000 = 0,75 kg.',
              '+ Khối lượng táo: 1(3/5) kg = 1 + 3/5 = 1 + 0,6 = 1,6 kg.',
              'Tổng khối lượng quýt và táo Nam đã mua là: 0,75 + 1,6 = 2,35 (kg).',
              'Khối lượng mận Nam đã mua là: 4,4 - 2,35 = 2,05 (kg).',
              'Đáp số: Nam đã mua 2,05 kg mận (tức 2050 g).'
            ],
            rubric: [
              { step: 'Đổi đúng 750 g = 0,75 kg và 1(3/5) kg = 1,6 kg', points: 0.25 },
              { step: 'Tính tổng khối lượng quýt và táo: 2,35 kg', points: 0.25 },
              { step: 'Lấy tổng trừ đi để tính khối lượng mận', points: 0.25 },
              { step: 'Đáp số chính xác 2,05 kg và kết luận', points: 0.25 }
            ],
            commonMistakes: ['Quên đổi 750 g ra kg mà lấy 4,4 - 750', 'Đổi sai hỗn số 1 3/5']
          }
        ]
      }
    ]
  },

  // ==========================================
  // ĐỀ MẪU SỐ 3
  // ==========================================
  {
    id: 'de-3',
    code: 'ĐỀ 03',
    title: 'Đề Ôn Tập Giữa Kỳ I - Số 03 (Đề Chuẩn)',
    type: 'sample',
    description: 'Bám sát ma trận: Làm tròn theo độ chính xác d = 50, rút gọn lũy thừa, góc kề bù, chứng minh đường thẳng song song qua góc đồng vị.',
    durationMinutes: 90,
    multipleChoice: [
      {
        id: 'de3-mc-1',
        number: 1,
        question: 'Làm tròn số 42683,4 với độ chính xác 50:',
        options: ['42700', '42683', '42680', '43000'],
        correctAnswer: 0,
        points: 0.25,
        topic: 'SoThuc',
        explanation: 'Độ chính xác d = 50 (hàng chục) nên ta làm tròn đến hàng trăm. Chữ số hàng chục của 42683,4 là 8 (≥ 5), do đó ta cộng 1 đơn vị vào chữ số hàng trăm (6 + 1 = 7) và thay các chữ số sau bằng 0: kết quả là 42700.',
      },
      {
        id: 'de3-mc-2',
        number: 2,
        question: 'Tìm x, biết: -(3/4)x + 1/2 = 0',
        options: ['x = 6', 'x = -6', 'x = 2/3', 'x = -2/3'],
        correctAnswer: 2,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Ta có: -(3/4)x = -1/2 \\Rightarrow x = (-1/2) : (-3/4) = (-1/2) · (-4/3) = 4/6 = 2/3.',
      },
      {
        id: 'de3-mc-3',
        number: 3,
        question: 'Chu kỳ của số thập phân -3,14(5) là:',
        options: ['3145', '45', '5', '0,3145'],
        correctAnswer: 2,
        points: 0.25,
        topic: 'SoThuc',
        explanation: 'Chu kỳ là phần số nằm trong ngoặc đơn sau dấu phẩy lặp lại vô hạn lần, ở đây là chữ số 5.',
      },
      {
        id: 'de3-mc-4',
        number: 4,
        question: 'Hai đường thẳng cắt nhau tạo thành các góc O₁, O₂, O₃, O₄ đối nhau lần lượt. Cặp góc đối đỉnh là:',
        options: ['O₁ và O₂', 'O₂ và O₃', 'O₁ và O₄', 'O₁ và O₃'],
        correctAnswer: 3,
        points: 0.25,
        topic: 'HinhHoc',
        explanation: 'Khi đánh số 4 góc theo thứ tự vòng tròn O₁, O₂, O₃, O₄ thì các góc đối diện nhau qua đỉnh O là O₁ với O₃, và O₂ với O₄.',
      },
      {
        id: 'de3-mc-5',
        number: 5,
        question: 'Tính giá trị A = 1201³ / [1201² · (1/2)]:',
        options: ['A = 1201', 'A = 2402', 'A = 2/1201', 'A = 1/1201'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Ta có: 1201³ / 1201² = 1201. Khi đó: A = 1201 : (1/2) = 1201 · 2 = 2402.',
      },
      {
        id: 'de3-mc-6',
        number: 6,
        question: 'Số nào sau đây là số hữu tỉ âm?',
        options: ['4/7', '0/5', '0,65', '-2(1/3)'],
        correctAnswer: 3,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Hỗn số -2(1/3) = -(2 + 1/3) = -7/3 < 0, là số hữu tỉ âm. Các số 4/7 và 0,65 > 0; 0/5 = 0.',
      },
      {
        id: 'de3-mc-7',
        number: 7,
        question: 'Cho góc xOy kề bù với góc tOy, biết góc tOy = 50°. Số đo góc xOy là:',
        options: ['90°', '130°', '60°', '0°'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'HinhHoc',
        explanation: 'Hai góc kề bù có tổng số đo bằng 180°: \\(\\widehat{xOy} = 180^\\circ - 50^\\circ = 130^\\circ\\).',
      },
      {
        id: 'de3-mc-8',
        number: 8,
        question: 'Khẳng định nào sau đây sai?',
        options: [
          'Số đối của 0,8 là -0,8.',
          'Số đối của -2,5(4) là 2,5(4).',
          'Số đối của -2/3 là 2/3.',
          'Số đối của -6/7 là -(-7/6).'
        ],
        correctAnswer: 3,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Số đối của -6/7 là 6/7. Trong khi đó, -(-7/6) = 7/6 (khác 6/7). Vì vậy khẳng định D là sai.',
      },
    ],
    essay: [
      {
        id: 'de3-es-1',
        number: 1,
        title: 'Bài 1 (2,0 điểm): Thực hiện phép tính',
        totalPoints: 2.0,
        topic: 'SoHuuTi',
        subQuestions: [
          {
            id: 'de3-es-1a',
            label: 'a',
            question: 'Tính: 2/5 - 3/4 + 1/2',
            points: 0.75,
            finalAnswer: '3/20',
            stepByStepSolution: [
              'Mẫu số chung của 5, 4, 2 là 20.',
              'Quy đồng: 2/5 = 8/20; 3/4 = 15/20; 1/2 = 10/20.',
              'Thực hiện tính: (8 - 15 + 10) / 20 = 3/20.'
            ],
            rubric: [
              { step: 'Quy đồng mẫu đúng = 20', points: 0.25 },
              { step: 'Thực hiện phép tính trên tử', points: 0.25 },
              { step: 'Ra kết quả 3/20', points: 0.25 }
            ]
          },
          {
            id: 'de3-es-1b',
            label: 'b',
            question: 'Tính: 1/3 - (5/6) : (5/3)²',
            points: 0.75,
            finalAnswer: '1/30',
            stepByStepSolution: [
              'Tính lũy thừa trước: (5/3)² = 25/9.',
              'Thực hiện phép chia: (5/6) : (25/9) = (5/6) · (9/25) = (5 · 9) / (6 · 25) = 45 / 150 = 3/10.',
              'Thực hiện phép trừ: 1/3 - 3/10 = 10/30 - 9/30 = 1/30.'
            ],
            rubric: [
              { step: 'Tính (5/3)² = 25/9', points: 0.25 },
              { step: 'Thực hiện phép chia = 3/10', points: 0.25 },
              { step: 'Trừ ra kết quả 1/30', points: 0.25 }
            ]
          },
          {
            id: 'de3-es-1c',
            label: 'c',
            question: 'Tính hợp lý: (2/19) · (3/7) + (17/19) · (3/7)',
            points: 0.5,
            finalAnswer: '3/7',
            stepByStepSolution: [
              'Đặt thừa số chung 3/7 ra ngoài: (3/7) · [2/19 + 17/19].',
              'Tính tổng trong ngoặc: 2/19 + 17/19 = 19/19 = 1.',
              'Nhân với 3/7: (3/7) · 1 = 3/7.'
            ],
            rubric: [
              { step: 'Đặt đúng thừa số chung 3/7', points: 0.25 },
              { step: 'Tính trong ngoặc = 1 và ra đáp số 3/7', points: 0.25 }
            ]
          }
        ]
      },
      {
        id: 'de3-es-2',
        number: 2,
        title: 'Bài 2 (1,0 điểm): Tìm x',
        totalPoints: 1.0,
        topic: 'SoHuuTi',
        subQuestions: [
          {
            id: 'de3-es-2a',
            label: 'a',
            question: 'Tìm x, biết: 3/7 + x = 1/2',
            points: 0.5,
            finalAnswer: 'x = 1/14',
            stepByStepSolution: [
              'Chuyển vế: x = 1/2 - 3/7.',
              'Quy đồng mẫu chung là 14: x = 7/14 - 6/14.',
              'Tính toán: x = 1/14.',
              'Kết luận: Vậy x = 1/14.'
            ],
            rubric: [
              { step: 'Chuyển vế đúng x = 1/2 - 3/7', points: 0.25 },
              { step: 'Quy đồng và tính ra x = 1/14', points: 0.25 }
            ]
          },
          {
            id: 'de3-es-2b',
            label: 'b',
            question: 'Tìm x, biết: (x - 2/3) : (-1/4) = 0,8',
            points: 0.5,
            finalAnswer: 'x = 7/15',
            stepByStepSolution: [
              'Đổi 0,8 sang phân số: 0,8 = 4/5.',
              'Tìm số bị chia: x - 2/3 = (4/5) · (-1/4).',
              'Rút gọn: x - 2/3 = -1/5.',
              'Chuyển vế tìm x: x = -1/5 + 2/3 = -3/15 + 10/15 = 7/15.',
              'Kết luận: Vậy x = 7/15.'
            ],
            rubric: [
              { step: 'Nhân hai vế tìm x - 2/3 = -1/5', points: 0.25 },
              { step: 'Chuyển vế tìm ra x = 7/15', points: 0.25 }
            ]
          }
        ]
      },
      {
        id: 'de3-es-3',
        number: 3,
        title: 'Bài 3 (2,0 điểm): Góc trên đường thẳng',
        totalPoints: 2.0,
        topic: 'HinhHoc',
        subQuestions: [
          {
            id: 'de3-es-3a',
            label: 'a',
            question: 'Trên đường thẳng mn lấy điểm O. Vẽ tia Ox và Ot trên cùng một nửa mặt phẳng sao cho góc mOx = 30°, góc tOx = 70° (sao cho Ox nằm giữa Om và Ot). Kể tên các cặp góc kề bù.',
            points: 1.0,
            finalAnswer: 'Các cặp góc kề bù: (góc mOx và góc nOx); (góc mOt và góc nOt)',
            stepByStepSolution: [
              'Vì O nằm trên đường thẳng mn nên Om và On là hai tia đối nhau, tạo thành góc bẹt mOn = 180°.',
              'Tia Ox tạo với Om và On hai góc kề bù là: góc mOx và góc nOx.',
              'Tương tự tia Ot tạo với Om và On hai góc kề bù là: góc mOt và góc nOt.'
            ],
            rubric: [
              { step: 'Chỉ ra cặp góc mOx và nOx kề bù', points: 0.5 },
              { step: 'Chỉ ra cặp góc mOt và nOt kề bù', points: 0.5 }
            ]
          },
          {
            id: 'de3-es-3b',
            label: 'b',
            question: 'Tính số đo góc nOx và góc nOt (biết góc mOt = góc mOx + góc tOx = 30° + 70° = 100°).',
            points: 1.0,
            finalAnswer: 'nOx = 150°; nOt = 80°',
            stepByStepSolution: [
              'Vì góc mOx và góc nOx kề bù nên: góc nOx = 180° - góc mOx = 180° - 30° = 150°.',
              'Vì Ox nằm giữa Om và Ot nên: góc mOt = góc mOx + góc xOt = 30° + 70° = 100°.',
              'Vì góc mOt và góc nOt kề bù nên: góc nOt = 180° - góc mOt = 180° - 100° = 80°.'
            ],
            rubric: [
              { step: 'Tính đúng góc nOx = 150°', points: 0.5 },
              { step: 'Tính đúng góc mOt = 100° và suy ra nOt = 80°', points: 0.5 }
            ]
          }
        ]
      },
      {
        id: 'de3-es-4',
        number: 4,
        title: 'Bài 4 (2,0 điểm): Chứng minh song song từ góc đồng vị',
        totalPoints: 2.0,
        topic: 'HinhHoc',
        subQuestions: [
          {
            id: 'de3-es-4a',
            label: 'a',
            question: 'Cho hai đường thẳng a và b bị cắt bởi cát tuyến c. Tại giao điểm A có góc A₁ = 105°, tại giao điểm D có góc D₁ = 105° (hai góc ở vị trí đồng vị). Giải thích tại sao a // b.',
            points: 1.0,
            finalAnswer: 'a // b vì có hai góc đồng vị bằng nhau (A₁ = D₁ = 105°)',
            stepByStepSolution: [
              'Xét hai đường thẳng a và b cùng bị cắt bởi đường thẳng c.',
              'Theo giả thiết, góc A₁ và góc D₁ ở vị trí đồng vị.',
              'Và góc A₁ = góc D₁ = 105°.',
              'Theo dấu hiệu nhận biết hai đường thẳng song song: "Nếu một đường thẳng cắt hai đường thẳng mà tạo thành một cặp góc đồng vị bằng nhau thì hai đường thẳng đó song song".',
              'Do đó: a // b.'
            ],
            rubric: [
              { step: 'Chỉ ra vị trí đồng vị của hai góc A₁ và D₁', points: 0.5 },
              { step: 'Nêu số đo bằng nhau (= 105°) và kết luận a // b', points: 0.5 }
            ]
          },
          {
            id: 'de3-es-4b',
            label: 'b',
            question: 'Đường thẳng thứ hai cắt a tại B và cắt b tại C sao cho góc B₁ = 120°. Tính số đo góc so le trong C₁ và góc trong cùng phía C₂.',
            points: 1.0,
            finalAnswer: 'C₁ = 120° (so le trong); C₂ = 60° (trong cùng phía)',
            stepByStepSolution: [
              'Vì a // b nên:',
              '+ Góc C₁ ở vị trí so le trong với góc B₁ nên: góc C₁ = góc B₁ = 120°.',
              '+ Góc C₂ ở vị trí trong cùng phía với góc B₁ nên: góc C₂ + góc B₁ = 180°.',
              'Suy ra: góc C₂ = 180° - 120° = 60°.'
            ],
            rubric: [
              { step: 'Tính đúng góc so le trong C₁ = 120°', points: 0.5 },
              { step: 'Tính đúng góc trong cùng phía C₂ = 60°', points: 0.5 }
            ]
          }
        ]
      },
      {
        id: 'de3-es-5',
        number: 5,
        title: 'Bài 5 (1,0 điểm): Bài toán thực tế thời gian',
        totalPoints: 1.0,
        topic: 'ThucTe',
        subQuestions: [
          {
            id: 'de3-es-5a',
            label: 'a',
            question: 'An dành 0,75 giờ để mua thực phẩm, 1(1/6) giờ sơ chế và một khoảng thời gian đóng gói. Biết tổng thời gian An thực hiện toàn bộ công việc là 2 giờ 15 phút. Tính thời gian An đã dùng để đóng gói (theo đơn vị giờ và phút).',
            points: 1.0,
            finalAnswer: '1/3 giờ (tương đương 20 phút)',
            stepByStepSolution: [
              'Đổi tất cả các đại lượng thời gian về đơn vị giờ (dạng phân số):',
              '+ Thời gian mua thực phẩm: 0,75 giờ = 3/4 giờ (tức 45 phút).',
              '+ Thời gian sơ chế: 1(1/6) giờ = 7/6 giờ (tức 70 phút).',
              '+ Tổng thời gian: 2 giờ 15 phút = 2 + 15/60 = 2 + 1/4 = 9/4 giờ (tức 135 phút).',
              'Thời gian An dùng để đóng gói là: 9/4 - (3/4 + 7/6) = (9/4 - 3/4) - 7/6 = 6/4 - 7/6 = 3/2 - 7/6 = 9/6 - 7/6 = 2/6 = 1/3 (giờ).',
              'Đổi ra phút: 1/3 giờ = (1/3) · 60 = 20 phút.',
              'Đáp số: An đã dùng 1/3 giờ (20 phút) để đóng gói thực phẩm.'
            ],
            rubric: [
              { step: 'Đổi đúng 0,75 h = 3/4 h; 1(1/6) h = 7/6 h; 2 h 15 p = 9/4 h', points: 0.25 },
              { step: 'Lập phép tính tìm thời gian đóng gói', points: 0.25 },
              { step: 'Tính ra kết quả 1/3 giờ', points: 0.25 },
              { step: 'Đổi ra 20 phút và kết luận', points: 0.25 }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // ĐỀ BIÊN SOẠN MỚI SỐ 4
  // ==========================================
  {
    id: 'de-4',
    code: 'ĐỀ 04',
    title: 'Đề Ôn Tập Giữa Kỳ I - Số 04 (Biên Soạn Chuẩn GDPT 2018)',
    type: 'reference',
    description: 'Biên soạn mới theo đúng ma trận: Phân số hữu tỉ âm/dương, quy tắc dấu ngoặc, lũy thừa, làm tròn hàng phần mười, đường thẳng song song vuông góc và bài toán nông sản.',
    durationMinutes: 90,
    multipleChoice: [
      {
        id: 'de4-mc-1',
        number: 1,
        question: 'Số nào sau đây biểu diễn số hữu tỉ dương?',
        options: ['-3/(-5)', '0/7', '-2/9', '-1,5'],
        correctAnswer: 0,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Ta có -3/(-5) = 3/5 > 0, là một số hữu tỉ dương. (0/7 = 0; -2/9 < 0; -1,5 < 0).',
      },
      {
        id: 'de4-mc-2',
        number: 2,
        question: 'Khẳng định nào sau đây đúng về số đối?',
        options: [
          'Số đối của 3/4 là 4/3.',
          'Số đối của -(-2,8) là 2,8.',
          'Số đối của -5/7 là 5/7.',
          'Số đối của -10 là -(-(-10)).'
        ],
        correctAnswer: 2,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Số đối của số hữu tỉ a là -a. Do đó số đối của -5/7 là -(-5/7) = 5/7.',
      },
      {
        id: 'de4-mc-3',
        number: 3,
        question: 'Tìm x, biết: (3/5)x - 1/2 = 0',
        options: ['x = 5/6', 'x = 3/10', 'x = -5/6', 'x = 6/5'],
        correctAnswer: 0,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Chuyển vế: (3/5)x = 1/2 \\Rightarrow x = (1/2) : (3/5) = (1/2) · (5/3) = 5/6.',
      },
      {
        id: 'de4-mc-4',
        number: 4,
        question: 'Tính giá trị biểu thức P = (15⁵ / 15³) · (1/3)²:',
        options: ['P = 25', 'P = 75', 'P = 15', 'P = 225'],
        correctAnswer: 0,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: '15⁵ / 15³ = 15² = 225. Lại có (1/3)² = 1/9. Vậy P = 225 · (1/9) = 225 / 9 = 25.',
      },
      {
        id: 'de4-mc-5',
        number: 5,
        question: 'Chu kỳ của số thập phân vô hạn tuần hoàn 5,2(18) là:',
        options: ['5218', '218', '18', '2'],
        correctAnswer: 2,
        points: 0.25,
        topic: 'SoThuc',
        explanation: 'Các chữ số nằm trong dấu ngoặc đơn là chu kỳ tuần hoàn, ở đây là 18.',
      },
      {
        id: 'de4-mc-6',
        number: 6,
        question: 'Kết quả làm tròn số 375,682 đến chữ số thập phân thứ nhất (hàng phần mười) là:',
        options: ['375,6', '375,7', '376,0', '375,68'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'SoThuc',
        explanation: 'Chữ số ở hàng phần mười là 6. Chữ số ngay sau nó là 8 (≥ 5), nên cộng thêm 1 vào chữ số 6 thành 7. Kết quả là 375,7.',
      },
      {
        id: 'de4-mc-7',
        number: 7,
        question: 'Cho hai đường thẳng a và b cắt bởi c tạo thành góc A₁ và B₃ ở vị trí so le trong. Nếu A₁ = 70° và a // b thì số đo góc B₃ là:',
        options: ['70°', '110°', '180°', '20°'],
        correctAnswer: 0,
        points: 0.25,
        topic: 'HinhHoc',
        explanation: 'Khi hai đường thẳng song song, hai góc so le trong thì bằng nhau: B₃ = A₁ = 70°.',
      },
      {
        id: 'de4-mc-8',
        number: 8,
        question: 'Cho góc mOn và góc nOp là hai góc kề bù. Biết góc mOn = 75°. Số đo góc nOp là:',
        options: ['105°', '15°', '75°', '90°'],
        correctAnswer: 0,
        points: 0.25,
        topic: 'HinhHoc',
        explanation: 'Hai góc kề bù có tổng số đo bằng 180°: góc nOp = 180° - 75° = 105°.',
      },
    ],
    essay: [
      {
        id: 'de4-es-1',
        number: 1,
        title: 'Bài 1 (2,0 điểm): Thực hiện phép tính',
        totalPoints: 2.0,
        topic: 'SoHuuTi',
        subQuestions: [
          {
            id: 'de4-es-1a',
            label: 'a',
            question: 'Tính: 7/12 + 1/4 - 5/6',
            points: 0.75,
            finalAnswer: '0',
            stepByStepSolution: [
              'Mẫu số chung của 12, 4, 6 là 12.',
              'Quy đồng: 7/12 giữ nguyên; 1/4 = 3/12; 5/6 = 10/12.',
              'Tính toán: 7/12 + 3/12 - 10/12 = (7 + 3 - 10) / 12 = 0/12 = 0.'
            ],
            rubric: [
              { step: 'Quy đồng đúng mẫu chung 12', points: 0.25 },
              { step: 'Thực hiện phép tính trên tử số', points: 0.25 },
              { step: 'Ra kết quả chính xác = 0', points: 0.25 }
            ]
          },
          {
            id: 'de4-es-1b',
            label: 'b',
            question: 'Tính: 3/4 - (1/4) · (2/3)²',
            points: 0.75,
            finalAnswer: '23/36',
            stepByStepSolution: [
              'Tính lũy thừa trước: (2/3)² = 4/9.',
              'Thực hiện phép nhân: (1/4) · (4/9) = 1/9.',
              'Thực hiện phép trừ: 3/4 - 1/9 = 27/36 - 4/36 = 23/36.'
            ],
            rubric: [
              { step: 'Tính lũy thừa (2/3)² = 4/9', points: 0.25 },
              { step: 'Nhân rút gọn ra 1/9', points: 0.25 },
              { step: 'Trừ hai phân số ra 23/36', points: 0.25 }
            ]
          },
          {
            id: 'de4-es-1c',
            label: 'c',
            question: 'Tính hợp lý: (5/13) · (-2/7) + (8/13) · (-2/7)',
            points: 0.5,
            finalAnswer: '-2/7',
            stepByStepSolution: [
              'Đặt thừa số chung (-2/7) ra ngoài: (-2/7) · [5/13 + 8/13].',
              'Tính tổng trong ngoặc: 5/13 + 8/13 = 13/13 = 1.',
              'Kết quả: (-2/7) · 1 = -2/7.'
            ],
            rubric: [
              { step: 'Đặt đúng thừa số chung (-2/7)', points: 0.25 },
              { step: 'Tính ra kết quả -2/7', points: 0.25 }
            ]
          }
        ]
      },
      {
        id: 'de4-es-2',
        number: 2,
        title: 'Bài 2 (1,0 điểm): Tìm x',
        totalPoints: 1.0,
        topic: 'SoHuuTi',
        subQuestions: [
          {
            id: 'de4-es-2a',
            label: 'a',
            question: 'Tìm x, biết: x + 3/8 = 7/12',
            points: 0.5,
            finalAnswer: 'x = 5/24',
            stepByStepSolution: [
              'Chuyển vế: x = 7/12 - 3/8.',
              'Mẫu số chung của 12 và 8 là 24: x = 14/24 - 9/24.',
              'Tính ra: x = 5/24.',
              'Kết luận: Vậy x = 5/24.'
            ],
            rubric: [
              { step: 'Chuyển vế đúng x = 7/12 - 3/8', points: 0.25 },
              { step: 'Tính ra x = 5/24 và kết luận', points: 0.25 }
            ]
          },
          {
            id: 'de4-es-2b',
            label: 'b',
            question: 'Tìm x, biết: 2/3 - (x - 1/2) = 0,25',
            points: 0.5,
            finalAnswer: 'x = 11/12',
            stepByStepSolution: [
              'Đổi 0,25 sang phân số: 0,25 = 1/4.',
              'Ta có: x - 1/2 = 2/3 - 1/4 = 8/12 - 3/12 = 5/12.',
              'Chuyển vế tìm x: x = 5/12 + 1/2 = 5/12 + 6/12 = 11/12.',
              'Kết luận: Vậy x = 11/12.'
            ],
            rubric: [
              { step: 'Đổi 0,25 = 1/4 và tìm x - 1/2 = 5/12', points: 0.25 },
              { step: 'Tính ra x = 11/12 và kết luận', points: 0.25 }
            ]
          }
        ]
      },
      {
        id: 'de4-es-3',
        number: 3,
        title: 'Bài 3 (2,0 điểm): Hình học góc đối đỉnh và kề bù',
        totalPoints: 2.0,
        topic: 'HinhHoc',
        subQuestions: [
          {
            id: 'de4-es-3a',
            label: 'a',
            question: 'Hai đường thẳng xy và zt cắt nhau tại O tạo thành góc xOz = 50°. Kể tên các cặp góc đối đỉnh có trên hình.',
            points: 1.0,
            finalAnswer: 'Cặp 1: góc xOz và góc yOt; Cặp 2: góc xOt và góc yOz',
            stepByStepSolution: [
              'Tia Ox đối với Oy, tia Oz đối với Ot.',
              'Cặp góc đối đỉnh thứ nhất là: góc xOz và góc yOt.',
              'Cặp góc đối đỉnh thứ hai là: góc xOt và góc yOz.'
            ],
            rubric: [
              { step: 'Nêu đúng cặp góc đối đỉnh 1', points: 0.5 },
              { step: 'Nêu đúng cặp góc đối đỉnh 2', points: 0.5 }
            ]
          },
          {
            id: 'de4-es-3b',
            label: 'b',
            question: 'Tính số đo các góc yOt, xOt và yOz.',
            points: 1.0,
            finalAnswer: 'yOt = 50°; xOt = 130°; yOz = 130°',
            stepByStepSolution: [
              'Vì góc yOt đối đỉnh với góc xOz nên: góc yOt = góc xOz = 50°.',
              'Vì góc xOt và góc xOz kề bù nên: góc xOt + góc xOz = 180°.',
              'Suy ra: góc xOt = 180° - 50° = 130°.',
              'Vì góc yOz đối đỉnh với góc xOt nên: góc yOz = góc xOt = 130°.'
            ],
            rubric: [
              { step: 'Tính đúng góc yOt = 50°', points: 0.25 },
              { step: 'Nêu tính chất kề bù', points: 0.25 },
              { step: 'Tính đúng góc xOt = 130°', points: 0.25 },
              { step: 'Tính đúng góc yOz = 130°', points: 0.25 }
            ]
          }
        ]
      },
      {
        id: 'de4-es-4',
        number: 4,
        title: 'Bài 4 (2,0 điểm): Hai đường thẳng cùng vuông góc với một đường thẳng',
        totalPoints: 2.0,
        topic: 'HinhHoc',
        diagram: {
          type: 'parallel_perpendicular',
          title: 'd ⊥ m tại A, d ⊥ n tại B; đường thẳng c cắt m tại C, n tại D; góc C₁ = 65°',
          angles: { C1: 65, D1: 65, D2: 115 },
        },
        subQuestions: [
          {
            id: 'de4-es-4a',
            label: 'a',
            question: 'Cho hình vẽ có d ⊥ m tại A và d ⊥ n tại B. Giải thích tại sao m // n.',
            points: 1.0,
            finalAnswer: 'm // n vì hai đường thẳng phân biệt cùng vuông góc với đường thẳng d',
            stepByStepSolution: [
              'Ta có: d ⊥ m tại A (theo giả thiết).',
              'd ⊥ n tại B (theo giả thiết).',
              'Áp dụng định lý: "Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì chúng song song với nhau".',
              'Suy ra: m // n.'
            ],
            rubric: [
              { step: 'Ghi rõ giả thiết hai đường thẳng vuông góc d', points: 0.5 },
              { step: 'Trích dẫn định lý và kết luận m // n', points: 0.5 }
            ]
          },
          {
            id: 'de4-es-4b',
            label: 'b',
            question: 'Đường thẳng c cắt m tại C và cắt n tại D sao cho góc C₁ = 65°. Tính số đo góc so le trong D₁ và góc trong cùng phía D₂.',
            points: 1.0,
            finalAnswer: 'D₁ = 65° (so le trong); D₂ = 115° (trong cùng phía)',
            stepByStepSolution: [
              'Vì m // n nên:',
              '+ Góc D₁ so le trong với góc C₁ nên: góc D₁ = góc C₁ = 65°.',
              '+ Góc D₂ trong cùng phía với góc C₁ nên: góc D₂ + góc C₁ = 180°.',
              'Suy ra: góc D₂ = 180° - 65° = 115°.'
            ],
            rubric: [
              { step: 'Tính đúng góc so le trong D₁ = 65°', points: 0.5 },
              { step: 'Tính đúng góc trong cùng phía D₂ = 115°', points: 0.5 }
            ]
          }
        ]
      },
      {
        id: 'de4-es-5',
        number: 5,
        title: 'Bài 5 (1,0 điểm): Bài toán thực tế nông sản',
        totalPoints: 1.0,
        topic: 'ThucTe',
        subQuestions: [
          {
            id: 'de4-es-5a',
            label: 'a',
            question: 'Bác Ba thu hoạch được 120 kg rau củ. Buổi sáng bác bán được 2/5 số rau củ đó. Buổi chiều bác bán thêm 0,35 số rau củ ban đầu. Hỏi sau hai buổi, bác Ba còn lại bao nhiêu kg rau củ?',
            points: 1.0,
            finalAnswer: '30 kg rau củ',
            stepByStepSolution: [
              'Số kg rau củ bác Ba bán được trong buổi sáng là: 120 · (2/5) = 48 (kg).',
              'Số kg rau củ bác Ba bán được trong buổi chiều là: 120 · 0,35 = 42 (kg).',
              'Tổng số rau củ bác Ba đã bán sau hai buổi là: 48 + 42 = 90 (kg).',
              'Số kg rau củ bác Ba còn lại là: 120 - 90 = 30 (kg).',
              '(Cách 2: Phân số chỉ số rau còn lại: 1 - (2/5 + 35/100) = 1 - (0,4 + 0,35) = 0,25. Khối lượng còn lại: 120 · 0,25 = 30 kg).',
              'Đáp số: 30 kg rau củ.'
            ],
            rubric: [
              { step: 'Tính đúng số rau bán buổi sáng: 48 kg', points: 0.25 },
              { step: 'Tính đúng số rau bán buổi chiều: 42 kg', points: 0.25 },
              { step: 'Tính tổng rau đã bán: 90 kg', points: 0.25 },
              { step: 'Tính đúng số rau còn lại 30 kg và kết luận', points: 0.25 }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // ĐỀ BIÊN SOẠN MỚI SỐ 5
  // ==========================================
  {
    id: 'de-5',
    code: 'ĐỀ 05',
    title: 'Đề Ôn Tập Giữa Kỳ I - Số 05 (Biên Soạn Chuẩn GDPT 2018)',
    type: 'reference',
    description: 'Biên soạn mới theo ma trận: Thứ tự phép tính lũy thừa âm/dương, chu kỳ thập phân, phân giác và cặp góc kề bù, bài toán kinh tế gia đình.',
    durationMinutes: 90,
    multipleChoice: [
      {
        id: 'de5-mc-1',
        number: 1,
        question: 'Điền kí hiệu thích hợp vào chỗ trống: -3,5 ... Q',
        options: ['∈', '∉', '⊂', '⊆'],
        correctAnswer: 0,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: '-3,5 = -7/2 là số hữu tỉ nên thuộc tập hợp Q. Kí hiệu đúng là phần tử thuộc tập hợp: ∈.',
      },
      {
        id: 'de5-mc-2',
        number: 2,
        question: 'Số đối của số -2(3/4) là:',
        options: ['-11/4', '11/4', '2(4/3)', '-2(4/3)'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Ta có -2(3/4) = -(2 + 3/4) = -11/4. Số đối của -11/4 là 11/4 (tức 2(3/4)).',
      },
      {
        id: 'de5-mc-3',
        number: 3,
        question: 'Tìm x, biết: x - 2/7 = -5/14',
        options: ['x = -1/14', 'x = 1/14', 'x = -9/14', 'x = 9/14'],
        correctAnswer: 0,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Chuyển vế: x = -5/14 + 2/7 = -5/14 + 4/14 = -1/14.',
      },
      {
        id: 'de5-mc-4',
        number: 4,
        question: 'Giá trị của biểu thức [(-1/2)²]³ là:',
        options: ['1/64', '-1/64', '1/32', '-1/32'],
        correctAnswer: 0,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Áp dụng quy tắc lũy thừa của lũy thừa: [(-1/2)²]³ = (-1/2)⁶ = 1 / 2⁶ = 1/64.',
      },
      {
        id: 'de5-mc-5',
        number: 5,
        question: 'Số thập phân hữu hạn trong các số sau là:',
        options: ['1/3', '5/8', '7/9', '2/11'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'SoThuc',
        explanation: 'Mẫu số 8 = 2³ chỉ có ước nguyên tố là 2, nên 5/8 viết được dưới dạng số thập phân hữu hạn (5/8 = 0,625).',
      },
      {
        id: 'de5-mc-6',
        number: 6,
        question: 'Làm tròn số 8245,67 với độ chính xác 5 (tức hàng chục):',
        options: ['8240', '8250', '8246', '8200'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'SoThuc',
        explanation: 'Độ chính xác d = 5 nên ta làm tròn đến hàng chục. Chữ số hàng đơn vị là 5 (≥ 5) nên ta cộng thêm 1 vào hàng chục (4 + 1 = 5): kết quả là 8250.',
      },
      {
        id: 'de5-mc-7',
        number: 7,
        question: 'Hai góc đối đỉnh thì:',
        options: ['Có tổng số đo bằng 180°', 'Có số đo bằng nhau', 'Có tổng số đo bằng 90°', 'Có cạnh chung'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'HinhHoc',
        explanation: 'Theo định lý hình học lớp 7: Hai góc đối đỉnh thì bằng nhau.',
      },
      {
        id: 'de5-mc-8',
        number: 8,
        question: 'Nếu tia Oz là tia phân giác của góc xOy và góc xOy = 80° thì số đo góc xOz là:',
        options: ['160°', '40°', '80°', '50°'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'HinhHoc',
        explanation: 'Tia phân giác chia góc thành hai góc bằng nhau: góc xOz = 80° / 2 = 40°.',
      },
    ],
    essay: [
      {
        id: 'de5-es-1',
        number: 1,
        title: 'Bài 1 (2,0 điểm): Thực hiện phép tính',
        totalPoints: 2.0,
        topic: 'SoHuuTi',
        subQuestions: [
          {
            id: 'de5-es-1a',
            label: 'a',
            question: 'Tính: -5/9 + 4/15 - 2/9',
            points: 0.75,
            finalAnswer: '-23/45 (hoặc -7/9 + 4/15)',
            stepByStepSolution: [
              'Nhóm các phân số có cùng mẫu: (-5/9 - 2/9) + 4/15.',
              'Tính nhóm đầu: -7/9.',
              'Quy đồng với 4/15 (mẫu số chung là 45): -7/9 = -35/45; 4/15 = 12/45.',
              'Kết quả: -35/45 + 12/45 = -23/45.'
            ],
            rubric: [
              { step: 'Nhóm hợp lý hoặc quy đồng đúng mẫu 45', points: 0.25 },
              { step: 'Thực hiện phép tính trên tử', points: 0.25 },
              { step: 'Ra kết quả tối giản -23/45', points: 0.25 }
            ]
          },
          {
            id: 'de5-es-1b',
            label: 'b',
            question: 'Tính: 7/8 - (3/4) · (-2/3)²',
            points: 0.75,
            finalAnswer: '13/24',
            stepByStepSolution: [
              'Tính lũy thừa trước: (-2/3)² = 4/9.',
              'Thực hiện phép nhân: (3/4) · (4/9) = 3/9 = 1/3.',
              'Thực hiện phép trừ: 7/8 - 1/3 = 21/24 - 8/24 = 13/24.'
            ],
            rubric: [
              { step: 'Tính đúng (-2/3)² = 4/9', points: 0.25 },
              { step: 'Nhân rút gọn ra 1/3', points: 0.25 },
              { step: 'Trừ hai phân số ra 13/24', points: 0.25 }
            ]
          },
          {
            id: 'de5-es-1c',
            label: 'c',
            question: 'Tính hợp lý: (11/24) · (5/7) + (13/24) · (5/7)',
            points: 0.5,
            finalAnswer: '5/7',
            stepByStepSolution: [
              'Đặt thừa số chung 5/7 ra ngoài: (5/7) · [11/24 + 13/24].',
              'Tính trong ngoặc: 11/24 + 13/24 = 24/24 = 1.',
              'Kết quả: (5/7) · 1 = 5/7.'
            ],
            rubric: [
              { step: 'Đặt đúng thừa số chung 5/7', points: 0.25 },
              { step: 'Tính ra 5/7', points: 0.25 }
            ]
          }
        ]
      },
      {
        id: 'de5-es-2',
        number: 2,
        title: 'Bài 2 (1,0 điểm): Tìm x',
        totalPoints: 1.0,
        topic: 'SoHuuTi',
        subQuestions: [
          {
            id: 'de5-es-2a',
            label: 'a',
            question: 'Tìm x, biết: (3/4)x + 1/6 = 5/12',
            points: 0.5,
            finalAnswer: 'x = 1/3',
            stepByStepSolution: [
              'Chuyển vế: (3/4)x = 5/12 - 1/6 = 5/12 - 2/12 = 3/12 = 1/4.',
              'Tìm x: x = (1/4) : (3/4) = (1/4) · (4/3) = 1/3.',
              'Kết luận: Vậy x = 1/3.'
            ],
            rubric: [
              { step: 'Chuyển vế tính đúng vế phải = 1/4', points: 0.25 },
              { step: 'Chia hai vế tìm ra x = 1/3', points: 0.25 }
            ]
          },
          {
            id: 'de5-es-2b',
            label: 'b',
            question: 'Tìm x, biết: 3/5 - (2x + 1/2) = 0,1',
            points: 0.5,
            finalAnswer: 'x = 0',
            stepByStepSolution: [
              'Đổi 0,1 = 1/10.',
              'Ta có: 2x + 1/2 = 3/5 - 1/10 = 6/10 - 1/10 = 5/10 = 1/2.',
              'Chuyển vế tìm 2x: 2x = 1/2 - 1/2 = 0.',
              'Suy ra: x = 0 : 2 = 0.',
              'Kết luận: Vậy x = 0.'
            ],
            rubric: [
              { step: 'Tìm được 2x + 1/2 = 1/2', points: 0.25 },
              { step: 'Tìm ra x = 0 và kết luận', points: 0.25 }
            ]
          }
        ]
      },
      {
        id: 'de5-es-3',
        number: 3,
        title: 'Bài 3 (2,0 điểm): Góc và tia phân giác',
        totalPoints: 2.0,
        topic: 'HinhHoc',
        subQuestions: [
          {
            id: 'de5-es-3a',
            label: 'a',
            question: 'Cho hai góc kề bù xOy và yOz. Biết góc xOy = 110°. Tính số đo góc yOz.',
            points: 1.0,
            finalAnswer: 'yOz = 70°',
            stepByStepSolution: [
              'Vì góc xOy và góc yOz là hai góc kề bù nên: góc xOy + góc yOz = 180°.',
              'Thay số: 110° + góc yOz = 180°.',
              'Suy ra: góc yOz = 180° - 110° = 70°.'
            ],
            rubric: [
              { step: 'Nêu công thức kề bù tổng = 180°', points: 0.5 },
              { step: 'Tính ra góc yOz = 70°', points: 0.5 }
            ]
          },
          {
            id: 'de5-es-3b',
            label: 'b',
            question: 'Vẽ tia Ot là tia phân giác của góc xOy. Tính số đo góc zOt.',
            points: 1.0,
            finalAnswer: 'zOt = 125°',
            stepByStepSolution: [
              'Vì Ot là tia phân giác của góc xOy nên: góc yOt = góc xOy / 2 = 110° / 2 = 55°.',
              'Tia Oy nằm giữa hai tia Oz và Ot nên: góc zOt = góc zOy + góc yOt.',
              'Thay số: góc zOt = 70° + 55° = 125°.'
            ],
            rubric: [
              { step: 'Tính góc phân giác yOt = 55°', points: 0.5 },
              { step: 'Cộng góc và tính ra zOt = 125°', points: 0.5 }
            ]
          }
        ]
      },
      {
        id: 'de5-es-4',
        number: 4,
        title: 'Bài 4 (2,0 điểm): Chứng minh song song và tính góc liên quan',
        totalPoints: 2.0,
        topic: 'HinhHoc',
        subQuestions: [
          {
            id: 'de5-es-4a',
            label: 'a',
            question: 'Cho hai đường thẳng a và b cắt bởi c tại hai điểm M và N sao cho góc M₁ = 125° và góc N₁ = 55° ở vị trí trong cùng phía. Giải thích tại sao a // b.',
            points: 1.0,
            finalAnswer: 'a // b vì hai góc trong cùng phía có tổng bằng 180° (125° + 55° = 180°)',
            stepByStepSolution: [
              'Ta có góc M₁ và góc N₁ là cặp góc trong cùng phía.',
              'Tổng số đo: góc M₁ + góc N₁ = 125° + 55° = 180°.',
              'Theo dấu hiệu nhận biết: "Nếu hai đường thẳng cắt một đường thẳng thứ ba tạo thành hai góc trong cùng phía bù nhau thì hai đường thẳng đó song song".',
              'Suy ra: a // b.'
            ],
            rubric: [
              { step: 'Chỉ ra cặp góc trong cùng phía và tính tổng = 180°', points: 0.5 },
              { step: 'Áp dụng dấu hiệu nhận biết và kết luận a // b', points: 0.5 }
            ]
          },
          {
            id: 'de5-es-4b',
            label: 'b',
            question: 'Kẻ đường thẳng d vuông góc với a tại P. Chứng minh d cũng vuông góc với b.',
            points: 1.0,
            finalAnswer: 'd ⊥ b theo tính chất từ vuông góc đến song song',
            stepByStepSolution: [
              'Ta có: a // b (theo câu a).',
              'Và: d ⊥ a tại P (theo giả thiết).',
              'Áp dụng tính chất: "Một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng kia".',
              'Suy ra: d ⊥ b.'
            ],
            rubric: [
              { step: 'Nêu a // b và d ⊥ a', points: 0.5 },
              { step: 'Kết luận d ⊥ b và trích dẫn định lý', points: 0.5 }
            ]
          }
        ]
      },
      {
        id: 'de5-es-5',
        number: 5,
        title: 'Bài 5 (1,0 điểm): Bài toán thực tế pha nước giải khát',
        totalPoints: 1.0,
        topic: 'ThucTe',
        subQuestions: [
          {
            id: 'de5-es-5a',
            label: 'a',
            question: 'Để pha chế một bình trà sữa 2(1/2) lít, Lan cần dùng 1,2 lít sữa tươi, 3/4 lít nước trà đen, phần còn lại là đường và nước đá. Hỏi thể tích phần đường và nước đá là bao nhiêu lít?',
            points: 1.0,
            finalAnswer: '0,55 lít (hoặc 11/20 lít)',
            stepByStepSolution: [
              'Quy đổi các số đo về cùng đơn vị lít dạng số thập phân (hoặc phân số):',
              '+ Tổng thể tích: 2(1/2) lít = 2,5 lít.',
              '+ Thể tích sữa tươi: 1,2 lít.',
              '+ Thể tích nước trà: 3/4 lít = 0,75 lít.',
              'Tổng thể tích sữa tươi và nước trà là: 1,2 + 0,75 = 1,95 (lít).',
              'Thể tích phần đường và nước đá là: 2,5 - 1,95 = 0,55 (lít) (tức 11/20 lít).',
              'Đáp số: 0,55 lít (hoặc 11/20 lít).'
            ],
            rubric: [
              { step: 'Đổi đúng 2(1/2) = 2,5 và 3/4 = 0,75', points: 0.25 },
              { step: 'Tính tổng sữa và trà: 1,95 lít', points: 0.25 },
              { step: 'Tính phần còn lại: 0,55 lít', points: 0.25 },
              { step: 'Kết luận chính xác', points: 0.25 }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // ĐỀ BIÊN SOẠN MỚI SỐ 6
  // ==========================================
  {
    id: 'de-6',
    code: 'ĐỀ 06',
    title: 'Đề Ôn Tập Giữa Kỳ I - Số 06 (Biên Soạn Chuẩn GDPT 2018)',
    type: 'reference',
    description: 'Biên soạn mới theo ma trận: Tập hợp số thực, làm tròn theo quy tắc chuẩn, thứ tự ngoặc tròn - vuông, góc kề bù so le trong và bài toán chi tiêu.',
    durationMinutes: 90,
    multipleChoice: [
      {
        id: 'de6-mc-1',
        number: 1,
        question: 'Số nào sau đây không phải là số hữu tỉ?',
        options: ['-0,75', '3/8', '√2 (khoảng 1,4142...)', '0'],
        correctAnswer: 2,
        points: 0.25,
        topic: 'SoThuc',
        explanation: '√2 là số thập phân vô hạn không tuần hoàn (số vô tỉ), không thể biểu diễn dưới dạng a/b (a, b ∈ Z, b ≠ 0).',
      },
      {
        id: 'de6-mc-2',
        number: 2,
        question: 'Số đối của phân số -(-4/9) là:',
        options: ['4/9', '-4/9', '9/4', '-9/4'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Ta có -(-4/9) = 4/9. Số đối của 4/9 là -4/9.',
      },
      {
        id: 'de6-mc-3',
        number: 3,
        question: 'Tìm x, biết: 3/2 - 2x = 1/4',
        options: ['x = 5/8', 'x = 5/4', 'x = -5/8', 'x = 1/8'],
        correctAnswer: 0,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: '2x = 3/2 - 1/4 = 6/4 - 1/4 = 5/4 \\Rightarrow x = (5/4) : 2 = 5/8.',
      },
      {
        id: 'de6-mc-4',
        number: 4,
        question: 'Rút gọn biểu thức (8³ · 4²) / 2¹¹:',
        options: ['1', '2', '4', '8'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'SoHuuTi',
        explanation: 'Đưa về cùng cơ số 2: 8³ = (2³)³ = 2⁹; 4² = (2²)² = 2⁴. Tử số = 2⁹ · 2⁴ = 2¹³. Biểu thức = 2¹³ / 2¹¹ = 2² = 4. Chọn đáp án C (giá trị bằng 4).',
      },
      {
        id: 'de6-mc-5',
        number: 5,
        question: 'Số thập phân 0,333... biểu diễn phân số nào?',
        options: ['3/10', '1/3', '3/100', '1/30'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'SoThuc',
        explanation: '0,(3) = 3/9 = 1/3.',
      },
      {
        id: 'de6-mc-6',
        number: 6,
        question: 'Làm tròn số 49,956 đến chữ số thập phân thứ hai:',
        options: ['49,95', '49,96', '50,00', '49,90'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'SoThuc',
        explanation: 'Chữ số thập phân thứ hai là 5. Chữ số thứ ba là 6 (≥ 5) nên ta cộng 1 vào chữ số 5 thành 6: kết quả 49,96.',
      },
      {
        id: 'de6-mc-7',
        number: 7,
        question: 'Cho hai đường thẳng a // b bị cắt bởi đường thẳng c. Cặp góc trong cùng phía có tổng số đo bằng:',
        options: ['90°', '180°', '360°', 'Không xác định'],
        correctAnswer: 1,
        points: 0.25,
        topic: 'HinhHoc',
        explanation: 'Theo tính chất hai đường thẳng song song: Hai góc trong cùng phía thì bù nhau (tổng bằng 180°).',
      },
      {
        id: 'de6-mc-8',
        number: 8,
        question: 'Cho góc xOy = 140°. Góc kề bù với góc xOy có số đo là:',
        options: ['40°', '140°', '50°', '90°'],
        correctAnswer: 0,
        points: 0.25,
        topic: 'HinhHoc',
        explanation: 'Góc kề bù = 180° - 140° = 40°.',
      },
    ],
    essay: [
      {
        id: 'de6-es-1',
        number: 1,
        title: 'Bài 1 (2,0 điểm): Thực hiện phép tính',
        totalPoints: 2.0,
        topic: 'SoHuuTi',
        subQuestions: [
          {
            id: 'de6-es-1a',
            label: 'a',
            question: 'Tính: 4/5 + (-2/3) - 7/15',
            points: 0.75,
            finalAnswer: '-1/3 (hoặc -5/15)',
            stepByStepSolution: [
              'Mẫu số chung của 5, 3, 15 là 15.',
              'Quy đồng: 4/5 = 12/15; -2/3 = -10/15; -7/15 giữ nguyên.',
              'Tính toán: (12 - 10 - 7) / 15 = -5/15.',
              'Rút gọn: -5/15 = -1/3.'
            ],
            rubric: [
              { step: 'Quy đồng đúng mẫu chung 15', points: 0.25 },
              { step: 'Thực hiện phép tính trên tử ra -5/15', points: 0.25 },
              { step: 'Rút gọn ra -1/3', points: 0.25 }
            ]
          },
          {
            id: 'de6-es-1b',
            label: 'b',
            question: 'Tính: 2/3 + (1/3) · (3/4)²',
            points: 0.75,
            finalAnswer: '41/48',
            stepByStepSolution: [
              'Tính lũy thừa trước: (3/4)² = 9/16.',
              'Thực hiện phép nhân: (1/3) · (9/16) = 3/16.',
              'Thực hiện phép cộng: 2/3 + 3/16 = 32/48 + 9/48 = 41/48.'
            ],
            rubric: [
              { step: 'Tính đúng (3/4)² = 9/16', points: 0.25 },
              { step: 'Nhân rút gọn ra 3/16', points: 0.25 },
              { step: 'Cộng ra 41/48', points: 0.25 }
            ]
          },
          {
            id: 'de6-es-1c',
            label: 'c',
            question: 'Tính hợp lý: (7/11) · (2/5) + (7/11) · (3/5)',
            points: 0.5,
            finalAnswer: '7/11',
            stepByStepSolution: [
              'Đặt thừa số chung 7/11 ra ngoài: (7/11) · [2/5 + 3/5].',
              'Tính trong ngoặc: 2/5 + 3/5 = 5/5 = 1.',
              'Kết quả: (7/11) · 1 = 7/11.'
            ],
            rubric: [
              { step: 'Đặt đúng thừa số chung 7/11', points: 0.25 },
              { step: 'Tính ra kết quả 7/11', points: 0.25 }
            ]
          }
        ]
      },
      {
        id: 'de6-es-2',
        number: 2,
        title: 'Bài 2 (1,0 điểm): Tìm x',
        totalPoints: 1.0,
        topic: 'SoHuuTi',
        subQuestions: [
          {
            id: 'de6-es-2a',
            label: 'a',
            question: 'Tìm x, biết: x - 4/9 = 5/6',
            points: 0.5,
            finalAnswer: 'x = 23/18',
            stepByStepSolution: [
              'Chuyển vế: x = 5/6 + 4/9.',
              'Mẫu số chung của 6 và 9 là 18: x = 15/18 + 8/18 = 23/18.',
              'Kết luận: Vậy x = 23/18.'
            ],
            rubric: [
              { step: 'Chuyển vế đúng x = 5/6 + 4/9', points: 0.25 },
              { step: 'Tính ra x = 23/18 và kết luận', points: 0.25 }
            ]
          },
          {
            id: 'de6-es-2b',
            label: 'b',
            question: 'Tìm x, biết: 4/5 - (x + 1/3) = 0,2',
            points: 0.5,
            finalAnswer: 'x = 4/15',
            stepByStepSolution: [
              'Đổi 0,2 = 1/5.',
              'Ta có: x + 1/3 = 4/5 - 1/5 = 3/5.',
              'Chuyển vế tìm x: x = 3/5 - 1/3 = 9/15 - 5/15 = 4/15.',
              'Kết luận: Vậy x = 4/15.'
            ],
            rubric: [
              { step: 'Tính đúng x + 1/3 = 3/5', points: 0.25 },
              { step: 'Tìm ra x = 4/15 và kết luận', points: 0.25 }
            ]
          }
        ]
      },
      {
        id: 'de6-es-3',
        number: 3,
        title: 'Bài 3 (2,0 điểm): Góc đối đỉnh và kề bù',
        totalPoints: 2.0,
        topic: 'HinhHoc',
        subQuestions: [
          {
            id: 'de6-es-3a',
            label: 'a',
            question: 'Hai đường thẳng mn và pq cắt nhau tại I tạo thành góc mIp = 75°. Vẽ hình và kể tên các cặp góc đối đỉnh.',
            points: 1.0,
            finalAnswer: 'Cặp 1: góc mIp và góc nIq; Cặp 2: góc mIq và góc nIp',
            stepByStepSolution: [
              'Tia Im đối tia In, tia Ip đối tia Iq.',
              'Cặp góc đối đỉnh 1: góc mIp và góc nIq.',
              'Cặp góc đối đỉnh 2: góc mIq và góc nIp.'
            ],
            rubric: [
              { step: 'Chỉ ra đúng cặp góc đối đỉnh thứ nhất', points: 0.5 },
              { step: 'Chỉ ra đúng cặp góc đối đỉnh thứ hai', points: 0.5 }
            ]
          },
          {
            id: 'de6-es-3b',
            label: 'b',
            question: 'Tính số đo các góc nIq, mIq và nIp.',
            points: 1.0,
            finalAnswer: 'nIq = 75°; mIq = 105°; nIp = 105°',
            stepByStepSolution: [
              'Vì góc nIq đối đỉnh với góc mIp nên: góc nIq = góc mIp = 75°.',
              'Vì góc mIq kề bù với góc mIp nên: góc mIq = 180° - 75° = 105°.',
              'Vì góc nIp đối đỉnh với góc mIq nên: góc nIp = góc mIq = 105°.'
            ],
            rubric: [
              { step: 'Tính đúng góc nIq = 75°', points: 0.25 },
              { step: 'Nêu lý do kề bù và tính mIq = 105°', points: 0.5 },
              { step: 'Tính đúng góc nIp = 105°', points: 0.25 }
            ]
          }
        ]
      },
      {
        id: 'de6-es-4',
        number: 4,
        title: 'Bài 4 (2,0 điểm): Hình học chứng minh song song và tính góc',
        totalPoints: 2.0,
        topic: 'HinhHoc',
        subQuestions: [
          {
            id: 'de6-es-4a',
            label: 'a',
            question: 'Cho hai đường thẳng a và b. Một cát tuyến cắt a tại A và cắt b tại B sao cho góc A₁ = 80° và góc B₁ = 80° ở vị trí so le trong. Giải thích tại sao a // b.',
            points: 1.0,
            finalAnswer: 'a // b vì hai góc so le trong bằng nhau (A₁ = B₁ = 80°)',
            stepByStepSolution: [
              'Xét hai đường thẳng a và b cùng bị cắt bởi cát tuyến.',
              'Hai góc A₁ và B₁ ở vị trí so le trong.',
              'Mà góc A₁ = góc B₁ = 80° (theo giả thiết).',
              'Theo dấu hiệu nhận biết hai đường thẳng song song, ta có: a // b.'
            ],
            rubric: [
              { step: 'Chỉ ra vị trí hai góc so le trong', points: 0.5 },
              { step: 'Nêu số đo bằng nhau và kết luận a // b', points: 0.5 }
            ]
          },
          {
            id: 'de6-es-4b',
            label: 'b',
            question: 'Tính số đo góc đồng vị với góc A₁ và góc trong cùng phía với góc A₁ tại đỉnh B.',
            points: 1.0,
            finalAnswer: 'Góc đồng vị = 80°; góc trong cùng phía = 100°',
            stepByStepSolution: [
              'Vì a // b nên:',
              '+ Góc đồng vị với góc A₁ tại đỉnh B bằng góc A₁ = 80°.',
              '+ Góc trong cùng phía với góc A₁ tại đỉnh B bù với góc A₁: 180° - 80° = 100°.'
            ],
            rubric: [
              { step: 'Tính đúng góc đồng vị = 80°', points: 0.5 },
              { step: 'Tính đúng góc trong cùng phía = 100°', points: 0.5 }
            ]
          }
        ]
      },
      {
        id: 'de6-es-5',
        number: 5,
        title: 'Bài 5 (1,0 điểm): Bài toán thực tế kế hoạch tiết kiệm',
        totalPoints: 1.0,
        topic: 'ThucTe',
        subQuestions: [
          {
            id: 'de6-es-5a',
            label: 'a',
            question: 'Minh có 200 000 đồng tiền tiết kiệm. Minh dùng 1/4 số tiền để mua sách tham khảo Toán, dùng 0,35 số tiền để mua đồ dùng học tập. Số tiền còn lại Minh tiếp tục để dành. Hỏi Minh còn lại bao nhiêu tiền?',
            points: 1.0,
            finalAnswer: '80 000 đồng',
            stepByStepSolution: [
              'Số tiền Minh mua sách tham khảo là: 200 000 · (1/4) = 50 000 (đồng).',
              'Số tiền Minh mua đồ dùng học tập là: 200 000 · 0,35 = 70 000 (đồng).',
              'Tổng số tiền Minh đã chi tiêu là: 50 000 + 70 000 = 120 000 (đồng).',
              'Số tiền Minh còn lại để dành là: 200 000 - 120 000 = 80 000 (đồng).',
              '(Hoặc tính theo tỉ lệ: 1 - (0,25 + 0,35) = 0,4. Số tiền còn lại = 200 000 · 0,4 = 80 000 đồng).',
              'Đáp số: 80 000 đồng.'
            ],
            rubric: [
              { step: 'Tính đúng tiền mua sách: 50 000 đ', points: 0.25 },
              { step: 'Tính đúng tiền mua đồ dùng: 70 000 đ', points: 0.25 },
              { step: 'Tính tổng tiền đã chi: 120 000 đ', points: 0.25 },
              { step: 'Tính ra số tiền còn lại 80 000 đ và kết luận', points: 0.25 }
            ]
          }
        ]
      }
    ]
  }
];
