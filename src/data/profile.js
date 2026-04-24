export const profile = {
  name: '鈴木 悠悟',
  nameEn: 'Suzuki Yugo',
  birthdate: '2005年12月3日',
  location: '千葉県在住',
  university: '武蔵野大学 データサイエンス学部 データサイエンス学科 2年',
  tagline: 'フルスタック開発 / ハッカソン常連 / チームを巻き込む行動力',

  strengths: `目標に対して全力で取り組み、周囲を巻き込みながら行動できる点が私の長所です。
大学では、ハッカソンなどの学内外のイベントに友達を誘い積極的に参加し、自らリーダーを引き受け、メンバーの役割分担を明確にしました。`,

  weakness: `物事を早く進めようとするあまり急ぎすぎてしまう点が短所です。
現在は「一度立ち止まって確認する」ことを意識し、チェックリストを活用することで改善に取り組んでいます。`,

  activities: [
    '武蔵野大学大学祭実行委員会 副委員長',
    '成田空港 JAPAN DUTY FREE 勤務（1年半）',
    'ハッカソン 5回参加',
    '印西市 20歳を祝う会 実行委員',
    '新入生入学前教育・オリエンテーション メンター',
  ],

  skills: [
    { name: 'HTML/CSS', level: 85 },
    { name: 'JavaScript', level: 75 },
    { name: 'Tailwind CSS', level: 70 },
    { name: 'Python', level: 70 },
    { name: 'Flask', level: 65 },
    { name: 'SQLite / DB', level: 60 },
    { name: 'React', level: 40 },
  ],
};

export const projects = [
  {
    id: 6,
    title: 'ClearShift — シフト管理アプリ',
    event: '大学祭実行委員会 自主開発',
    period: '2026年3月〜',
    description: '武蔵野大学大学祭実行委員会での使用を目的に開発中のシフト管理アプリ。委員会メンバーのシフト作成・調整を効率化し、運営をスムーズにすることを目指す。',
    tech: ['React', 'JavaScript'],
    github: 'https://github.com/s2422092/ClearShift',
    demo: 'https://clear-shift-r0pnrrq1d-s2422092s-projects.vercel.app/',
    role: '開発リード',
  },
  {
    id: 1,
    title: 'モバイルオーダー (PayPay対応)',
    event: '第一回DS学部内ハッカソン',
    period: '2025年7月',
    description: '個人店舗でも簡単に導入できるモバイルオーダーアプリ。チームメンバーの「大手以外ではモバイルオーダーがまだ普及していない」という課題意識から着想。PayPayを使った決済機能を実装。',
    tech: ['HTML', 'CSS', 'JavaScript', 'Flask', 'SQLite'],
    github: 'https://github.com/s2422092/DS_hakka',
    role: 'チームリーダー / バックエンド',
  },
  {
    id: 2,
    title: 'インドネパール料理屋特化モバイルオーダー',
    event: '第二回DS学部内ハッカソン',
    period: '2025年12月',
    description: '特定のインドネパール料理店のためにカスタマイズしたモバイルオーダーシステム。実際の店舗ニーズに対応した機能設計。',
    tech: ['HTML', 'CSS', 'JavaScript', 'Flask'],
    github: 'https://github.com/s2422092/hirolia',
    demo: 'https://hirolia.com/',
    role: '開発リード',
  },
  {
    id: 3,
    title: '位置情報連動SNS',
    event: 'RSSハッカソン',
    period: '2025年9月',
    description: '運営がスポットした範囲に入ると投稿でき、その範囲外からは閲覧不可という新感覚SNS。場所に紐づいた体験型コンテンツを実現。',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript'],
    github: 'https://github.com/keikon0910/rss_hackathon',
    role: 'フロントエンド / 企画',
  },
  {
    id: 4,
    title: 'AI旅行プラン提案アプリ',
    event: '技育展',
    period: '2025年11月',
    description: '目的地・予算・MBTI性格診断などを入力すると、LLMが最適な旅行プランを提案するアプリ。ユーザー登録時の旅行MBTIがプランの個性化に使われる。',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript', 'Flask', 'ChatGPT API'],
    github: 'https://github.com/s2422092/Giikuten',
    role: 'フルスタック / 企画',
  },
  {
    id: 5,
    title: 'ファッションSNSツール',
    event: 'ゼミ合宿',
    period: '2025年8月',
    description: '互いの服装について褒め合う新感覚のSNSツール。ポジティブなコミュニケーションを促進するUI/UXを設計。',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/s2422092/2025_sc_g1',
    role: 'フロントエンド',
  },
];

export const timeline = [
  {
    year: '2026年',
    items: [
      { month: '3月', title: 'スノーボード幹事（大学の友達）/ シフトアプリ開発', desc: '自ら幹事となり大学の友人を集めてスノーボードを企画・実施。また大学祭実行委員会で使用するシフト管理アプリ「ClearShift」の開発を開始' },
      { month: '2月', title: 'スノーボード（地元メンバー）/ アイフル貸し倒れコンペ参加', desc: '地元のメンバーと2月の頭にスノーボードへ。また、アイフルの貸し倒れ予測に関するデータ分析コンペに参加' },
      { month: '1月', title: '成人式・同窓会幹事', desc: '印西市20歳を祝う会の運営委員として成人式を企画・運営' },
    ],
  },
  {
    year: '2025年',
    items: [
      { month: '12月', title: '第二回DS学部内ハッカソン / 年越し', desc: 'インドネパール料理屋特化モバイルオーダーを開発。地元友人と千葉で年越し' },
      { month: '11月', title: '技育展参加', desc: 'AI旅行プラン提案アプリを発表' },
      { month: '9月', title: 'RSSハッカソン参加', desc: '位置情報連動型SNSを開発' },
      { month: '8月', title: 'ゼミ合宿 / 熱海旅行', desc: 'ファッションSNSツールを開発。地元メンバーと熱海2泊3日' },
      { month: '7月', title: 'DS学部内ハッカソン / 初海外（ベトナム）', desc: 'PayPay連携モバイルオーダーを開発。地元仲間と初の海外旅行へ' },
      { month: '4月', title: 'オリエンテーション メンター', desc: '新入生のオリエンテーションにメンターとして参加' },
      { month: '3月', title: '新入生メンター / スノーボード×4回', desc: '4つの異なるコミュニティでスノーボードを楽しみ、交流の幅を拡大' },
      { month: '1月', title: '栃木県那須旅行', desc: '地元メンバーと日光を再訪' },
    ],
  },
  {
    year: '2024年',
    items: [
      { month: '12月', title: '年越し（筑波山）', desc: '地元の仲間と筑波山山頂から初日の出を観賞' },
      { month: '9月', title: 'FS（フィールド・スタディーズ）沖縄', desc: '3泊4日で現地の歴史・文化を学ぶ' },
      { month: '8月', title: 'ゼミ合宿 / 館山旅行', desc: '3泊4日のweb開発合宿（自転車40km！）。地元友人と館山旅行' },
      { month: '4月', title: '武蔵野大学 入学', desc: 'データサイエンス学部に入学' },
    ],
  },
];
