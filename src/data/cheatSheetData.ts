import { FormulaTopic } from '../types/math';

export const CHEAT_SHEET_DATA: FormulaTopic[] = [
  {
    chapter: 'Chương 1',
    title: 'Số Hữu Tỉ (Tập hợp Q và các phép tính)',
    items: [
      {
        name: 'Định nghĩa số hữu tỉ',
        formula: 'Q = { a/b | a, b ∈ Z, b ≠ 0 }',
        note: 'Mọi số nguyên, số thập phân hữu hạn, hỗn số đều viết được dưới dạng phân số a/b.',
        example: '0,5 = 1/2; -3 = -3/1; 1(1/3) = 4/3.'
      },
      {
        name: 'Số đối của số hữu tỉ',
        formula: 'Số đối của x là -x, sao cho x + (-x) = 0',
        note: 'Số đối của số âm là số dương, số đối của 0 là 0. Chú ý: -(-a) = a.',
        example: 'Số đối của -3/5 là 3/5; số đối của 4,2 là -4,2.'
      },
      {
        name: 'Quy tắc dấu ngoặc',
        formula: '+ (a - b + c) = a - b + c  |  - (a - b + c) = -a + b - c',
        note: 'Khi bỏ dấu ngoặc có dấu "-" đằng trước, phải đổi dấu tất cả các số hạng bên trong ngoặc.',
        example: '-(2/3 - 1/4) = -2/3 + 1/4.'
      },
      {
        name: 'Quy tắc chuyển vế',
        formula: 'A + B = C ⇔ A = C - B',
        note: 'Khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức, ta phải đổi dấu số hạng đó.',
        example: 'x - 1/2 = 3/4 ⇔ x = 3/4 + 1/2.'
      },
      {
        name: 'Các phép tính lũy thừa trọng tâm',
        formula: 'xᵐ · xⁿ = xᵐ⁺ⁿ  |  xᵐ : xⁿ = xᵐ⁻ⁿ (x ≠ 0, m ≥ n)  |  (xᵐ)ⁿ = xᵐ·ⁿ  |  (x · y)ⁿ = xⁿ · yⁿ  |  (x / y)ⁿ = xⁿ / yⁿ (y ≠ 0)',
        note: 'Quy ước: x⁰ = 1 (với x ≠ 0); x¹ = x. Luôn tính lũy thừa trước khi nhân chia.',
        example: '(2/3)³ · (2/3)² = (2/3)⁵ = 32/243.'
      }
    ]
  },
  {
    chapter: 'Chương 2',
    title: 'Số Thực, Số Thập Phân Tuần Hoàn & Làm Tròn Số',
    items: [
      {
        name: 'Số thập phân vô hạn tuần hoàn',
        formula: 'a,bc(d...) với (d...) là chu kỳ tuần hoàn',
        note: 'Phân số tối giản với mẫu dương không chứa ước nguyên tố khác 2 và 5 thì viết được dưới dạng số thập phân hữu hạn; nếu mẫu chứa ước nguyên tố khác 2 và 5 thì viết được dưới dạng số thập phân vô hạn tuần hoàn.',
        example: '1/3 = 0,(3); 5/6 = 0,8(3); 7/11 = 0,(63).'
      },
      {
        name: 'Quy tắc làm tròn số',
        formula: 'Nếu chữ số ngay sau hàng làm tròn ≥ 5 thì tăng hàng làm tròn thêm 1 đơn vị. Nếu < 5 thì giữ nguyên.',
        note: 'Các chữ số sau hàng làm tròn: ở phần nguyên thay bằng chữ số 0; ở phần thập phân bỏ đi.',
        example: 'Làm tròn 3,14159 đến chữ số thập phân thứ hai: chữ số sau là 1 < 5 ⇒ 3,14. Làm tròn 0,999 đến chữ số thứ hai: chữ số sau là 9 ≥ 5 ⇒ 1,00.'
      },
      {
        name: 'Làm tròn với độ chính xác d cho trước',
        formula: 'Nếu d = 50 (hàng chục) ⇒ làm tròn đến hàng trăm. Nếu d = 0,05 (hàng phần trăm) ⇒ làm tròn đến hàng phần mười.',
        note: 'Nguyên tắc: Làm tròn đến hàng lớn hơn hàng của độ chính xác d một bậc.',
        example: 'Làm tròn 42683 với độ chính xác 50 ⇒ làm tròn đến hàng trăm được 42700.'
      }
    ]
  },
  {
    chapter: 'Chương 4',
    title: 'Góc Và Đường Thẳng Song Song',
    items: [
      {
        name: 'Hai góc đối đỉnh',
        formula: 'Hai góc đối đỉnh thì bằng nhau: ∠O₁ = ∠O₃ ; ∠O₂ = ∠O₄',
        note: 'Mỗi cạnh của góc này là tia đối của một cạnh của góc kia.',
        example: 'Hai đường thẳng cắt nhau tạo thành 2 cặp góc đối đỉnh và 4 cặp góc kề bù.'
      },
      {
        name: 'Hai góc kề bù',
        formula: '∠xOy + ∠yOz = 180° (khi Ox và Oz là hai tia đối nhau)',
        note: 'Vừa có một cạnh chung, vừa có hai cạnh còn lại là hai tia đối nhau.',
        example: 'Nếu góc kề bù thứ nhất là 120° thì góc thứ hai là 180° - 120° = 60°.'
      },
      {
        name: 'Tia phân giác của một góc',
        formula: 'Tia Oz nằm giữa Ox, Oy và ∠xOz = ∠zOy = ∠xOy / 2',
        note: 'Tia phân giác chia góc đã cho thành hai góc có số đo bằng nhau.',
        example: 'Nếu góc xOy = 70° thì mỗi nửa góc do phân giác tạo ra là 35°.'
      },
      {
        name: 'Dấu hiệu nhận biết hai đường thẳng song song',
        formula: 'Đường thẳng c cắt a và b tạo ra: 1 cặp góc so le trong bằng nhau HOẶC 1 cặp góc đồng vị bằng nhau HOẶC 1 cặp góc trong cùng phía bù nhau (tổng = 180°)',
        note: 'Chỉ cần một trong các điều kiện trên thỏa mãn thì a // b.',
        example: '∠A₁ = ∠B₁ = 80° (so le trong) ⇒ a // b.'
      },
      {
        name: 'Từ vuông góc đến song song',
        formula: 'Nếu c ⊥ a và c ⊥ b thì a // b  |  Nếu a // b mà c ⊥ a thì c ⊥ b',
        note: 'Hai đường thẳng phân biệt cùng vuông góc với đường thẳng thứ ba thì song song với nhau.',
        example: 'Dùng rất phổ biến trong Bài 4 của đề thi!'
      },
      {
        name: 'Tiên đề Euclid về đường thẳng song song',
        formula: 'Qua một điểm ở ngoài một đường thẳng, chỉ có MỘT đường thẳng song song với đường thẳng đó.',
        note: 'Nếu kẻ đường phụ qua điểm nằm ngoài để song song với 1 đường, nó là duy nhất.',
        example: 'Cơ sở cho kỹ thuật kẻ thêm đường phụ trong các bài điểm 10.'
      }
    ]
  }
];
