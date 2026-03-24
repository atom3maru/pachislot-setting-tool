import type { InputData } from '../types';
import SectionCard from './SectionCard';
import NumberField from './NumberField';

interface Props {
  data: InputData;
  onChange: (field: keyof InputData, value: number | null) => void;
}

export default function OtherInputs({ data, onChange }: Props) {
  return (
    <SectionCard title="その他" icon="📋">
      <div className="space-y-4">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-2">駿城ボーナス中・単チャンス目</h3>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="3000pt獲得" value={data.s3k_hit} onChange={v => onChange('s3k_hit', v)} hint="高設定ほど高い" />
            <NumberField label="3000pt以外" value={data.s3k_none} onChange={v => onChange('s3k_none', v)} />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-2">アイテムくじ</h3>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="菖蒲の弓" value={data.bow_hit} onChange={v => onChange('bow_hit', v)} hint="高設定示唆(設定6≒15%)" />
            <NumberField label="菖蒲の弓以外" value={data.bow_none} onChange={v => onChange('bow_none', v)} />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-2">参考情報</h3>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="ST駆け抜け回数" value={data.nuki} onChange={v => onChange('nuki', v)} hint="参考情報" />
            <NumberField label="現在の周期数" value={data.cycle} onChange={v => onChange('cycle', v)} hint="1〜6" min={1} />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
