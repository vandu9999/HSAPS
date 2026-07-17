// Interfaces for Doctor members
export interface WorkExperience {
  period: string;
  position: string;
  organization: string;
}

export interface AwardItem {
  title: string;
  subtitle: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  role?: string; // e.g. "Chủ tịch", "Phó Chủ tịch"
  avatar: string;
  cchn: string; // Practice Certificate Number
  clinic: string;
  address: string;
  specialty: string[];
  education: string[];
  experience: string;
  email: string;
  phone: string;
  isOfficial: boolean;
  joinedYear: number;
  biography?: string[];
  workHistory?: WorkExperience[];
  awards?: AwardItem[];
  clinicHours?: string[];
}

// Mock database of HSAPS members including TS. BS. Nguyễn Minh Tâm
export const DOCTORS_DATA: Doctor[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    title: 'PGS.TS.BS',
    role: 'Chủ tịch Hội HSAPS',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBTpt1mXuhSU1pwk3DIMyk-Ff1AjM-t0f2_tGt7NfgIh-Rd9cHbYp6Lce1-XJvcuaWlr9kwbYRkVnkz2pVK5ajbfpHCNK9PJKlVLIJZUQ2q_gjzngID_eFodVW__2YJF3xdomLzQZvKE_F8FphSEPxKNgvV9_iMvN9vi-IILpxPOMG8JvbyiGLnQM11AkBH0z8ts0e9p2wcMnzyOpRLlxnWoKbOm-HIx2iOkV85SKRfw6hhHcVxZTIkZvC3TAeuv-glEwCcJ_jmvA',
    cchn: '001234/BYT-CCHN',
    clinic: 'Bệnh viện Thẩm mỹ Đại học Y Dược TP.HCM',
    address: '215 Hồng Bàng, Phường 11, Quận 5, TP.HCM',
    specialty: ['Phẫu thuật Tạo hình Thẩm mỹ vùng mặt', 'Nâng ngực nội soi', 'Tạo hình bụng'],
    education: [
      'Tốt nghiệp Bác sĩ Y khoa tại Đại học Y Dược TP.HCM (1995)',
      'Thạc sĩ chuyên ngành Phẫu thuật Tạo hình tại Đại học Kyoto, Nhật Bản (2001)',
      'Tiến sĩ Y khoa chuyên ngành Phẫu thuật Thẩm mỹ (2008)',
      'Được phong hàm Phó Giáo sư Y học (2015)'
    ],
    experience: 'Hơn 28 năm kinh nghiệm trong ngành Phẫu thuật Tạo hình và Thẩm mỹ. Nguyên Trưởng khoa Tạo hình Thẩm mỹ tại các bệnh viện lớn.',
    email: 'nguyenvana@hsaps.org.vn',
    phone: '0903.123.456',
    isOfficial: true,
    joinedYear: 2007,
    biography: [
      'PGS.TS.BS Nguyễn Văn A là một trong những chuyên gia hàng đầu đặt nền móng cho sự phát triển của ngành Phẫu thuật Tạo hình Thẩm mỹ tại miền Nam. Với hơn 28 năm học tập, nghiên cứu và làm việc, ông đã cống hiến không ngừng cho y học nước nhà và đào tạo nhiều thế hệ bác sĩ phẫu thuật thẩm mỹ trẻ.',
      'Hiện ông đang giữ cương vị Chủ tịch Hội Phẫu thuật Thẩm mỹ TP.HCM (HSAPS), đồng thời là Giảng viên cao cấp Bộ môn Tạo hình Thẩm mỹ tại Đại học Y Dược TP.HCM. Ông đã xuất bản hàng chục công trình nghiên cứu khoa học trên các tạp chí quốc tế danh giá.',
      'Phương châm làm việc của ông là luôn tôn trọng nét đẹp tự nhiên, hài hòa và đảm bảo an toàn tối đa cho bệnh nhân thông qua các phương pháp can thiệp y học chuẩn mực.'
    ],
    workHistory: [
      { period: '2015 - Nay', position: 'Chủ tịch Hội', organization: 'Hội Phẫu thuật Thẩm mỹ TP.HCM (HSAPS)' },
      { period: '2008 - Nay', position: 'Giảng viên cao cấp', organization: 'Bộ môn Tạo hình Thẩm mỹ - Đại học Y Dược TP.HCM' },
      { period: '1995 - 2007', position: 'Bác sĩ điều trị', organization: 'Khoa Ngoại Chấn thương - Bệnh viện Chợ Chẫy' }
    ],
    awards: [
      { title: 'Huân chương Lao động hạng Ba', subtitle: 'Vì sự nghiệp bảo vệ và nâng cao sức khỏe nhân dân (2020)' },
      { title: 'Thầy thuốc Ưu tú', subtitle: 'Do Chủ tịch nước phong tặng (2018)' },
      { title: 'Kỷ niệm chương Vì sự nghiệp Y tế', subtitle: 'Bộ Y tế trao tặng' }
    ],
    clinicHours: [
      'Thứ 2 - Thứ 6: 08:30 - 17:00',
      'Thứ 7: 08:30 - 12:00'
    ]
  },
  {
    id: '2',
    name: 'Trần Thị B',
    title: 'TS.BS',
    role: 'Phó Chủ tịch Thường trực',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO4rvufDxuoz1a_Lk9WjD8mZlz2VdKUS1Wg1ci5R9WrZEnEAB1ZxRNosV2XaJUcaNciPmqJzo8UdXl1j_qKJjXAgQzBc5ZFpu2f3kh605evqdtbaVOC_a0qz5_QjJ2xGBaprQmMsKImESSfjRzDNSiGLgKofzpM-gk8XTaSsIoK282aaYYnGbxBhmPn9W4TBMourGw_amlM8RVoFajsNppoDYPtzKN5vONocRSw2ivLQfawTDzV4FKgKZJHymIdRM9w3iV2owMfig',
    cchn: '002567/BYT-CCHN',
    clinic: 'Bệnh viện Phẫu thuật Thẩm mỹ Á Âu',
    address: '32D Thủ Khoa Huân, Phường Bến Thành, Quận 1, TP.HCM',
    specialty: ['Tạo hình khuôn mặt V-Line', 'Hút mỡ tạo dáng body', 'Căng da mặt trẻ hóa công nghệ cao'],
    education: [
      'Tốt nghiệp Bác sĩ Y khoa tại Đại học Y Hà Nội (1998)',
      'Tiến sĩ Y học chuyên ngành Phẫu thuật Thẩm mỹ tại Đại học Seoul, Hàn Quốc (2006)',
      'Tu nghiệp chuyên sâu về Chống lão hóa tại Paris, Pháp (2010)'
    ],
    experience: 'Hơn 25 năm hoạt động chuyên môn trong lĩnh vực phẫu thuật thẩm mỹ và trẻ hóa da không xâm lấn.',
    email: 'tranthib@hsaps.org.vn',
    phone: '0918.256.789',
    isOfficial: true,
    joinedYear: 2007,
    biography: [
      'TS.BS Trần Thị B là gương mặt nữ bác sĩ tiêu biểu trong lĩnh vực tạo hình thẩm mỹ toàn diện. Với xuất thân từ Đại học Y Hà Nội và xuất sắc bảo vệ luận án Tiến sĩ tại Đại học Quốc gia Seoul (Hàn Quốc), bà không ngừng học hỏi và mang các công nghệ trẻ hóa da hàng đầu thế giới về Việt Nam.',
      'Hiện bà đang giữ chức vụ Phó Chủ tịch Thường trực Hội HSAPS và là Giám đốc chuyên môn của Bệnh viện Thẩm mỹ Á Âu, một trong những cơ sở thẩm mỹ chuẩn quốc tế uy tín tại TP.HCM.',
      'Sự tỉ mỉ, mắt thẩm mỹ tinh tế và sự thấu hiểu tâm lý khách hàng là chìa khóa giúp TS.BS Trần Thị B mang lại sự tự tin, gìn giữ tuổi thanh xuân cho hàng vạn phụ nữ.'
    ],
    workHistory: [
      { period: '2012 - Nay', position: 'Giám đốc chuyên môn', organization: 'Bệnh viện Phẫu thuật Thẩm mỹ Á Âu' },
      { period: '2007 - Nay', position: 'Phó Chủ tịch Thường trực', organization: 'Hội Phẫu thuật Thẩm mỹ TP.HCM (HSAPS)' },
      { period: '1998 - 2005', position: 'Bác sĩ điều trị Ngoại khoa', organization: 'Bệnh viện Đa khoa Xanh Pôn, Hà Nội' }
    ],
    awards: [
      { title: 'Giải thưởng Cống hiến Y học', subtitle: 'Do Hiệp hội Thẩm mỹ châu Á trao tặng (2021)' },
      { title: 'Thành viên danh dự IPRAS', subtitle: 'Hiệp hội Phẫu thuật Tạo hình Thẩm mỹ Quốc tế' },
      { title: 'Chứng nhận Bàn tay Vàng Thẩm mỹ', subtitle: 'Hội nghị HSAPS thường niên' }
    ],
    clinicHours: [
      'Thứ 2 - Thứ 6: 09:00 - 18:00',
      'Thứ 7: 09:00 - 16:00'
    ]
  },
  {
    id: '3',
    name: 'Lê Văn C',
    title: 'BSCKII',
    role: 'Phó Chủ tịch',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzpa0WuzqKVGy0lixIKTIommscF9EtYo_LUJZHh-2CrPn0Qy29_Ng9N4LYNkGBYkUuXlfCyQNJJgB5edb0jgqaup2tbZS8FY3CKs93O8dSdJAhXW_pV8PR6QuylphkM5yxkXvfacJmV9tVQPIsDQTYP02PWTitlW4zsipe3domThG0j3WDn6ayFBjPf7UZb2ng6xll-S8AV8lyFKcXGaVOWemvMHZo3QrJsAMA1zKIkXkFvkqnz_gszVZH-W5aRQvaTsBLEi3hzaY',
    cchn: '003890/BYT-CCHN',
    clinic: 'Bệnh viện Thẩm mỹ Sài Gòn',
    address: '97 Nguyễn Chí Thanh, Phường 9, Quận 5, TP.HCM',
    specialty: ['Nâng ngực nội soi', 'Tạo hình mông nâng cấp vòng 3', 'Hút mỡ và điêu khắc cơ thể'],
    education: [
      'Tốt nghiệp Bác sĩ Y khoa Đại học Y Dược TP.HCM (1996)',
      'Bác sĩ Chuyên khoa I Ngoại Ngoại khoa (2002)',
      'Bác sĩ Chuyên khoa II Tạo hình Thẩm mỹ (2011)'
    ],
    experience: 'Chuyên gia đầu ngành về phẫu thuật nâng cấp vòng 1 và vòng 3, tiên phong áp dụng công nghệ túi ngực thông minh không đau.',
    email: 'levanc@hsaps.org.vn',
    phone: '0909.389.012',
    isOfficial: true,
    joinedYear: 2009,
    biography: [
      'BSCKII Lê Văn C là cánh chim đầu đàn trong chuyên khoa tạo hình vóc dáng tại Việt Nam. Ông luôn đi đầu trong việc cập nhật kỹ thuật nâng ngực nội soi không đau và điêu khắc mỡ tự thân công nghệ cao giúp kiến tạo những đường cong cơ thể hoàn mỹ.',
      'Giữ vai trò Phó Chủ tịch Hội HSAPS, ông đóng góp tích cực vào các buổi hội thảo đào tạo y khoa liên tục (CME), chia sẻ nhiều kinh nghiệm lâm sàng quý giá cho các bác sĩ trẻ học hỏi.',
      'Sự tận tâm và y đức sáng ngời là tôn chỉ bác sĩ Lê Văn C luôn khắc ghi trong suốt hơn 25 năm khoác lên mình chiếc áo blouse trắng.'
    ],
    workHistory: [
      { period: '2011 - Nay', position: 'Trưởng khoa Tạo hình Thẩm mỹ', organization: 'Bệnh viện Thẩm mỹ Sài Gòn' },
      { period: '2009 - Nay', position: 'Phó Chủ tịch Hội', organization: 'Hội Phẫu thuật Thẩm mỹ TP.HCM (HSAPS)' },
      { period: '1996 - 2008', position: 'Bác sĩ Ngoại Tổng quát', organization: 'Bệnh viện Nhân dân Gia Định' }
    ],
    awards: [
      { title: 'Giải thưởng Cống hiến Khoa học', subtitle: 'Do Sở Y tế TP.HCM trao tặng (2019)' },
      { title: 'Thành viên Ban chấp hành VSAPS', subtitle: 'Hội Phẫu thuật Tạo hình Thẩm mỹ Việt Nam' },
      { title: 'Chứng nhận Đào tạo xuất sắc', subtitle: 'Từ hãng Mentor & Motiva Hoa Kỳ' }
    ],
    clinicHours: [
      'Thứ 2 - Thứ 6: 08:00 - 17:30',
      'Thứ 7: 08:00 - 12:00'
    ]
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    title: 'ThS.BS',
    role: 'Tổng Thư ký',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiL29Az7ajQseZK52HR2mt-48wUNrj7_WUjUAsp4pYgpy9dH4rSSmYtKZwtU2grN_tdN-uRWxZ0dA5tE833H9hWOKsFOPgJ-p4x1clhcHvUNX5kj6HrIsXPp1oR6jkrhQZ_iVrP3AFZ1MNb9FmoYNerrFjQliNCEMmk6M845agoVNIWwJ34GWQ7L9zhof-ggJ5G7LhVMKZJpF3M9Sw8ZzKiWQkVqy1hUF_A9TpN3rUZL5BzwuTf0TyyahyGvXMOQdhr-cxjpMitPk',
    cchn: '004231/BYT-CCHN',
    clinic: 'Bệnh viện Thẩm mỹ JW Hàn Quốc Sài Gòn',
    address: '141-143 Lê Thị Riêng, Phường Bến Thành, Quận 1, TP.HCM',
    specialty: ['Thẩm mỹ mắt toàn diện', 'Nâng mũi cấu trúc S-Line', 'Tạo hình môi trái tim'],
    education: [
      'Tốt nghiệp Bác sĩ Y khoa Đại học Y Dược TP.HCM (2002)',
      'Thạc sĩ Y khoa chuyên ngành Ngoại khoa Đại học Y Dược TP.HCM (2007)',
      'Thực tập sinh Phẫu thuật Thẩm mỹ tại Bệnh viện JW Seoul, Hàn Quốc (2012-2014)'
    ],
    experience: 'Hơn 20 năm công tác, chuyên gia hàng đầu về tái phẫu thuật mắt hỏng, mũi lệch vẹo phục hồi cấu trúc tự nhiên.',
    email: 'phamthid@hsaps.org.vn',
    phone: '0988.423.111',
    isOfficial: true,
    joinedYear: 2011,
    biography: [
      'ThS.BS Phạm Thị D là nữ phẫu thuật viên sắc sảo và tận tâm. Bà là người điều phối chính mọi hoạt động khoa học, chương trình giao lưu trao đổi học thuật quốc tế của HSAPS với vai trò Tổng Thư ký.',
      'Sở hữu kỹ năng ngoại khoa điêu luyện cùng nhiều năm học tập chuyên sâu tại Bệnh viện JW danh tiếng tại Gangnam, Seoul, bà đã hồi sinh đôi mắt và nụ cười cho hàng nghìn khách hàng từng gặp biến chứng thẩm mỹ lỗi tại các cơ sở không phép.',
      'Triết lý của bà là điều trị bằng cả trái tim, mang lại giá trị nhân văn và trả lại vẻ đẹp chân phương, tự nhiên nhất cho bệnh nhân.'
    ],
    workHistory: [
      { period: '2014 - Nay', position: 'Phó Giám đốc Chuyên môn', organization: 'Bệnh viện Thẩm mỹ JW Hàn Quốc Sài Gòn' },
      { period: '2011 - Nay', position: 'Tổng Thư ký Hội', organization: 'Hội Phẫu thuật Thẩm mỹ TP.HCM (HSAPS)' },
      { period: '2002 - 2010', position: 'Bác sĩ Khoa Mắt', organization: 'Bệnh viện Trưng Vương TP.HCM' }
    ],
    awards: [
      { title: 'Giải thưởng Bàn tay vàng ngoại khoa', subtitle: 'Do Bộ Y tế vinh danh (2022)' },
      { title: 'Bằng khen của Chủ tịch UBND TP.HCM', subtitle: 'Vì sự nghiệp phát triển y tế cộng đồng' },
      { title: 'Thành viên chính thức KCCS', subtitle: 'Hiệp hội Thẩm mỹ Hàn Quốc' }
    ],
    clinicHours: [
      'Thứ 2 - Thứ 6: 08:30 - 18:00',
      'Thứ 7: 08:30 - 12:00'
    ]
  },
  {
    id: '5',
    name: 'Hoàng Văn E',
    title: 'TS.BS',
    role: 'Trưởng Ban Đào tạo',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYKYZPpTqUF46S9H8vgpFBhPIPMCmvstMMdg9vUOgd6A-dpllFEFbKoK41u6smlHn4I3ZWMXyeqkHj__LzOTh2fkzCyTMJdLx_wOIgBSnf2Pwy1kW-5lcbFzuyr9Gs5hDiZRXXGS2Ckxzk8vRHSF2I4feU4QCY96sSXMBf6RCppdFf_mmEa8nuvfjbLmjc03CIiIhOUGH8_-dYUpKHWGIw_u6ZO-nW0TFN-JA2ZdLktxPp5lBu7xCdDu0pMGSu2SQNyiLhNM9_tAQ',
    cchn: '005432/BYT-CCHN',
    clinic: 'Bệnh viện Thẩm mỹ Đông Á Sài Gòn',
    address: '218 Nguyễn Trãi, Phường 3, Quận 5, TP.HCM',
    specialty: ['Nâng mũi cấu trúc Nano Form', 'Hạ gò má chỉnh hàm hô', 'Gọt cằm vline'],
    education: [
      'Tốt nghiệp Bác sĩ Đa khoa Học viện Quân Y (2000)',
      'Thạc sĩ Chuyên ngành Tạo hình Thẩm mỹ Đại học Y Hà Nội (2005)',
      'Tiến sĩ Y khoa trường Đại học Tokyo, Nhật Bản (2013)'
    ],
    experience: 'Giảng viên thỉnh giảng bộ môn Tạo hình Thẩm mỹ tại Đại học Y Dược, có hơn 22 năm hoạt động giảng dạy và lâm sàng.',
    email: 'hoangvane@hsaps.org.vn',
    phone: '0912.543.210',
    isOfficial: true,
    joinedYear: 2012,
    biography: [
      'TS.BS Hoàng Văn E xuất thân từ môi trường Học viện Quân Y kỷ luật, sở hữu nền tảng kiến thức ngoại khoa sọ mặt cực kỳ vững vàng. Sau khi tu nghiệp Tiến sĩ tại Đại học Tokyo (Nhật Bản), ông định hướng chuyên sâu vào phẫu thuật xương hàm mặt phức tạp.',
      'Với vai trò Trưởng ban Đào tạo của HSAPS, ông là người xây dựng khung chương trình và trực tiếp điều phối các lớp CME chất lượng cao, giúp nâng cao kỹ thuật và quy chuẩn an toàn cho toàn bộ hội viên.',
      'Đối với bác sĩ Hoàng Văn E, thẩm mỹ không chỉ là làm đẹp, mà còn là công việc điêu khắc nghệ thuật trên nền tảng khoa học giải phẫu nghiêm ngặt.'
    ],
    workHistory: [
      { period: '2016 - Nay', position: 'Giám đốc Phẫu thuật Sọ mặt', organization: 'Bệnh viện Thẩm mỹ Đông Á Sài Gòn' },
      { period: '2012 - Nay', position: 'Trưởng Ban Đào tạo', organization: 'Hội Phẫu thuật Thẩm mỹ TP.HCM (HSAPS)' },
      { period: '2000 - 2010', position: 'Sĩ quan Quân y - Bác sĩ Ngoại khoa', organization: 'Bệnh viện Quân y 175' }
    ],
    awards: [
      { title: 'Giải thưởng Thầy thuốc xuất sắc Thủ đô Tokyo', subtitle: 'Dành cho nghiên cứu sinh nước ngoài xuất sắc (2012)' },
      { title: 'Kỷ niệm chương Vì sự nghiệp Giáo dục', subtitle: 'Bộ Giáo dục và Đào tạo cấp' },
      { title: 'Thành viên Hiệp hội Phẫu thuật Sọ mặt châu Á', subtitle: 'Asian Association of Oral and Maxillofacial Surgeons' }
    ],
    clinicHours: [
      'Thứ 2 - Thứ 6: 08:00 - 17:00',
      'Thứ 7: 08:00 - 12:00'
    ]
  },
  {
    id: '6',
    name: 'Nguyễn Tiến F',
    title: 'BSCKI',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    cchn: '006112/BYT-CCHN',
    clinic: 'Viện Thẩm mỹ Quốc tế Kangjin',
    address: '383 Đường 3 Tháng 2, Phường 10, Quận 10, TP.HCM',
    specialty: ['Căng chỉ trẻ hóa da mặt', 'Tiêm filler, botox tạo hình', 'Cấy mỡ tự thân trẻ hóa'],
    education: [
      'Tốt nghiệp Bác sĩ Y khoa Đại học Y khoa Phạm Ngọc Thạch (2008)',
      'Bác sĩ Chuyên khoa I chuyên ngành Phẫu thuật Tạo hình thẩm mỹ Đại học Y Dược TP.HCM (2015)',
      'Chứng chỉ chuyên sâu Căng da chỉ sinh học tại Seoul, Hàn Quốc (2018)'
    ],
    experience: 'Chuyên khoa thẩm mỹ nội khoa, căng chỉ collagen trẻ hóa không phẫu thuật với hơn 14 năm kinh nghiệm.',
    email: 'nguyentienf@gmail.com',
    phone: '0907.611.234',
    isOfficial: true,
    joinedYear: 2016,
    biography: [
      'BSCKI Nguyễn Tiến F là một trong những bác sĩ trẻ đầy triển vọng và tài năng đi đầu trong xu hướng thẩm mỹ nội khoa ít xâm lấn. Sau khi hoàn thành văn bằng Bác sĩ Chuyên khoa I Tạo hình Thẩm mỹ tại Đại học Y Dược TP.HCM, ông đã liên tục cập nhật kiến thức căng chỉ sinh học và trẻ hóa da tại các bệnh viện hàng đầu Hàn Quốc.',
      'Hiện ông đang là chuyên gia trẻ hóa tại Viện Thẩm mỹ Quốc tế Kangjin, kiến tạo hàng vạn khuôn mặt thanh tú tự nhiên không để lại dấu vết phẫu thuật.',
      'Sự ân cần, tỉ mỉ và đôi bàn tay khéo léo giúp ông luôn nhận được sự tin yêu và phản hồi tích cực từ khách hàng.'
    ],
    workHistory: [
      { period: '2018 - Nay', position: 'Trưởng Ban Thẩm mỹ Nội khoa', organization: 'Viện Thẩm mỹ Quốc tế Kangjin' },
      { period: '2016 - Nay', position: 'Hội viên chính thức', organization: 'Hội Phẫu thuật Thẩm mỹ TP.HCM (HSAPS)' },
      { period: '2008 - 2015', position: 'Bác sĩ điều trị', organization: 'Khoa Ngoại Chấn thương - Bệnh viện Quận 10' }
    ],
    awards: [
      { title: 'Chứng nhận Đào tạo chỉ collagen Ultra V Lift', subtitle: 'Do GS. Kwon Han Jin trực tiếp trao tặng' },
      { title: 'Giải thưởng Bác sĩ trẻ Sáng tạo', subtitle: 'Hội y học TP.HCM trao tặng' },
      { title: 'Thành viên Hội Da liễu Thẩm mỹ Việt Nam', subtitle: 'Hiệp hội Da liễu Việt Nam' }
    ],
    clinicHours: [
      'Thứ 2 - Thứ 6: 09:00 - 19:00',
      'Thứ 7, Chủ nhật: 09:00 - 17:00'
    ]
  },
  {
    id: '7',
    name: 'Lê Thị G',
    title: 'TS.BS',
    avatar: 'https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=400',
    cchn: '007998/BYT-CCHN',
    clinic: 'Khoa Tạo hình Thẩm mỹ - Bệnh viện Chợ Rẫy',
    address: '201B Nguyễn Chí Thanh, Phường 12, Quận 5, TP.HCM',
    specialty: ['Tạo hình thành bụng', 'Điều trị sẹo co rút sau bỏng', 'Hút mỡ bụng', 'Nâng ngực sa trễ'],
    education: [
      'Tốt nghiệp Thủ khoa Đại học Y Dược TP.HCM (2004)',
      'Bác sĩ Nội trú chuyên ngành Phẫu thuật Tạo hình (2004-2007)',
      'Tiến sĩ Y học chuyên ngành Phẫu thuật Tạo hình vi phẫu Đại học Chiba, Nhật Bản (2014)'
    ],
    experience: 'Giảng viên trực tiếp giảng dạy thực hành lâm sàng, chuyên điều trị các ca tạo hình phức tạp, tái tạo khuyết hổng sau tai nạn hoặc phẫu thuật ung thư.',
    email: 'lethig@choray.vn',
    phone: '0903.799.888',
    isOfficial: true,
    joinedYear: 2014,
    biography: [
      'TS.BS Lê Thị G là tấm gương học tập xuất sắc khi đỗ Thủ khoa đầu ra tại Đại học Y Dược TP.HCM và sau đó hoàn thành xuất sắc chương trình bác sĩ nội trú cùng Tiến sĩ tại Nhật Bản. Bà nổi tiếng với chuyên môn tạo hình vi phẫu và điều trị tái tạo các khuyết tật sẹo co rút phức tạp.',
      'Với vị trí phẫu thuật viên chính tại Khoa Tạo hình Thẩm mỹ Bệnh viện Chợ Rẫy, bà không chỉ làm đẹp thẩm mỹ mà còn thực hiện sứ mệnh tái tạo lại cuộc đời và sự tự tin cho các bệnh nhân sau tai nạn hoặc điều trị ung thư hiểm nghèo.',
      'Sự dịu dàng, y đức thuần khiết và năng lực khoa học xuất sắc khiến bà được đồng nghiệp kính trọng và đông đảo bệnh nhân yêu thương.'
    ],
    workHistory: [
      { period: '2014 - Nay', position: 'Bác sĩ điều trị chính - Giảng viên lâm sàng', organization: 'Khoa Tạo hình Thẩm mỹ - Bệnh viện Chợ Rẫy' },
      { period: '2014 - Nay', position: 'Hội viên chính thức', organization: 'Hội Phẫu thuật Thẩm mỹ TP.HCM (HSAPS)' },
      { period: '2004 - 2007', position: 'Bác sĩ Nội trú', organization: 'Bệnh viện Đại học Y Dược TP.HCM' }
    ],
    awards: [
      { title: 'Học bổng Chính phủ Nhật Bản (MEXT)', subtitle: 'Toàn phần nghiên cứu sinh Tiến sĩ (2009-2013)' },
      { title: 'Bằng khen chiến sĩ thi đua cấp Bộ', subtitle: 'Bộ Y tế vinh danh vì đóng góp khoa học' },
      { title: 'Thành viên WSRM', subtitle: 'Hiệp hội Vi phẫu Tạo hình Thế giới (World Society for Reconstructive Microsurgery)' }
    ],
    clinicHours: [
      'Thứ 2 - Thứ 6: 08:00 - 16:30',
      'Thứ 7: Buổi sáng theo lịch hẹn'
    ]
  },
  {
    id: '8',
    name: 'Đỗ Văn H',
    title: 'BSCKII',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    cchn: '008123/BYT-CCHN',
    clinic: 'Bệnh viện Thẩm mỹ Hàm Mặt Sài Gòn',
    address: '125 Lê Hồng Phong, Phường 2, Quận 5, TP.HCM',
    specialty: ['Chỉnh hàm hô móm', 'Gọt hàm hạ gò má', 'Phẫu thuật nâng cằm', 'Phẫu thuật sửa mũi hỏng'],
    education: [
      'Tốt nghiệp Bác sĩ Răng Hàm Mặt Đại học Y Dược TP.HCM (2001)',
      'Bác sĩ Chuyên khoa II chuyên ngành Phẫu thuật Hàm mặt (2012)',
      'Tu nghiệp Phẫu thuật Hàm mặt sọ mặt tại Bệnh viện Chang Gung, Đài Loan (2015)'
    ],
    experience: 'Hơn 22 năm hoạt động chuyên sâu về phẫu thuật xương hàm, tái định vị khớp cắn mang lại tỷ lệ khuôn mặt cân đối chuẩn tỉ lệ vàng.',
    email: 'dovanh@hammatsaigon.vn',
    phone: '0908.812.333',
    isOfficial: true,
    joinedYear: 2015,
    biography: [
      'BSCKII Đỗ Văn H là chuyên gia hàng đầu về phẫu thuật chỉnh hình xương mặt sọ mặt tại miền Nam. Với xuất phát điểm vững chắc từ ngành Răng Hàm Mặt và nhiều năm rèn luyện Chuyên khoa II cùng việc học tập chuyên sâu tại bệnh viện Chang Gung nổi tiếng thế giới, ông làm chủ mọi kỹ thuật gọt mặt, dời hàm tiên tiến nhất.',
      'Sự can thiệp chính xác đến từng milimet của ông đã giúp biến đổi cuộc đời cho hàng nghìn người gặp khuyết tật hàm hô, móm nặng, mang lại nụ cười rạng rỡ và khớp cắn hoàn hảo.',
      'Ông luôn theo đuổi sự hoàn hảo trong y học, áp dụng hệ thống mô phỏng 3D hiện đại để tối ưu hóa kết quả phẫu thuật an toàn cho bệnh nhân.'
    ],
    workHistory: [
      { period: '2016 - Nay', position: 'Phó Giám đốc Thường trực', organization: 'Bệnh viện Thẩm mỹ Hàm Mặt Sài Gòn' },
      { period: '2015 - Nay', position: 'Hội viên chính thức', organization: 'Hội Phẫu thuật Thẩm mỹ TP.HCM (HSAPS)' },
      { period: '2001 - 2014', position: 'Bác sĩ Phẫu thuật hàm mặt', organization: 'Bệnh viện Răng Hàm Mặt TP.HCM' }
    ],
    awards: [
      { title: 'Chứng nhận Phẫu thuật Sọ mặt Chang Gung', subtitle: 'Do Viện trưởng Chen Philip trao tặng (Đài Loan)' },
      { title: 'Giải thưởng Sáng tạo Khoa học kỹ thuật TP.HCM', subtitle: 'Hội đồng khoa học TP.HCM vinh danh' },
      { title: 'Thành viên AOCMF', subtitle: 'Tổ chức liên kết quốc tế các chuyên gia hàm mặt' }
    ],
    clinicHours: [
      'Thứ 2 - Thứ 6: 08:30 - 18:00',
      'Thứ 7: 08:30 - 12:00'
    ]
  },
  {
    id: '9',
    name: 'Nguyễn Thị I',
    title: 'ThS.BS',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    cchn: '009234/BYT-CCHN',
    clinic: 'Phòng khám Da liễu & Thẩm mỹ Nội khoa Sài Gòn',
    address: '45-47 Đường 30 Tháng 4, Phường Tân Thành, Quận Tân Phú, TP.HCM',
    specialty: ['Laser điều trị sắc tố da', 'Trẻ hóa Thermage FLX', 'Cấy HA collagen căng bóng da'],
    education: [
      'Tốt nghiệp Bác sĩ Y khoa Đại học Y Dược TP.HCM (2010)',
      'Thạc sĩ Chuyên ngành Da liễu Đại học Y Dược TP.HCM (2014)',
      'Nhiều chứng chỉ đào tạo liên tục về ứng dụng Laser thẩm mỹ của Hội Da liễu Việt Nam'
    ],
    experience: 'Chuyên gia thẩm mỹ nội khoa, da liễu thẩm mỹ với hơn 12 năm kinh nghiệm lâm sàng chăm sóc da chuyên sâu và trẻ hóa da công nghệ cao.',
    email: 'nguyenthii@dalieusaigon.vn',
    phone: '0902.923.456',
    isOfficial: false,
    joinedYear: 2018,
    biography: [
      'ThS.BS Nguyễn Thị I là nữ chuyên gia trẻ trung, năng động và đầy tâm huyết về lĩnh vực chăm sóc da thẩm mỹ nội khoa cao cấp. Tốt nghiệp Thạc sĩ chuyên khoa Da liễu tại Đại học Y Dược TP.HCM, bà am hiểu sâu sắc về cấu trúc da người Việt và cách ứng dụng hiệu quả công nghệ laser, sóng RF không xâm lấn.',
      'Sự khéo léo trong trị liệu kết hợp cùng phác đồ cá nhân hóa chuẩn y khoa đã giúp hàng nghìn khách hàng xóa bỏ nám, tàn nhang và lấy lại làn da căng bóng mịn màng.',
      'Bà luôn tận tình hướng dẫn bệnh nhân cách chăm sóc da khoa học tại nhà, gìn giữ hiệu quả trị liệu bền vững và an toàn lâu dài.'
    ],
    workHistory: [
      { period: '2016 - Nay', position: 'Giám đốc chuyên môn', organization: 'Phòng khám Da liễu & Thẩm mỹ Nội khoa Sài Gòn' },
      { period: '2018 - Nay', position: 'Hội viên liên kết', organization: 'Hội Phẫu thuật Thẩm mỹ TP.HCM (HSAPS)' },
      { period: '2010 - 2015', position: 'Bác sĩ điều trị khoa Da liễu', organization: 'Bệnh viện Da liễu TP.HCM' }
    ],
    awards: [
      { title: 'Chứng chỉ Đào tạo chuyên sâu Thermage FLX', subtitle: 'Do Solta Medical Hoa Kỳ cấp chứng nhận' },
      { title: 'Thành viên Hội Da liễu TP.HCM', subtitle: 'Hiệp hội Da liễu TP.HCM' },
      { title: 'Chứng chỉ ứng dụng Công nghệ Laser trong y học', subtitle: 'Viện Vật lý Y sinh học cấp' }
    ],
    clinicHours: [
      'Thứ 2 - Thứ Bảy: 09:00 - 19:30',
      'Chủ nhật: 09:00 - 12:00'
    ]
  },
  {
    id: '10',
    name: 'Nguyễn Minh Tâm',
    title: 'TS.BS',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPMwZDc8-HwyVrFvv_I8XqOxJ3x_azja-p6OJbT69oL2OyWc9ckeRS0H_2dV3jqUSH8lU2CyGN44OFi-WiOsNi_mGgdgTzPWoVZjhyxsVoDqjFqadxAtISHyFNe0hCpDF9eKEF2XUg9Sz02WSpp34z2SN3g47rp_FwZs4xCAC1t-UXwDqHfrzGPO3vHUJfLHcwaPnPELRdXKLNHv6ETpiDw-oSPkG3SNBSCFQ2zlqRh5EZytA9Ddilkv4wbgwoqNOmu_PVFvnZcyk',
    cchn: '001234/BYT-CCHN',
    clinic: 'Bệnh viện Chợ Rẫy',
    address: '201B Nguyễn Chí Thanh, Phường 12, Quận 5, TP. Hồ Chí Minh',
    specialty: ['Nâng mũi cấu trúc', 'Cắt mí mắt', 'Nâng ngực nội soi', 'Hút mỡ tạo hình', 'Tiêm Filler & Botox', 'Điều trị sẹo'],
    education: [
      'Tốt nghiệp Bác sĩ Y khoa tại Đại học Y Dược TP.HCM (2008)',
      'Hoàn thành chương trình Tiến sĩ tại Đại học Quốc gia Seoul, Hàn Quốc (2015)'
    ],
    experience: 'Với hơn 15 năm kinh nghiệm trong lĩnh vực phẫu thuật thẩm mỹ, TS. BS. Tâm chuyên sâu về các kỹ thuật tạo hình mũi cấu trúc và nâng ngực nội soi, mang lại vẻ đẹp tự nhiên và an toàn cho hàng ngàn khách hàng.',
    email: 'tam.nguyen@hsaps.org.vn',
    phone: '0909.393.939',
    isOfficial: true,
    joinedYear: 2015,
    biography: [
      'TS. BS. Nguyễn Minh Tâm tốt nghiệp Đại học Y Dược TP.HCM năm 2008 và hoàn thành chương trình Tiến sĩ tại Đại học Quốc gia Seoul, Hàn Quốc vào năm 2015. Ông là một trong những chuyên gia hàng đầu về phẫu thuật tạo hình tại Việt Nam, đặc biệt nổi tiếng với các kỹ thuật chỉnh hình mũi phức tạp và tái tạo sau chấn thương.',
      'Hiện nay, bác sĩ Tâm đang giữ vai trò Trưởng khoa Phẫu thuật Thẩm mỹ tại Bệnh viện Chợ Rẫy và là giảng viên thỉnh giảng tại Đại học Y Dược TP.HCM. Ông thường xuyên tham gia báo cáo tại các hội nghị quốc tế và có hơn 20 bài báo khoa học được đăng trên các tạp chí uy tín.',
      'Triết lý hành nghề của bác sĩ Tâm là "An toàn là trên hết, Vẻ đẹp là đích đến", luôn đặt y đức và sức khỏe của bệnh nhân làm trọng tâm trong mọi quyết định điều trị.'
    ],
    workHistory: [
      { period: '2018 - Nay', position: 'Trưởng khoa Phẫu thuật Thẩm mỹ', organization: 'Bệnh viện Chợ Rẫy' },
      { period: '2015 - 2018', position: 'Bác sĩ điều trị chính', organization: 'Khoa Tạo hình - Bệnh viện Đại học Y Dược TP.HCM' },
      { period: '2011 - 2015', position: 'Nghiên cứu sinh Tiến sĩ (PhD)', organization: 'Đại học Quốc gia Seoul, Hàn Quốc' }
    ],
    awards: [
      { title: 'Chứng chỉ hành nghề KCB', subtitle: 'Bộ Y tế cấp - Số: 001234/BYT-CCHN' },
      { title: 'Thành viên trọn đời', subtitle: 'Hội Phẫu thuật Thẩm mỹ Hoa Kỳ (ASPS)' },
      { title: 'Chứng chỉ CME Quốc tế', subtitle: 'Cập nhật xu hướng Rhinoplasty 2023' },
      { title: 'Giải thưởng Bàn tay Vàng', subtitle: 'Hội nghị HSAPS 2022' }
    ],
    clinicHours: [
      'Thứ 2 - Thứ 6: 08:00 - 17:00',
      'Thứ 7: 08:00 - 12:00'
    ]
  }
];

// Interfaces for Scientific Reports
export interface ScientificReportTable {
  id: string;
  title: string;
  headers: string[];
  rows: string[][];
  section: 'methodology' | 'results' | 'conclusion';
}

export interface ScientificReportFigure {
  id: string;
  imageUrl: string;
  caption: string;
  section: 'methodology' | 'results' | 'conclusion';
}

export interface ScientificReport {
  id: string;
  title: string;
  authors: string[];
  authorIds?: string[]; // Matches doctor.id from DOCTORS_DATA
  abstract: string;
  introduction: string;
  methodology: string;
  results: string;
  conclusion: string;
  category: string;
  date: string;
  journal: string;
  views: number;
  tags: string[];
  pdfSize?: string;
  doi?: string;
  imageUrl?: string;
  tables?: ScientificReportTable[];
  figures?: ScientificReportFigure[];
}

// Mock database for Scientific Reports
export const SCIENTIFIC_REPORTS_DATA: ScientificReport[] = [
  {
    id: '1',
    title: 'Đánh giá kết quả nâng ngực nội soi đường nách sử dụng túi độn Ergonomix tại Việt Nam',
    authors: ['PGS.TS.BS Nguyễn Văn A', 'BSCKII Lê Văn C'],
    authorIds: ['1', '3'],
    abstract: 'Phẫu thuật nâng ngực nội soi qua đường nách là phương pháp phổ biến giúp giấu sẹo hiệu quả. Nghiên cứu này đánh giá kết quả thẩm mỹ và tỷ lệ biến chứng ở 150 bệnh nhân được đặt túi độn ngực Ergonomix thế hệ mới thông qua kỹ thuật nội soi đường nách tại hai trung tâm liên kết HSAPS từ năm 2022 đến 2024.',
    introduction: 'Sự ra đời của thiết bị nội soi phóng đại đã cách mạng hóa phẫu thuật nâng ngực, cho phép bác sĩ bóc tách khoang đặt túi một cách chính xác dưới kiểm soát trực tiếp, giảm tối đa tổn thương mạch máu và thần kinh. Kết hợp với sự cải tiến về vỏ và gel của túi Ergonomix (Motiva), nghiên cứu này đặt mục tiêu phân tích các chỉ số an toàn, độ mềm mại tự nhiên và tỷ lệ bao xơ co thắt sau phẫu thuật.',
    methodology: 'Nghiên cứu mô tả cắt ngang tiến cứu thực hiện trên 150 nữ bệnh nhân có chỉ định nâng ngực. Phẫu thuật được thực hiện dưới gây mê nội khí quản, bóc tách khoang dual-plane (mặt phẳng kép) bằng nội soi qua đường rạch nách. Sử dụng túi độn Ergonomix thể tích từ 250cc đến 320cc. Đánh giá kết quả sau 1, 3, 6 và 12 tháng về hình dáng, độ mềm mại (thang điểm Baker) và độ hài lòng của bệnh nhân.',
    results: 'Thời gian phẫu thuật trung bình là 55 ± 12 phút. Tỷ lệ biến chứng sớm (chảy máu khoang, tụ dịch) là 0.6%. Sau 12 tháng theo dõi, 98% bầu ngực đạt độ mềm mại tự nhiên tuyệt đối (Baker độ I), không ghi nhận trường hợp nào bị bao xơ co thắt Baker độ III hoặc IV. 96.7% bệnh nhân hoàn toàn hài lòng với hình dáng bầu ngực khi đứng và nằm.',
    conclusion: 'Nâng ngực nội soi đường nách kết hợp túi độn ngực Ergonomix là phương pháp an toàn, hiệu quả cao, mang lại bầu ngực mềm mại tự nhiên như thật và hầu như không để lại dấu vết sẹo trên bầu ngực. Việc kiểm soát tốt khoang bóc tách bằng thiết bị nội soi là chìa khóa hạn chế tối đa các biến chứng.',
    category: 'Phẫu thuật vóc dáng',
    date: '15/10/2024',
    journal: 'Tạp chí Y học TP.HCM - Số chuyên đề Tạo hình Thẩm mỹ',
    views: 1240,
    tags: ['Nâng ngực nội soi', 'Túi Ergonomix', 'Đường nách', 'Phẫu thuật vóc dáng'],
    pdfSize: '1.8 MB',
    doi: '10.34071/jmp.2024.5.12',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    tables: [
      {
        id: 'r1-t1',
        title: 'Bảng 1: Phân bố tỷ lệ hài lòng và kết quả thẩm mỹ (n = 150)',
        headers: ['Tiêu chuẩn đánh giá', '1 tháng (%)', '6 tháng (%)', '12 tháng (%)'],
        rows: [
          ['Baker Độ I (Cực mềm)', '90.5%', '96.2%', '98.0%'],
          ['Baker Độ II (Mềm vừa)', '9.5%', '3.8%', '2.0%'],
          ['Baker Độ III (Co thắt nhẹ)', '0.0%', '0.0%', '0.0%'],
          ['Hài lòng tuyệt đối', '92.0%', '95.5%', '96.7%']
        ],
        section: 'results'
      }
    ],
    figures: [
      {
        id: 'r1-f1',
        imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600',
        caption: 'Hình 1: Sơ đồ minh họa đường phẫu thuật nội soi qua nách và khoang đặt túi dual-plane.',
        section: 'methodology'
      }
    ]
  },
  {
    id: '2',
    title: 'Phẫu thuật tạo hình mũi cấu trúc bằng sụn sườn tự thân kết hợp sụn nhân tạo: Kinh nghiệm lâm sàng qua 200 trường hợp',
    authors: ['TS.BS Nguyễn Minh Tâm'],
    authorIds: ['10'],
    abstract: 'Phẫu thuật nâng mũi cấu trúc sử dụng sụn tự thân là giải pháp tối ưu cho những dáng mũi khó, mũi bị biến chứng hoặc co rút. Bài viết này trình bày kinh nghiệm lâm sàng, kỹ thuật bóc tách và kết quả tạo dáng mũi bằng cách kết hợp sụn sườn tự thân (để dựng trụ mũi và kéo dài đầu mũi) với sụn silicone/surgiform nâng cao sống mũi trên 200 ca phẫu thuật.',
    introduction: 'Mũi người Việt Nam thường có đặc điểm đầu mũi ngắn, da đầu mũi dày, và sụn vách ngăn nhỏ yếu. Do đó, việc nâng sống mũi đơn thuần bằng chất liệu nhân tạo dễ dẫn đến các biến chứng như mỏng da, đỏ đầu mũi, lộ sóng hoặc tụt sụn. Nâng mũi cấu trúc bằng cách tái lập toàn bộ nền tảng đầu mũi bằng sụn sườn tự thân đã mở ra hướng đi mới giúp giải quyết triệt để các hạn chế này.',
    methodology: 'Nghiên cứu hồi cứu hồ sơ bệnh án của 200 bệnh nhân được phẫu thuật nâng mũi cấu trúc từ tháng 01/2021 đến tháng 12/2023. Kỹ thuật bao gồm: Lấy sụn sườn (xương sườn số 6 hoặc 7) qua đường mổ nhỏ dưới ngực dài 1.5 - 2cm; Dựng trụ mũi bằng sụn sườn mảnh ghép định hình vách ngăn mở rộng (SEG); Bọc đầu mũi bằng sụn tai hoặc sụn sườn lát mỏng; Nâng cao sống mũi bằng sụn Surgiform. Đánh giá sự thay đổi các góc mũi môi, góc mũi trán và biến chứng cong vênh sụn sườn.',
    results: 'Độ dài đầu mũi tăng trung bình 4.2mm, góc mũi môi được cải thiện về khoảng tối ưu 95° - 100°. Tỷ lệ nhiễm trùng sau mổ là 1% (2 ca), được điều trị ổn định bằng kháng sinh đồ. Không có ca nào gặp biến chứng tràn khí màng phổi tại vùng lấy sụn sườn. Tỷ lệ cong vênh sụn sườn ở đầu mũi là 0.5%. Mức độ hài lòng của bệnh nhân sau 6 tháng đạt 95.5%.',
    conclusion: 'Kết hợp sụn sườn tự thân để tái tạo đầu mũi và sụn nhân tạo để nâng sống mũi là phương pháp cực kỳ hiệu quả, mang lại dáng mũi cao bay cao Tây vững chãi, hạn chế tối đa nguy cơ đào thải hay co rút đầu mũi theo thời gian.',
    category: 'Phẫu thuật sọ mặt',
    date: '22/02/2025',
    journal: 'Kỷ yếu Hội nghị Khoa học Thường niên HSAPS lần thứ 23',
    views: 890,
    tags: ['Nâng mũi cấu trúc', 'Sụn sườn tự thân', 'Surgiform', 'Tạo hình sọ mặt'],
    pdfSize: '2.4 MB',
    doi: '10.34071/jmp.2025.1.04',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    tables: [
      {
        id: 'r2-t1',
        title: 'Bảng 2: Biến thiên các chỉ số góc độ giải phẫu mũi (n = 200)',
        headers: ['Chỉ số đo đạc', 'Trước phẫu thuật', 'Sau phẫu thuật', 'Mức cải thiện trung bình'],
        rows: [
          ['Góc mũi môi (Nasolabial)', '78° ± 6.2°', '96.5° ± 3.4°', '+18.5° (Tối ưu)'],
          ['Góc mũi trán (Nasofrontal)', '115° ± 5.0°', '132.2° ± 4.1°', '+17.2° (Tự nhiên)'],
          ['Độ nhô đầu mũi (Project)', '18.2 ± 1.5 mm', '22.4 ± 1.2 mm', '+4.2 mm']
        ],
        section: 'results'
      }
    ],
    figures: [
      {
        id: 'r2-f1',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600',
        caption: 'Hình 2: Dựng ảnh 3D Vectra chồng khớp dữ liệu giải phẫu phục vụ tạo hình vách ngăn.',
        section: 'methodology'
      }
    ]
  },
  {
    id: '3',
    title: 'Hiệu quả trẻ hóa da toàn diện bằng công nghệ căng chỉ collagen kết hợp sóng RF không xâm lấn',
    authors: ['BSCKI Nguyễn Tiến F', 'ThS.BS Nguyễn Thị I'],
    authorIds: ['6', '9'],
    abstract: 'Xu hướng thẩm mỹ ít xâm lấn ngày càng được ưa chuộng nhờ ưu điểm không cần nghỉ dưỡng và ít đau đớn. Nghiên cứu này đánh giá hiệu quả lâm sàng của việc kết hợp kỹ thuật căng chỉ collagen sinh học (PDO) vùng mặt dưới da với liệu trình sóng vô tuyến đơn cực (Mono-RF/Thermage) nhằm nâng cơ và săn chắc da cho nhóm phụ nữ tuổi trung niên từ 35 đến 55.',
    introduction: 'Lão hóa da mặt đặc trưng bởi sự chảy xệ của các khối mỡ nông, suy giảm collagen ở lớp trung bì và giảm độ đàn hồi của da. Căng chỉ collagen giúp nâng cơ cơ học tức thì và kích thích tăng sinh mô sợi dọc theo sợi chỉ. Trong khi đó, sóng RF truyền năng lượng nhiệt vào sâu trung bì làm co thắt sợi collagen cũ và tái tạo elastin mới. Sự kết hợp song hành này được kỳ vọng sẽ mang lại kết quả cộng hưởng vượt trội.',
    methodology: 'Nghiên cứu thử nghiệm lâm sàng mở trên 80 bệnh nhân nữ có độ lão hóa da mặt mức độ nhẹ đến trung bình. Tiến trình điều trị: Thực hiện 1 buổi Thermage FLX toàn mặt trước, sau đó 4 tuần tiến hành căng chỉ nâng cơ (sử dụng 8 - 12 sợi chỉ gai COG PDO mỗi bên mặt). Đánh giá độ săn chắc cơ mặt, nếp nhăn khóe cười (nasolabial folds) và độ đàn hồi da bằng máy phân tích da 3D trước và sau điều trị 3 tháng, 6 tháng.',
    results: 'Độ sâu của rãnh cười giảm trung bình 34.2% sau 3 tháng điều trị. Mật độ collagen dưới da tăng trung bình 28% đo trên siêu âm tần số cao. Hiệu quả cải thiện rõ rệt nhất ghi nhận ở vùng hàm dưới và nọng cằm, giúp thon gọn viền hàm. Tác dụng phụ chỉ dừng lại ở mức sưng nề nhẹ và bầm tím tự biến mất sau 5 - 7 ngày. Độ hài lòng của khách hàng đạt 92.5%.',
    conclusion: 'Kết hợp liệu pháp căng chỉ collagen nâng cơ với nhiệt sóng RF đơn cực là phác đồ trẻ hóa không phẫu thuật an toàn, hiệu quả tối ưu cho vùng mặt bị chảy xệ từ nhẹ đến trung bình, duy trì kết quả ổn định từ 1.5 đến 2 năm.',
    category: 'Thẩm mỹ nội khoa',
    date: '05/11/2024',
    journal: 'Tạp chí Da liễu & Thẩm mỹ Việt Nam',
    views: 1560,
    tags: ['Căng chỉ collagen', 'Sóng RF Thermage', 'Trẻ hóa da mặt', 'Thẩm mỹ nội khoa'],
    pdfSize: '1.2 MB',
    doi: '10.34071/jmp.2024.6.08',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    tables: [
      {
        id: 'r3-t1',
        title: 'Bảng 3: Chỉ số collagen dưới da trung bình đo bằng siêu âm (n = 80)',
        headers: ['Thời gian đánh giá', 'Mật độ collagen (g/cm³)', 'Tỷ lệ cải thiện', 'Mức độ săn chắc cơ'],
        rows: [
          ['Trước điều trị', '1.25 ± 0.12', 'Gốc tham chiếu', 'Lão hóa nhẹ - trung bình'],
          ['Sau 1 tháng', '1.42 ± 0.10', '+13.6%', 'Cải thiện bước đầu'],
          ['Sau 3 tháng', '1.60 ± 0.14', '+28.0%', 'Săn chắc viền hàm rõ rệt'],
          ['Sau 6 tháng', '1.58 ± 0.11', '+26.4%', 'Duy trì hiệu quả nâng cơ']
        ],
        section: 'results'
      }
    ],
    figures: [
      {
        id: 'r3-f1',
        imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600',
        caption: 'Hình 3: Bản đồ phân bố năng lượng nhiệt vi điểm dưới da khi chạy sóng Thermage FLX.',
        section: 'methodology'
      }
    ]
  },
  {
    id: '4',
    title: 'Tái tạo khuyết hổng thành bụng phức tạp sau phẫu thuật cắt u lớn bằng vạt da cơ thẳng bụng xoay (TRAM)',
    authors: ['TS.BS Lê Thị G'],
    authorIds: ['7'],
    abstract: 'Các khuyết hổng lớn tại thành bụng sau khi cắt bỏ khối u ác tính hoặc chấn thương là thách thức lớn đối với bác sĩ tạo hình. Nghiên cứu mô tả lâm sàng báo cáo 12 ca khuyết hổng thành bụng kích thước lớn (> 10x15cm) được che phủ thành công bằng vạt da cơ thẳng bụng xoay ngược dòng hoặc xuôi dòng tại Bệnh viện Chợ Rẫy.',
    introduction: 'Che phủ khuyết hổng thành bụng không chỉ cần đảm bảo về mặt thẩm mỹ bề mặt da mà quan trọng hơn là phải tái lập lại độ vững chãi của thành bụng để tránh biến chứng thoát vị bẹn/thoát vị thành bụng về sau. Vạt da cơ thẳng bụng (TRAM flap) với nguồn cấp máu dồi dào từ động mạch thượng vị trên hoặc dưới là lựa chọn tin cậy để chuyển dịch mô che phủ các khuyết hổng lớn.',
    methodology: 'Báo cáo loạt ca lâm sàng gồm 12 bệnh nhân bị mất chất thành bụng toàn tầng sau cắt u xơ cơ (desmoid tumor) hoặc u sarcom cơ trơn. Phẫu thuật viên sử dụng vạt cơ thẳng bụng bên đối diện xoay chuyển để che phủ khuyết hổng. Vùng khuyết hổng cân cơ thẳng bụng được gia cố bằng lưới sinh học nhân tạo (Dual Mesh). Đánh giá tỷ lệ sống của vạt da, nhiễm trùng lưới và thoát vị thành bụng sau mổ.',
    results: '100% vạt cơ thẳng bụng sống hoàn toàn, không có ca nào bị hoại tử một phần hoặc toàn bộ. Có 1 trường hợp nhiễm trùng vết mổ nông được điều trị ổn định tại chỗ. Sau thời gian theo dõi trung bình 18 tháng, thành bụng của toàn bộ bệnh nhân đều vững vàng, không ghi nhận trường hợp nào bị thoát vị thành bụng hoặc phình thành bụng khi gắng sức.',
    conclusion: 'Sử dụng vạt da cơ thẳng bụng xoay là giải pháp che phủ lý tưởng cho các khuyết hổng thành bụng lớn và sâu. Sự kết hợp giữa lưới sinh học nâng đỡ và vạt cơ có cuống mạch nuôi dưỡng dồi dào giúp phục hồi trọn vẹn cả cấu trúc chức năng lẫn thẩm mỹ thành bụng.',
    category: 'Tái tạo & Vi phẫu',
    date: '18/01/2025',
    journal: 'Tạp chí Phẫu thuật Ngoại khoa Việt Nam',
    views: 730,
    tags: ['Vạt cơ thẳng bụng', 'Tái tạo thành bụng', 'Khuyết hổng thành bụng', 'Vi phẫu tạo hình'],
    pdfSize: '3.1 MB',
    doi: '10.34071/jmp.2025.1.01',
    imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    title: 'Ứng dụng công nghệ mô phỏng 3D Vectra trong phẫu thuật chỉnh hình xương hàm mặt sọ mặt tại Việt Nam',
    authors: ['BSCKII Đỗ Văn H'],
    authorIds: ['8'],
    abstract: 'Phẫu thuật cắt xương hàm chỉnh hô móm đòi hỏi độ chính xác cao để đảm bảo cả khớp cắn chức năng lẫn tỷ lệ thẩm mỹ khuôn mặt. Nghiên cứu này đánh giá giá trị lâm sàng của hệ thống mô phỏng hình ảnh 3D Vectra XT trong việc lập kế hoạch phẫu thuật chỉnh hình sọ mặt và phân tích độ sai lệch giữa mô phỏng trước mổ so với kết quả thực tế trên 50 bệnh nhân.',
    introduction: 'Trước đây, lập kế hoạch phẫu thuật chỉnh hàm hô móm chủ yếu dựa trên phim X-quang Cephalometric 2D và mẫu hàm thạch cao, dẫn đến độ sai số nhất định khi dựng hình khuôn mặt 3 chiều. Sự tích hợp giữa phim CT Cone Beam và ảnh quét bề mặt Vectra 3D cho phép bác sĩ giả lập chính xác các chuyển dịch xương sọ mặt và dự đoán sự thay đổi của các lớp mô mềm bao phủ bên ngoài.',
    methodology: 'Nghiên cứu tiến cứu trên 50 bệnh nhân có khớp cắn lệch lạc loại III (móm) hoặc loại II (hô) được phẫu thuật cắt xương hàm (Lefort I và BSSO). Trước mổ, bệnh nhân được chụp Vectra 3D và giả lập kết quả. Sau mổ 6 tháng, tiến hành chụp lại ảnh Vectra 3D và chồng hình (superimposition) với hình mô phỏng trước mổ để đo độ sai lệch khoảng cách RMS (Root Mean Square) tại các điểm mốc giải phẫu.',
    results: 'Độ sai lệch trung bình RMS giữa mô phỏng và thực tế ở vùng cằm là 0.82mm, vùng môi trên là 1.15mm, và vùng má là 0.95mm (tất cả đều nằm trong ngưỡng chấp nhận được lâm sàng < 1.5mm). 94% bệnh nhân bày tỏ sự an tâm cao khi được xem trước kết quả mô phỏng 3D trước khi phẫu thuật và hài lòng với kết quả thực tế nhận được.',
    conclusion: 'Ứng dụng công nghệ mô phỏng hình ảnh 3D Vectra giúp tăng độ chính xác trong phẫu thuật cắt chỉnh xương hàm mặt phức tạp, cải thiện sự tương tác trao đổi thông tin giữa bác sĩ - bệnh nhân, từ đó nâng cao kết quả thẩm mỹ toàn diện.',
    category: 'Xu hướng & Công nghệ',
    date: '12/03/2025',
    journal: 'Kỷ yếu Hội thảo Tạo hình Thẩm mỹ châu Á',
    views: 950,
    tags: ['Mô phỏng 3D Vectra', 'Chỉnh hàm hô móm', 'Cắt xương hàm', 'Xu hướng & Công nghệ'],
    pdfSize: '2.1 MB',
    doi: '10.34071/jmp.2025.2.10',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'
  }
];

export interface ScientificEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  speakers: string[];
  cmeHours: string;
  capacityText: string;
  progress: number;
  imageUrl: string;
  description: string;
  agenda: { time: string; activity: string; speaker?: string }[];
  registrationFee: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export const SCIENTIFIC_EVENTS_DATA: ScientificEvent[] = [
  {
    id: '1',
    title: "Hội thảo chuyên đề: Xu hướng phẫu thuật tạo hình mũi 2025",
    type: "Hội thảo chuyên đề",
    date: "20 Tháng 11, 2024",
    time: "08:00 - 17:30",
    location: "GEM Center, Quận 1, TP. Hồ Chí Minh",
    speakers: ["PGS.TS.BS Phạm Trịnh Quốc Khanh", "TS.BS Nguyễn Phan Tú Dung"],
    cmeHours: "CME: 4 giờ học thuật",
    capacityText: "Đã đăng ký: 235/250 chỗ (Còn 15 chỗ)",
    progress: 94,
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    description: "Hội thảo chuyên đề nhằm cập nhật các kỹ thuật phẫu thuật tạo hình mũi hiện đại nhất sẽ áp dụng trong năm 2025. Chương trình tập trung thảo luận sâu về nâng mũi cấu trúc sụn sườn tự thân kết hợp chất liệu nhân tạo sinh học thế hệ mới, hạn chế tối đa biến chứng và tối ưu hóa thời gian phục hồi cho bệnh nhân.",
    registrationFee: "Miễn phí cho hội viên HSAPS / 1.000.000 VNĐ cho khách tự do",
    status: 'upcoming',
    agenda: [
      { time: "08:00 - 08:30", activity: "Đón tiếp đại biểu và phát tài liệu hội thảo", speaker: "Ban Thư ký" },
      { time: "08:30 - 09:00", activity: "Phát biểu khai mạc hội thảo và định hướng xu hướng 2025", speaker: "PGS.TS.BS Phạm Trịnh Quốc Khanh" },
      { time: "09:00 - 10:30", activity: "Báo cáo: Kỹ thuật khai thác sụn sườn tự thân tối thiểu và tạo hình sống mũi", speaker: "TS.BS Nguyễn Phan Tú Dung" },
      { time: "10:30 - 11:00", activity: "Thảo luận và hỏi đáp chuyên đề 1", speaker: "Tất cả chuyên gia" },
      { time: "11:00 - 12:00", activity: "Báo cáo: Ứng dụng vật liệu Gore-Tex thế hệ mới trong nâng mũi", speaker: "PGS.TS.BS Phạm Trịnh Quốc Khanh" },
      { time: "12:00 - 13:30", activity: "Nghỉ trưa và tiệc buffet kết nối", speaker: "Hội nghị" },
      { time: "13:30 - 15:30", activity: "Trực quan lâm sàng: Phát sóng ca phẫu thuật thị phạm trực tiếp từ phòng mổ", speaker: "Kíp mổ GEM Hospital" },
      { time: "15:30 - 16:00", activity: "Nghỉ trà chiều (Tea break)", speaker: "Hội nghị" },
      { time: "16:00 - 17:00", activity: "Bàn tròn thảo luận: Xử lý các ca biến chứng lệch méo và co rút sau nâng mũi hỏng", speaker: "Hội đồng chuyên môn" },
      { time: "17:00 - 17:30", activity: "Tổng kết, phát chứng chỉ CME và bế mạc", speaker: "Ban Tổ chức" }
    ]
  },
  {
    id: '2',
    title: "Khai giảng khóa đào tạo liên tục CME chuyên sâu tháng 12",
    type: "Đào tạo CME liên tục",
    date: "15 Tháng 12, 2024",
    time: "08:30 - 16:30 (Thứ 7 & CN)",
    location: "Bệnh viện Đại học Y Dược Cần Thơ & Trực tuyến qua Zoom",
    speakers: ["ThS.BS Nguyễn Thị I", "PGS.TS.BS Lê Hành"],
    cmeHours: "CME: 12 giờ đào tạo",
    capacityText: "Đã đăng ký: 92/100 học viên (Còn 8 chỗ)",
    progress: 92,
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    description: "Khóa học đào tạo liên tục CME cung cấp cả lý thuyết nâng cao và thực hành lâm sàng trực tiếp trên mẫu mô phỏng về các ứng dụng laser y học và kỹ thuật cấy chỉ thẩm mỹ trong trẻ hóa da mặt toàn diện.",
    registrationFee: "3.500.000 VNĐ (Bao gồm chi phí vật tư thực hành và cấp chứng chỉ)",
    status: 'upcoming',
    agenda: [
      { time: "Thứ Bảy - 08:30", activity: "Khai giảng lớp học và phát tài liệu lý thuyết lâm sàng" },
      { time: "09:00 - 12:00", activity: "Chuyên đề 1: Vật lý Laser và các chỉ định trẻ hóa da mặt lâm sàng", speaker: "ThS.BS Nguyễn Thị I" },
      { time: "13:30 - 16:30", activity: "Chuyên đề 2: Kỹ thuật luồn chỉ nâng cơ mặt không phẫu thuật", speaker: "PGS.TS.BS Lê Hành" },
      { time: "Chủ Nhật - 08:30", activity: "Chuyên đề 3: Các tai biến thường gặp và quy trình xử trí khẩn cấp", speaker: "Hội đồng đào tạo" },
      { time: "10:00 - 12:00", activity: "Thực hành lâm sàng nhóm 1: Tiêm botox và đi chỉ trên mẫu mô phỏng", speaker: "Giảng viên hướng dẫn" },
      { time: "13:30 - 15:30", activity: "Thực hành lâm sàng nhóm 2: Vận hành thiết bị laser xung dài và CO2 fractional", speaker: "Giảng viên hướng dẫn" },
      { time: "15:30 - 16:30", activity: "Thi trắc nghiệm đánh giá cuối khóa và cấp chứng nhận CME", speaker: "Ban Tổ chức" }
    ]
  },
  {
    id: '3',
    title: "Hội nghị khoa học Thường niên HSAPS lần thứ 24",
    type: "Hội nghị thường niên",
    date: "10 Tháng 01, 2025",
    time: "08:00 - 18:00 (3 ngày)",
    location: "Khách sạn Furama Resort, Ngũ Hành Sơn, Đà Nẵng",
    speakers: ["GS.TS.BS Trần Thiết Sơn", "Chuyên gia từ Hàn Quốc & Hoa Kỳ"],
    cmeHours: "CME: 16 giờ học thuật quốc tế",
    capacityText: "Đã đăng ký: 380/500 đại biểu (Còn 120 chỗ)",
    progress: 76,
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    description: "Hội nghị thường niên khoa học HSAPS là diễn đàn y học thẩm mỹ lớn nhất năm, quy tụ hơn 500 bác sĩ thẩm mỹ trong nước và quốc tế. Chương trình cập nhật các công nghệ, xu hướng phẫu thuật tạo hình vóc dáng, sọ mặt và thẩm mỹ nội khoa mới nhất toàn cầu.",
    registrationFee: "2.000.000 VNĐ cho Hội viên / 4.000.000 VNĐ cho khách tự do",
    status: 'upcoming',
    agenda: [
      { time: "Ngày 1 - Sáng", activity: "Lễ khai mạc trọng thể và các báo cáo tổng quan ngành phẫu thuật thẩm mỹ Việt Nam" },
      { time: "Ngày 1 - Chiều", activity: "Chuyên đề: Phẫu thuật tạo hình nâng ngực & hút mỡ tạo hình thành bụng" },
      { time: "Ngày 2 - Sáng", activity: "Chuyên đề: Phẫu thuật sọ mặt và chỉnh hình xương hàm mặt phức tạp" },
      { time: "Ngày 2 - Chiều", activity: "Chuyên đề: Công nghệ trẻ hóa da và thẩm mỹ nội khoa ít xâm lấn" },
      { time: "Ngày 3 - Sáng", activity: "Báo cáo đề tài sáng kiến trẻ của các bác sĩ nội trú và nghiên cứu sinh" },
      { time: "Ngày 3 - Chiều", activity: "Bế mạc hội nghị, vinh danh đề tài xuất sắc và cấp chứng nhận CME quốc tế" }
    ]
  },
  {
    id: '4',
    title: "Workshop thực hành: Kỹ thuật nâng cơ Hifu & chỉ thẩm mỹ thế hệ mới",
    type: "Workshop thực tế",
    date: "05 Tháng 02, 2025",
    time: "13:30 - 17:30",
    location: "Phòng Thực hành Lâm sàng HSAPS, Quận 3, TP. HCM",
    speakers: ["TS.BS Lê Tôn Dũng", "ThS.BS Chuyên khoa Da liễu"],
    cmeHours: "CME: 3 giờ thực hành lâm sàng",
    capacityText: "Đã đăng ký: 26/30 bác sĩ (Còn 4 chỗ)",
    progress: 86,
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    description: "Workshop thực hành giới hạn số lượng học viên nhằm đảm bảo tính cầm tay chỉ việc, chuyên sâu vào kỹ thuật đi chỉ gai nâng cơ tầng sâu phối hợp công nghệ sóng siêu âm hội tụ cường độ cao HIFU.",
    registrationFee: "1.500.000 VNĐ (Chỉ nhận tối đa 30 bác sĩ chuyên khoa)",
    status: 'upcoming',
    agenda: [
      { time: "13:30 - 14:00", activity: "Đón tiếp học viên và đo chỉ số cơ mặt mẫu" },
      { time: "14:00 - 15:00", activity: "Lý thuyết: Phối hợp công nghệ sóng HIFU và chỉ gai trong trẻ hóa không phẫu thuật", speaker: "TS.BS Lê Tôn Dũng" },
      { time: "15:00 - 17:00", activity: "Thực hành trực tiếp trên bệnh nhân mẫu (Hands-on training)", speaker: "Tất cả bác sĩ và giảng viên" },
      { time: "17:00 - 17:30", activity: "Thảo luận kết quả lâm sàng, hỏi đáp và trao chứng nhận CME tham gia workshop" }
    ]
  }
];

export interface PartnerProduct {
  name: string;
  description: string;
  imageUrl: string;
}

export interface Partner {
  id: string;
  name: string;
  logoType: 'motiva' | 'thallo' | 'allergan' | 'galderma' | 'merz';
  category: 'Kim cương' | 'Vàng' | 'Bạc' | 'Đồng hành';
  description: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  introduction: string;
  products: PartnerProduct[];
}

export const PARTNERS_DATA: Partner[] = [
  {
    id: 'motiva',
    name: 'Motiva Implants (Establishment Labs)',
    logoType: 'motiva',
    category: 'Kim cương',
    description: 'Thương hiệu túi ngực công nghệ Ergonomix thích ứng chuyển động cơ thể hàng đầu thế giới, thuộc tập đoàn Establishment Labs.',
    website: 'https://motiva.health',
    phone: '1800-MOTIVA (668482)',
    email: 'support@motiva.health',
    address: 'Alajuela, Costa Rica & Văn phòng Đại diện Việt Nam tại Quận 1, TP. Hồ Chí Minh',
    introduction: 'Motiva Implants là cuộc cách mạng trong phẫu thuật nâng ngực thẩm mỹ. Áp dụng công nghệ lớp vỏ SmoothSilk® tiên tiến cùng chip Qid® định danh an toàn sinh học đầu tiên được FDA phê duyệt, túi ngực Motiva không chỉ đem lại phom dáng tự nhiên, mềm mại giống như mô ngực thật mà còn giảm thiểu tỷ lệ bao xơ xuống mức tối đa dưới 1%.',
    products: [
      {
        name: 'Motiva Ergonomix 2',
        description: 'Thế hệ túi ngực thông minh cao cấp nhất, linh hoạt thay đổi hình dáng từ tròn sang giọt nước khi đứng và nằm.',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Motiva Round',
        description: 'Túi ngực tròn định hình với độ căng đầy tối đa cho phần ngực phía trên, thích hợp cho khách hàng trẻ tuổi.',
        imageUrl: 'https://images.unsplash.com/photo-1628191139360-408a06492299?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    id: 'thallo',
    name: 'THALLO Medical Technology',
    logoType: 'thallo',
    category: 'Kim cương',
    description: 'Thương hiệu hàng đầu về thiết bị y tế thẩm mỹ công nghệ cao và giải pháp laser vi điểm trẻ hóa tầng sâu.',
    website: 'https://thallomedical.com',
    phone: '028-7300-8899',
    email: 'info@thallomedical.com',
    address: 'Tòa nhà Thallo Tower, Khu đô thị Sala, Quận 2, TP. Thủ Đức, TP. HCM',
    introduction: 'THALLO Medical Technology chuyên chuyển giao các giải pháp thiết bị thẩm mỹ không xâm lấn tiêu chuẩn châu Âu cho các bệnh viện phẫu thuật tạo hình và viện da liễu lớn tại Việt Nam. THALLO nổi tiếng với quy trình bảo hành chuẩn quốc tế và đào tạo chuyên môn lâm sàng định kỳ cho đội ngũ bác sĩ vận hành máy.',
    products: [
      {
        name: 'Thallo CO2 Fractional Laser',
        description: 'Thiết bị laser tái tạo bề mặt da vi điểm, loại bỏ sẹo rỗ và thu nhỏ lỗ chân lông hiệu quả vượt trội.',
        imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Thallo Ultra HIFU System',
        description: 'Công nghệ sóng siêu âm hội tụ cường độ cao, căng da nâng cơ tầng sâu SMAS không phẫu thuật.',
        imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f35116f?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    id: 'allergan',
    name: 'Allergan Aesthetics (an AbbVie Company)',
    logoType: 'allergan',
    category: 'Vàng',
    description: 'Tập đoàn dược mỹ phẩm đa quốc gia nổi tiếng nhất thế giới sở hữu dòng sản phẩm xóa nhăn Botox và chất làm đầy Juvederm.',
    website: 'https://www.allerganaesthetics.com',
    phone: '028-3824-3999',
    email: 'vietnam.info@allergan.com',
    address: 'Lầu 24, Tòa nhà Saigon Centre Tower 2, Lê Lợi, Quận 1, TP. HCM',
    introduction: 'Allergan Aesthetics là tập đoàn đi đầu và định hình tiêu chuẩn ngành thẩm mỹ nội khoa toàn cầu. Với danh mục sản phẩm đồ sộ được chứng nhận bởi FDA bao gồm Botox® Cosmetic, Juvederm® Fillers, Allergan cam kết mang lại sự an toàn và hiệu quả tối đa cho bác sĩ và khách hàng.',
    products: [
      {
        name: 'Juvederm Voluma XC',
        description: 'Filler chứa acid hyaluronic đậm đặc giúp phục hồi thể tích vùng má và cằm với độ bền kéo dài lên tới 24 tháng.',
        imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Botox Cosmetic',
        description: 'Sản phẩm botulinum toxin nhóm A nguyên bản nhất thế giới, xóa nếp nhăn động vùng trán, gian mày và đuôi mắt.',
        imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    id: 'galderma',
    name: 'Galderma Laboratories',
    logoType: 'galderma',
    category: 'Vàng',
    description: 'Chuyên gia da liễu toàn cầu hàng đầu sở hữu Restylane - dòng filler HA ứng dụng công nghệ NASHA và OBT độc quyền.',
    website: 'https://www.galderma.com',
    phone: '028-3911-3000',
    email: 'info.vietnam@galderma.com',
    address: 'Phòng 1202, Tòa nhà Metropolitan, Đồng Khởi, Quận 1, TP. HCM',
    introduction: 'Galderma là công ty da liễu độc lập lớn nhất thế giới, tập trung hoàn toàn vào việc chăm sóc và bảo vệ sức khỏe làn da. Restylane của Galderma là dòng chất làm đầy đầu tiên trên thế giới được FDA chấp thuận, ứng dụng hai công nghệ NASHA™ và OBT™ giúp bác sĩ linh hoạt điêu khắc phom dáng tự nhiên nhất cho bệnh nhân.',
    products: [
      {
        name: 'Restylane Defyne / Refyne',
        description: 'Dòng chất làm đầy linh hoạt, duy trì biểu cảm tự nhiên và chuyển động linh hoạt của cơ mặt sau tiêm.',
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Sculptra Aesthetic',
        description: 'Hoạt chất kích thích tăng sinh Collagen tự nhiên từ PLLA, giúp da săn chắc, đàn hồi sâu từ bên trong.',
        imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    id: 'merz',
    name: 'Merz Aesthetics Vietnam',
    logoType: 'merz',
    category: 'Bạc',
    description: 'Thương hiệu thẩm mỹ nổi tiếng từ Đức sở hữu công nghệ nâng cơ Ultherapy và filler tăng sinh collagen Radiesse.',
    website: 'https://merzaesthetics.com',
    phone: '028-3827-2888',
    email: 'info@merzaesthetics.com.vn',
    address: 'Lầu 15, Tòa nhà Sun Wah Tower, Nguyễn Huệ, Quận 1, TP. HCM',
    introduction: 'Merz Aesthetics là công ty thẩm mỹ y khoa có bề dày lịch sử hơn 110 năm từ Đức. Merz nổi tiếng với giải pháp nâng cơ căng da Ultherapy sử dụng sóng siêu âm hội tụ vi điểm hội tụ, kết hợp màn hình siêu âm quan sát trực quan duy nhất trên thế giới đảm bảo năng lượng bắn chính xác tầng cơ SMAS.',
    products: [
      {
        name: 'Ultherapy System',
        description: 'Tiêu chuẩn vàng trong nâng cơ căng da mặt và cổ không phẫu thuật với hình ảnh siêu âm thời gian thực MFU-V.',
        imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Radiesse Regenerative Filler',
        description: 'Chất làm đầy chứa CaHA giúp bù đắp thể tích tức thì và kích thích sản sinh collagen thế hệ mới.',
        imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800'
      }
    ]
  }
];

export interface NewsItem {
  id: string;
  imageUrl: string;
  category: string;
  categoryColor: 'primary' | 'secondary';
  date: string;
  title: string;
  excerpt: string;
  published: boolean;
}

export const NEWS_DATA: NewsItem[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    category: 'Báo cáo',
    categoryColor: 'primary',
    date: '10 Tháng 11, 2024',
    title: 'Thông báo về việc nộp bài báo khoa học quý IV/2024',
    excerpt: 'Ban biên soạn tạp chí HSAPS chính thức tiếp nhận các công trình nghiên cứu và bài báo khoa học chuẩn bị xuất bản số cuối năm.',
    published: true,
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800',
    category: 'Hợp tác quốc tế',
    categoryColor: 'secondary',
    date: '05 Tháng 11, 2024',
    title: 'Lễ ký kết hợp tác chiến lược với Hội Phẫu thuật thẩm mỹ Hàn Quốc (KAPS)',
    excerpt: 'Sự kiện đánh dấu cột mốc quan trọng trong trao đổi học thuật, chuyển giao công nghệ và công nhận tín chỉ CME song phương.',
    published: true,
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
    category: 'Khuyến cáo',
    categoryColor: 'primary',
    date: '01 Tháng 11, 2024',
    title: 'Hướng dẫn lâm sàng về phòng ngừa biến chứng tiêm chất làm đầy (Filler)',
    excerpt: 'Khuyến cáo đồng thuận mới nhất của Hội đồng Y khoa HSAPS nhằm tăng cường tính an toàn và giảm thiểu rủi ro trong thẩm mỹ nội khoa.',
    published: true,
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    category: 'Hoạt động Hội',
    categoryColor: 'secondary',
    date: '28 Tháng 10, 2024',
    title: 'Đoàn đại biểu đại diện HSAPS tham dự Hội nghị Thẩm mỹ Quốc tế IMCAS Châu Á',
    excerpt: 'Đoàn chuyên gia hàng đầu Việt Nam báo cáo các chuyên đề khoa học và chia sẻ những kỹ thuật tạo hình thẩm mỹ đặc trưng khu vực.',
    published: true,
  },
];



