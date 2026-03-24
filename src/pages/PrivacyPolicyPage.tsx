import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../App';
import DarkModeToggle from '../components/DarkModeToggle';

export default function PrivacyPolicyPage() {
  const { isDark, toggle } = useContext(DarkModeContext);
  const today = '2026年3月24日';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 px-4 shadow-lg sticky top-0 z-30">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link to="/" className="text-white/80 hover:text-white transition-colors text-lg p-1 -ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center">
            ←
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-base md:text-lg font-bold">プライバシーポリシー</h1>
          </div>
          <DarkModeToggle isDark={isDark} toggle={toggle} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">

          <p className="text-xs text-gray-500 dark:text-gray-400">制定日：{today}</p>

          <p>
            本サイト「パチスロ設定判別ツール」（以下「当サイト」）は、ユーザーのプライバシーを尊重し、
            個人情報の保護に努めます。以下のプライバシーポリシーをお読みください。
          </p>

          {/* アクセス解析 */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-1">
              1. アクセス解析ツールについて
            </h2>
            <p>
              当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を使用しています。
              Google Analyticsはトラフィックデータの収集のためにCookieを使用しています。
              このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
            </p>
            <p>
              この機能はCookieを無効にすることで収集を拒否することができます。
              詳しくはお使いのブラウザの設定をご確認ください。
            </p>
            <p>
              Google Analyticsの利用規約については
              <a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline ml-1">こちら</a>
              をご参照ください。
            </p>
          </section>

          {/* 広告について */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-1">
              2. 広告の配信について
            </h2>
            <p>
              当サイトはGoogle AdSense（グーグルアドセンス）を利用して広告を掲載する場合があります。
              Google AdSenseはCookieを使用し、ユーザーの興味に応じた広告を表示することがあります。
              Cookieを使用することで、Googleはユーザーのサイトやインターネットへのアクセス情報に基づいて適切な広告を表示します。
            </p>
            <p>
              ユーザーはGoogleの
              <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">広告設定ページ</a>
              でパーソナライズ広告を無効にできます。
            </p>
          </section>

          {/* 収集する情報 */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-1">
              3. 当サイトが収集する情報
            </h2>
            <p>当サイトでは以下の情報を収集することがあります：</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>アクセスログ（IPアドレス、ブラウザの種類、アクセス日時等）</li>
              <li>みんなの声（フィードバック）に入力いただいた内容</li>
              <li>ブラウザのlocalStorageに保存される入力データ（端末内のみ、サーバーには送信されません）</li>
            </ul>
          </section>

          {/* 個人情報の管理 */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-1">
              4. 個人情報の管理
            </h2>
            <p>
              当サイトは、収集した個人情報を適切に管理し、以下の場合を除いて第三者に開示・提供することはありません。
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>ご本人の同意がある場合</li>
              <li>法令に基づき開示が必要な場合</li>
            </ul>
          </section>

          {/* Cookieについて */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-1">
              5. Cookieについて
            </h2>
            <p>
              当サイトでは、アクセス解析・広告配信のためにCookieを使用する場合があります。
              Cookieはブラウザの設定から無効にすることができますが、一部のサービスが正しく動作しなくなる場合があります。
            </p>
          </section>

          {/* プライバシーポリシーの変更 */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-1">
              6. プライバシーポリシーの変更
            </h2>
            <p>
              当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。
              変更後のプライバシーポリシーは、当ページに掲示した時点から効力を生じるものとします。
            </p>
          </section>

          {/* お問い合わせ */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-1">
              7. お問い合わせ
            </h2>
            <p>
              プライバシーポリシーに関するお問い合わせは、
              <Link to="/feedback" className="text-blue-600 dark:text-blue-400 underline ml-1">みんなの声ページ</Link>
              よりご連絡ください。
            </p>
          </section>

          <p className="text-xs text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-600">
            以上
          </p>
        </div>
      </main>

      <footer className="text-center text-xs text-gray-400 dark:text-gray-500 py-6">
        <Link to="/" className="hover:underline">← トップページへ戻る</Link>
      </footer>
    </div>
  );
}
