import { useContext, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { MachineListItem } from '../types/machine';
import { DarkModeContext } from '../App';
import DarkModeToggle from '../components/DarkModeToggle';

const MACHINES: MachineListItem[] = [
  {
    id: 'kabaneri',
    name: 'スマスロ 甲鉄城のカバネリ 海門決戦',
    shortName: 'カバネリ',
    color: 'bg-gradient-to-r from-purple-600 to-indigo-600',
    description: 'ボーナス確率・ベル確率・演出系・トロフィーなど多数の設定差要素',
    icon: '🚂',
  },
  {
    id: 'enen',
    name: 'Lパチスロ 炎炎ノ消防隊2',
    shortName: '炎炎ノ消防隊2',
    color: 'bg-gradient-to-r from-red-600 to-orange-500',
    description: '炎炎ループ初当たり・終了画面・キャラ紹介・ミニキャラなど',
    icon: '🔥',
  },
  {
    id: 'milliongod',
    name: 'スマスロ ミリオンゴッド-神々の軌跡-',
    shortName: 'ミリオンゴッド',
    color: 'bg-gradient-to-r from-yellow-600 to-amber-500',
    description: 'GG初当たり確率に大きな設定差。偶数設定が高機械割',
    icon: '⚡',
    disabled: true,
    disabledReason: '2026年4月導入予定 - 導入後に解析データを反映します',
  },
  {
    id: 'umineko',
    name: 'Lパチスロ うみねこのなく頃に2',
    shortName: 'うみねこ2',
    color: 'bg-gradient-to-r from-blue-700 to-cyan-600',
    description: 'ボーナス合算・REG中青7揃い・ロゴ発光・超パー演出など',
    icon: '🦋',
  },
  {
    id: 'koukaku',
    name: 'スマスロ 攻殻機動隊',
    shortName: '攻殻機動隊',
    color: 'bg-gradient-to-r from-teal-600 to-emerald-600',
    description: 'AT確率・殲滅ゾーン・タチコマ当選率・終了画面・トロフィー',
    icon: '🤖',
  },
  {
    id: 'hokuto',
    name: 'スマスロ 北斗の拳 転生の章2',
    shortName: '北斗転生2',
    color: 'bg-gradient-to-r from-sky-700 to-blue-600',
    description: 'AT初当たり・天破の刻・天撃成功率・サミートロフィー・モード',
    icon: '⭐',
  },
  {
    id: 'ghoul',
    name: 'L 東京喰種',
    shortName: '東京喰種',
    color: 'bg-gradient-to-r from-gray-800 to-red-900',
    description: 'CZ/AT確率・AT終了画面・トロフィー・招待状・CZ終了画面',
    icon: '👁️',
  },
  {
    id: 'hanahana',
    name: 'スマート沖スロ ニューキングハナハナV',
    shortName: 'ニューキングハナハナV',
    color: 'bg-gradient-to-r from-pink-600 to-rose-500',
    description: 'BIG/REG確率・ベル確率・BIG中スイカ・サイドランプ色・ハイビスカスランプ',
    icon: '🌺',
  },
  {
    id: 'okidoki_black',
    name: '沖ドキ！BLACK',
    shortName: '沖ドキ！BLACK',
    color: 'bg-gradient-to-r from-gray-900 to-red-800',
    description: '初当たり確率・チェリーB確率・確定役B・モード移行率・黒ドキモード',
    icon: '🖤',
  },
  {
    id: 'hokuto_original',
    name: 'スマスロ北斗の拳',
    shortName: '北斗の拳',
    color: 'bg-gradient-to-r from-blue-900 to-indigo-800',
    description: 'AT初当たり・小役確率・リーチ目・BB終了時ボイス・サミートロフィー',
    icon: '💫',
  },
  {
    id: 'valvrave2',
    name: 'Lパチスロ 革命機ヴァルヴレイヴ2',
    shortName: 'ヴァルヴレイヴ2',
    color: 'bg-gradient-to-r from-violet-700 to-fuchsia-600',
    description: 'AT初当たり・CZ当選率・終了画面・サミートロフィー',
    icon: '⚔️',
  },
  {
    id: 'okidoki_duo',
    name: 'スマスロ 沖ドキ！DUOアンコール',
    shortName: '沖ドキ！DUOアンコール',
    color: 'bg-gradient-to-r from-pink-500 to-orange-400',
    description: '初当たり確率・チェリー確率・天国移行率・32G天井',
    icon: '🌴',
  },
  {
    id: 'monkeyturn',
    name: 'スマスロモンキーターンV',
    shortName: 'モンキーターンV',
    color: 'bg-gradient-to-r from-cyan-600 to-blue-500',
    description: 'AT初当たり・ベル確率・終了画面・サミートロフィー',
    icon: '🚤',
  },
  {
    id: 'magireco',
    name: 'スマスロ マギアレコード まどマギ外伝',
    shortName: 'マギアレコード',
    color: 'bg-gradient-to-r from-pink-600 to-purple-600',
    description: 'AT初当たり・小役確率・終了画面・魔法少女演出',
    icon: '✨',
  },
  {
    id: 'onimusha3',
    name: 'スマスロ 新鬼武者3',
    shortName: '新鬼武者3',
    color: 'bg-gradient-to-r from-red-800 to-amber-700',
    description: 'AT初当たり・小役確率・終了画面・桜花乱舞演出',
    icon: '🌸',
  },
  {
    id: 'tokyorevengers',
    name: 'スマスロ 東京リベンジャーズ',
    shortName: '東京リベンジャーズ',
    color: 'bg-gradient-to-r from-yellow-500 to-red-500',
    description: 'AT初当たり・小役確率・終了画面・タイムリープ演出',
    icon: '⏰',
  },
  {
    id: 'bancho4',
    name: '押忍！番長4',
    shortName: '番長4',
    color: 'bg-gradient-to-r from-amber-600 to-orange-600',
    description: 'AT初当たり・ベル確率・対決演出・番長ボーナス',
    icon: '👊',
  },
  {
    id: 'tekken6',
    name: 'スマスロ鉄拳6',
    shortName: '鉄拳6',
    color: 'bg-gradient-to-r from-orange-700 to-red-700',
    description: 'AT初当たり・小役確率・終了画面・サミートロフィー',
    icon: '🥊',
  },
  {
    id: 'monhunrise',
    name: 'スマスロ モンスターハンターライズ',
    shortName: 'モンハンライズ',
    color: 'bg-gradient-to-r from-emerald-700 to-lime-600',
    description: 'AT初当たり・小役確率・終了画面・討伐結果演出',
    icon: '🐉',
  },
  {
    id: 'godeater',
    name: 'スマスロ ゴッドイーター リザレクション',
    shortName: 'ゴッドイーター',
    color: 'bg-gradient-to-r from-red-700 to-yellow-600',
    description: 'AT初当たり・小役確率・終了画面・リンクバースト演出',
    icon: '🗡️',
  },
  {
    id: 'sbj',
    name: 'スマスロスーパーブラックジャック',
    shortName: 'スーパーBJ',
    color: 'bg-gradient-to-r from-green-800 to-emerald-600',
    description: 'AT初当たり・小役確率・ディーラー演出・終了画面',
    icon: '🃏',
  },
  {
    id: 'mushokutensei',
    name: 'L無職転生～異世界行ったら本気だす～',
    shortName: '無職転生',
    color: 'bg-gradient-to-r from-teal-600 to-cyan-500',
    description: 'AT初当たり・小役確率・終了画面・転生演出',
    icon: '📖',
  },
  {
    id: 'bakemonogatari',
    name: 'スマスロ化物語',
    shortName: '化物語',
    color: 'bg-gradient-to-r from-purple-600 to-pink-500',
    description: 'AT初当たり・スイカ確率・弱チェリー直撃・サミートロフィー',
    icon: '🦀',
  },
  {
    id: 'goblinslayer2',
    name: 'スマスロ ゴブリンスレイヤーII',
    shortName: 'ゴブスレII',
    color: 'bg-gradient-to-r from-stone-700 to-red-800',
    description: 'AT初当たり・CZ確率・藤丸コイン・AT終了画面',
    icon: '🗡️',
  },
  {
    id: 'karakuri',
    name: 'スマスロ からくりサーカス',
    shortName: 'からくりサーカス',
    color: 'bg-gradient-to-r from-yellow-600 to-red-600',
    description: 'AT/CZ確率・AT終了画面・エンディングランプ・踊れオリンピア',
    icon: '🎪',
  },
  {
    id: 'gojieva',
    name: 'L ゴジラ対エヴァンゲリオン',
    shortName: 'ゴジラvsエヴァ',
    color: 'bg-gradient-to-r from-green-800 to-purple-800',
    description: 'AT/ボーナス確率・スイカCZ・殲滅作戦勝利率・終了画面',
    icon: '🦖',
  },
  {
    id: 'railgun',
    name: 'スマスロ とある科学の超電磁砲',
    shortName: '超電磁砲',
    color: 'bg-gradient-to-r from-sky-500 to-indigo-600',
    description: 'AT/CZ確率・藤丸コイン・AT終了画面・獲得枚数表示',
    icon: '⚡',
  },
  {
    id: 'rezero2',
    name: 'スマスロ Re:ゼロ Season2',
    shortName: 'リゼロ2',
    color: 'bg-gradient-to-r from-blue-700 to-cyan-500',
    description: 'AT初当たり・引き戻し率・AT終了画面・菜月家時計',
    icon: '🔄',
  },
];

export default function HomePage() {
  const { isDark, toggle } = useContext(DarkModeContext);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return MACHINES;
    const q = search.trim().toLowerCase();
    return MACHINES.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.shortName.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.id.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
      <header className="bg-gradient-to-r from-indigo-700 to-violet-700 dark:from-indigo-900 dark:to-violet-900 text-white py-8 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute right-0 top-0">
            <DarkModeToggle isDark={isDark} toggle={toggle} />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">🎰 パチスロ設定判別ツール</h1>
          <p className="text-indigo-200 text-sm mt-2">機種を選択して設定判別を開始</p>
          {/* 検索窓 */}
          <div className="mt-4 max-w-md mx-auto relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="機種名で検索（例：カバネリ、北斗、沖ドキ）"
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors text-lg w-10 h-10 flex items-center justify-center"
                aria-label="検索をクリア"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 flex-1">
        {/* このサイトでできること */}
        {!search.trim() && (
          <div className="mb-6 animate-fade-in">
            <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 text-center">
              このツールでできること
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {[
                { icon: '📊', title: '設定判別', desc: 'ベイズ推定で設定確率を算出' },
                { icon: '🔍', title: '台選び', desc: 'データカウンターから即座に判定' },
                { icon: '📖', title: '演出辞典', desc: '設定示唆演出をすぐ検索' },
                { icon: '🎯', title: '攻め方ガイド', desc: '設定狙い・朝一・やめ時' },
              ].map((f, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-100 dark:border-gray-700 text-center shadow-sm"
                >
                  <div className="text-2xl sm:text-3xl mb-1">{f.icon}</div>
                  <div className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">{f.title}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">{f.desc}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-2 sm:mt-3">
              {[
                { icon: '🏔️', title: '天井・ゾーン', desc: '期待値テーブル完備' },
                { icon: '✅', title: 'チェックリスト', desc: '打ちながら確認漏れ防止' },
                { icon: '💰', title: '収支シミュレーター', desc: '期待収支をリアルタイム計算' },
                { icon: '📱', title: 'PWA対応', desc: 'ホーム画面に追加して即起動' },
              ].map((f, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-100 dark:border-gray-700 text-center shadow-sm"
                >
                  <div className="text-2xl sm:text-3xl mb-1">{f.icon}</div>
                  <div className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">{f.title}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">{f.desc}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-3">
              全{MACHINES.length}機種対応 / オフライン利用可 / 完全無料
            </p>
          </div>
        )}

        {/* 検索結果カウント */}
        {search.trim() && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            「{search.trim()}」の検索結果: {filtered.length}件
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 py-16 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">「{search.trim()}」に一致する機種が見つかりません</p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">機種名の一部で検索してみてください</p>
          </div>
        ) : (
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          {filtered.map((machine, idx) =>
            machine.disabled ? (
              <div
                key={machine.id}
                style={{ animationDelay: `${idx * 50}ms` }}
                className="relative block bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden opacity-60 cursor-not-allowed select-none animate-slide-up"
              >
                {/* 斜線オーバーレイ */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <line x1="0" y1="0" x2="100" y2="100" stroke="#9CA3AF" strokeWidth="0.5" />
                    <line x1="100" y1="0" x2="0" y2="100" stroke="#9CA3AF" strokeWidth="0.5" />
                  </svg>
                </div>
                <div className={`${machine.color} px-4 py-3 flex items-center gap-3 grayscale`}>
                  <span className="text-3xl">{machine.icon}</span>
                  <div>
                    <h2 className="text-white font-bold text-sm leading-tight">{machine.shortName}</h2>
                    <p className="text-white/70 text-[10px] leading-tight mt-0.5">{machine.name}</p>
                  </div>
                </div>
                <div className="px-4 py-3 relative">
                  <p className="text-xs text-gray-400 leading-relaxed">{machine.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700 rounded-full px-2 py-0.5 flex-shrink-0">
                      🚧 工事中
                    </span>
                    <span className="text-[10px] text-gray-400 break-words">
                      {machine.disabledReason}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={machine.id}
                to={`/${machine.id}`}
                style={{ animationDelay: `${idx * 50}ms` }}
                className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:scale-[1.02] hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-200 active:scale-[0.98] min-h-[44px] animate-slide-up"
              >
                <div className={`${machine.color} px-4 py-3 flex items-center gap-3`}>
                  <span className="text-3xl">{machine.icon}</span>
                  <div>
                    <h2 className="text-white font-bold text-sm leading-tight">{machine.shortName}</h2>
                    <p className="text-white/70 text-[10px] leading-tight mt-0.5">{machine.name}</p>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{machine.description}</p>
                  <div className="mt-2 flex items-center justify-end">
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-colors">
                      判別を開始 →
                    </span>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
        )}

        {/* みんなの声バナー */}
        <Link
          to="/feedback"
          className="mt-6 block bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all active:scale-[0.98] min-h-[44px]"
        >
          <div className="px-5 py-4 flex items-center gap-4">
            <span className="text-3xl">📣</span>
            <div className="flex-1">
              <h2 className="text-white font-bold text-sm">みんなの声</h2>
              <p className="text-emerald-100 text-xs mt-0.5">
                ご意見・ご要望・データ修正の報告はこちらから。皆さんの声でアプリを改善します！
              </p>
            </div>
            <span className="text-white/70 text-lg">→</span>
          </div>
        </Link>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-5 px-4 mt-8">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* ページリンク */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
            <Link to="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline transition-colors">
              プライバシーポリシー
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link to="/terms" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline transition-colors">
              利用規約・免責事項
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link to="/feedback" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline transition-colors">
              お問い合わせ
            </Link>
          </div>
          {/* 免責文 */}
          <p className="text-[10px] text-gray-400 text-center leading-relaxed">
            本ツールは非公式の個人制作であり、各パチスロメーカー・版権元とは一切関係ありません。
          </p>
          <p className="text-[10px] text-gray-400 text-center leading-relaxed">
            掲載されている解析値は暫定値を含みます。実際の数値と異なる場合がありますので、参考値としてご利用ください。
          </p>
          <p className="text-[10px] text-gray-400 text-center leading-relaxed">
            機種名・キャラクター名等の知的財産権は各権利者に帰属します。© 2026 パチスロ設定判別ツール
          </p>
        </div>
      </footer>
    </div>
  );
}
