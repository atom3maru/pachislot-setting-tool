/**
 * AdSense広告スロットコンポーネント
 *
 * 使い方:
 * 1. Google AdSenseの審査に通過したら、index.htmlのAdSenseスクリプトのコメントを外す
 * 2. ADSENSE_ENABLED を true に変更
 * 3. AD_CLIENT に自分のAdSense pub-IDを設定
 * 4. 各スロットのAD_SLOTに広告ユニットIDを設定
 */
import { useEffect, useRef } from 'react';

// ============ 設定 ============
// AdSense審査通過後にtrueに変更
const ADSENSE_ENABLED = false;
// AdSense パブリッシャーID（例: 'ca-pub-1234567890123456'）
const AD_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXXX';
// ============ /設定 ============

interface AdSlotProps {
  /** 広告ユニットID */
  slot?: string;
  /** レイアウト: 'banner'=横長, 'rectangle'=四角, 'in-article'=記事内 */
  layout?: 'banner' | 'rectangle' | 'in-article';
  /** 追加CSSクラス */
  className?: string;
}

export default function AdSlot({ slot = '', layout = 'banner', className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!ADSENSE_ENABLED) return;
    try {
      // @ts-expect-error adsbygoogle is injected by Google
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded
    }
  }, []);

  // AdSense無効時はスペースを確保しない
  if (!ADSENSE_ENABLED) return null;

  const formatMap = {
    banner: 'horizontal',
    rectangle: 'rectangle',
    'in-article': 'fluid',
  };

  return (
    <div className={`ad-slot text-center overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={formatMap[layout]}
        data-full-width-responsive="true"
      />
    </div>
  );
}
