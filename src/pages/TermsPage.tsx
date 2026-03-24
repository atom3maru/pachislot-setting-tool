import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../App';
import DarkModeToggle from '../components/DarkModeToggle';

export default function TermsPage() {
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
            <h1 className="text-base md:text-lg font-bold">利用規約・免責事項</h1>
          </div>
          <DarkModeToggle isDark={isDark} toggle={toggle} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">

          <p className="text-xs text-gray-500 dark:text-gray-400">制定日：{today}</p>

          <p>
            本サイト「パチスロ設定判別ツール」（以下「当サイト」）をご利用いただく前に、
            以下の利用規約をよくお読みください。当サイトをご利用いただいた時点で、
            本規約に同意したものとみなします。
          </p>

          {/* 利用規約 */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-1">
              第1条（サービスの内容）
            </h2>
            <p>
              当サイトは、パチスロ機種の設定判別を補助するためのツールを無償で提供しています。
              当サイトは個人が制作・運営する非公式のサービスであり、各パチスロメーカー・版権元とは一切関係ありません。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-1">
              第2条（解析データについて）
            </h2>
            <p>当サイトが掲載している設定差データについて、以下の点をご了承ください。</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>メーカー公表値および有志による実戦値・推定値を含みます</li>
              <li>暫定値を含み、実際の数値と異なる場合があります</li>
              <li>解析情報の更新状況によって、最新情報と異なる場合があります</li>
              <li>本ツールによる判別結果はあくまで参考値であり、設定を保証するものではありません</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-1">
              第3条（知的財産権）
            </h2>
            <p>
              当サイトに掲載されている機種名・キャラクター名・その他のコンテンツに関する知的財産権は、
              各権利者（各パチスロメーカー・版権元等）に帰属します。
              当サイトは各権利者の公式サイトではなく、商標権・著作権等の侵害を意図するものではありません。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-1">
              第4条（禁止事項）
            </h2>
            <p>ユーザーは当サイトの利用にあたり、以下の行為を行ってはなりません。</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>当サイトのコンテンツを無断で複製・転載・販売する行為</li>
              <li>当サイトのサーバーに過大な負荷をかける行為</li>
              <li>不正アクセスやシステムへの妨害行為</li>
              <li>その他、法令または公序良俗に反する行為</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-1">
              第5条（年齢制限）
            </h2>
            <p>
              パチスロは18歳未満の方のご利用が法律で禁止されています。
              当サイトは18歳以上の方を対象としています。
              18歳未満の方はご利用をお控えください。
            </p>
          </section>

          {/* 免責事項 */}
          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-1">
              第6条（免責事項）
            </h2>
            <p>
              当サイトの情報を利用したことによる損害・損失について、当サイト運営者は一切の責任を負いません。
              以下の点について特にご注意ください。
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>当サイトの判別結果に基づいた遊技による損失</li>
              <li>掲載データの誤りによる損害</li>
              <li>サービスの一時停止・終了による損害</li>
              <li>外部リンク先のコンテンツに関する損害</li>
            </ul>
            <p className="mt-2 font-medium text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-3">
              ⚠️ パチスロは遊技の結果を保証するものではありません。
              ご自身の判断と責任においてご利用ください。
              のめり込みに注意し、適切な遊技を心がけてください。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-1">
              第7条（サービスの変更・終了）
            </h2>
            <p>
              当サイトは、予告なくサービス内容の変更・停止・終了を行う場合があります。
              これによってユーザーに生じた損害について、当サイト運営者は責任を負いません。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-1">
              第8条（規約の変更）
            </h2>
            <p>
              当サイトは、必要に応じて本規約を変更することがあります。
              変更後の規約は当ページに掲示した時点から効力を生じます。
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
