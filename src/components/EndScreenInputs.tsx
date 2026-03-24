import type { InputData } from '../types';
import SectionCard from './SectionCard';
import NumberField from './NumberField';

interface Props {
  data: InputData;
  onChange: (field: keyof InputData, value: number | null) => void;
}

export default function EndScreenInputs({ data, onChange }: Props) {
  return (
    <SectionCard title="ST終了画面・特定枚数・トロフィー" icon="🖼️">
      <div className="space-y-4">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">ST終了画面</h3>
          <div className="grid grid-cols-3 gap-3">
            <NumberField label="鉄下駄（通常）" value={data.e_normal} onChange={v => onChange('e_normal', v)} hint="デフォルト" />
            <NumberField label="全員集合" value={data.e_all} onChange={v => onChange('e_all', v)} hint="高設定示唆" />
            <NumberField label="水着画面" value={data.e_mizugi} onChange={v => onChange('e_mizugi', v)} hint="設定6濃厚!" />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">特定枚数到達示唆</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <NumberField label="456 OVER あり" value={data.m456_hit} onChange={v => onChange('m456_hit', v)} hint="設定4以上濃厚" />
            <NumberField label="456 OVER なし" value={data.m456_none} onChange={v => onChange('m456_none', v)} />
            <NumberField label="666 OVER あり" value={data.m666_hit} onChange={v => onChange('m666_hit', v)} hint="設定6濃厚!" />
            <NumberField label="666 OVER なし" value={data.m666_none} onChange={v => onChange('m666_none', v)} />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">サミートロフィー（ST終了時）</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <NumberField label="銅トロフィー" value={data.t_copper} onChange={v => onChange('t_copper', v)} hint="設定2以上" />
            <NumberField label="銀トロフィー" value={data.t_silver} onChange={v => onChange('t_silver', v)} hint="設定3以上" />
            <NumberField label="金トロフィー" value={data.t_gold} onChange={v => onChange('t_gold', v)} hint="設定4以上" />
            <NumberField label="キリン柄" value={data.t_kirin} onChange={v => onChange('t_kirin', v)} hint="設定5以上!" />
            <NumberField label="虹トロフィー" value={data.t_rainbow} onChange={v => onChange('t_rainbow', v)} hint="設定6確定!!" />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
