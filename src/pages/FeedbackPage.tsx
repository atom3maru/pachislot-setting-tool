import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* ---------- 型定義 ---------- */
interface FeedbackItem {
  id: string;
  nickname: string;
  category: string;
  machine: string;
  message: string;
  timestamp: number;
}

/* ---------- 定数 ---------- */
const CATEGORIES = [
  { value: 'bug', label: '🐛 不具合報告' },
  { value: 'data', label: '📊 データ修正' },
  { value: 'request', label: '💡 機能リクエスト' },
  { value: 'machine', label: '🎰 新機種追加希望' },
  { value: 'other', label: '💬 その他・感想' },
];

const MACHINES = [
  { value: '', label: '-- 特になし --' },
  { value: 'kabaneri', label: 'カバネリ' },
  { value: 'enen', label: '炎炎ノ消防隊2' },
  { value: 'milliongod', label: 'ミリオンゴッド' },
  { value: 'umineko', label: 'うみねこ2' },
  { value: 'koukaku', label: '攻殻機動隊' },
  { value: 'hokuto', label: '北斗転生2' },
  { value: 'ghoul', label: '東京喰種' },
];

const STORAGE_KEY = 'pachislot-feedback';

/* ---------- localStorage ヘルパー ---------- */
function loadFeedback(): FeedbackItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFeedback(items: FeedbackItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

/* ---------- カテゴリラベル取得 ---------- */
function getCategoryLabel(value: string): string {
  return CATEGORIES.find(c => c.value === value)?.label ?? value;
}

function getMachineLabel(value: string): string {
  return MACHINES.find(m => m.value === value)?.label ?? '';
}

/* ---------- 日時フォーマット ---------- */
function formatDate(ts: number): string {
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/* ---------- メインコンポーネント ---------- */
export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [nickname, setNickname] = useState('');
  const [category, setCategory] = useState('other');
  const [machine, setMachine] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setFeedbacks(loadFeedback());
  }, []);

  /* 投稿 */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const item: FeedbackItem = {
      id: crypto.randomUUID(),
      nickname: nickname.trim() || '名無しさん',
      category,
      machine,
      message: message.trim(),
      timestamp: Date.now(),
    };

    const updated = [item, ...feedbacks];
    setFeedbacks(updated);
    saveFeedback(updated);
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  /* フィルタリング */
  const filtered = filter === 'all'
    ? feedbacks
    : feedbacks.filter(f => f.category === filter);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white py-5 px-4 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-xs mb-2 transition-colors">
            ← トップへ戻る
          </Link>
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            📣 みんなの声
          </h1>
          <p className="text-emerald-100 text-sm mt-1">
            ご意見・ご要望をお聞かせください。皆さんの声でアプリを改善していきます！
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 flex-1 w-full">

        {/* ========== 投稿フォーム ========== */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-3 border-b border-gray-100">
            <h2 className="font-bold text-gray-800 text-sm flex items-center gap-2">
              ✏️ 声を投稿する
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* ニックネーム */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">ニックネーム（任意）</label>
              <input
                type="text"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                placeholder="名無しさん"
                maxLength={20}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all"
              />
            </div>

            {/* カテゴリ & 関連機種 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">カテゴリ</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none bg-white"
                >
                  {CATEGORIES.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">関連機種（任意）</label>
                <select
                  value={machine}
                  onChange={e => setMachine(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none bg-white"
                >
                  {MACHINES.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* メッセージ */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                メッセージ <span className="text-red-500">*</span>
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="例：カバネリの駿城ボーナスのデータが違うかも / こんな機種を追加してほしい / ○○の機能が欲しい"
                rows={4}
                maxLength={500}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all resize-none"
              />
              <p className="text-right text-[10px] text-gray-400 mt-1">{message.length} / 500</p>
            </div>

            {/* 送信ボタン */}
            <button
              type="submit"
              disabled={!message.trim()}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 rounded-lg text-sm hover:from-emerald-700 hover:to-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-sm"
            >
              📣 投稿する
            </button>

            {/* 送信完了メッセージ */}
            {submitted && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-sm text-emerald-700 text-center animate-pulse">
                ✅ 投稿ありがとうございます！今後のアプデに活かします！
              </div>
            )}
          </form>
        </section>

        {/* ========== 投稿一覧 ========== */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              💬 みんなの声 <span className="text-xs font-normal text-gray-400">({filtered.length}件)</span>
            </h2>
            {/* フィルタ */}
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-1 text-xs bg-white focus:ring-2 focus:ring-emerald-400 outline-none"
            >
              <option value="all">すべて</option>
              {CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-gray-400 text-sm">まだ投稿がありません</p>
              <p className="text-gray-300 text-xs mt-1">最初の声を投稿してみましょう！</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(fb => (
                <article
                  key={fb.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* メタ情報 */}
                  <div className="flex items-center gap-2 px-4 pt-3 pb-1 flex-wrap">
                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full px-2 py-0.5">
                      {getCategoryLabel(fb.category)}
                    </span>
                    {fb.machine && (
                      <span className="bg-purple-50 text-purple-600 text-[10px] font-bold rounded-full px-2 py-0.5">
                        🎰 {getMachineLabel(fb.machine)}
                      </span>
                    )}
                    <span className="ml-auto text-[10px] text-gray-300">{formatDate(fb.timestamp)}</span>
                  </div>

                  {/* 本文 */}
                  <div className="px-4 py-2">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{fb.message}</p>
                  </div>

                  {/* 投稿者 */}
                  <div className="px-4 pb-3">
                    <p className="text-[11px] text-gray-400">by {fb.nickname}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ========== 注意書き ========== */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <p className="text-xs text-amber-700 font-bold mb-1">📌 お知らせ</p>
          <ul className="text-[11px] text-amber-600 space-y-1 list-disc list-inside">
            <li>現在、投稿はお使いのブラウザにのみ保存されます（他のユーザーには表示されません）</li>
            <li>将来的にサーバー接続後、全ユーザーで共有されるようになります</li>
            <li>いただいた声は定期的に確認し、アプリの改善に反映していきます</li>
            <li>個人情報の投稿はお控えください</li>
          </ul>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-gray-100 border-t border-gray-200 py-4 px-4 mt-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] text-gray-400 text-center leading-relaxed">
            本ツールは非公式の個人制作であり、各パチスロメーカー・版権元とは一切関係ありません。
          </p>
        </div>
      </footer>
    </div>
  );
}
