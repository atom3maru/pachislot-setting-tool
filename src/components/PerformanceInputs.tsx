import type { InputData } from '../types';
import SectionCard from './SectionCard';
import NumberField from './NumberField';

interface Props {
  data: InputData;
  onChange: (field: keyof InputData, value: number | null) => void;
}

export default function PerformanceInputs({ data, onChange }: Props) {
  return (
    <SectionCard title="演出系データ" icon="🎬">
      <div className="space-y-4">
        {/* ボイス */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-2">逆押しカットインボイス</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <NumberField label="未発生" value={data.v_none} onChange={v => onChange('v_none', v)} hint="設定5以上濃厚!" />
            <NumberField label="男性ボイス" value={data.v_male} onChange={v => onChange('v_male', v)} hint="奇数設定示唆" />
            <NumberField label="女性ボイス" value={data.v_female} onChange={v => onChange('v_female', v)} hint="偶数設定示唆" />
            <NumberField label="景之ボイス" value={data.v_kage} onChange={v => onChange('v_kage', v)} hint="高設定示唆" />
            <NumberField label="無名特殊ボイス" value={data.v_nana} onChange={v => onChange('v_nana', v)} hint="設定2以上濃厚" />
          </div>
        </div>

        {/* キャラ紹介 */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-2">キャラ紹介（カバネリボーナス中）</h3>
          <div className="grid grid-cols-3 gap-3">
            <NumberField label="女性多め" value={data.c_female} onChange={v => onChange('c_female', v)} hint="偶数設定示唆" />
            <NumberField label="男性多め" value={data.c_male} onChange={v => onChange('c_male', v)} hint="奇数設定示唆" />
            <NumberField label="美馬出現" value={data.c_bima} onChange={v => onChange('c_bima', v)} hint="設定4以上濃厚!" />
          </div>
        </div>

        {/* ゾロ目上乗せ */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-2">カバネリアタック・ゾロ目上乗せ</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <NumberField label="+44枚" value={data.zoro44} onChange={v => onChange('zoro44', v)} hint="設定4以上濃厚" />
            <NumberField label="+55枚" value={data.zoro55} onChange={v => onChange('zoro55', v)} hint="設定5以上濃厚" />
            <NumberField label="+66枚" value={data.zoro66} onChange={v => onChange('zoro66', v)} hint="設定6濃厚!" />
            <NumberField label="+77枚" value={data.zoro77} onChange={v => onChange('zoro77', v)} hint="設定6濃厚!" />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
