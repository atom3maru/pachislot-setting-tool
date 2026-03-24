import type { InputData } from '../types';
import SectionCard from './SectionCard';
import NumberField from './NumberField';

interface Props {
  data: InputData;
  onChange: (field: keyof InputData, value: number | null) => void;
}

export default function ProbabilityInputs({ data, onChange }: Props) {
  return (
    <SectionCard title="確率系データ" icon="🎰">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <NumberField label="総ゲーム数" value={data.totalG} onChange={v => onChange('totalG', v)} hint="通常時+AT中合算" />
        <NumberField label="ボーナス初当たり回数" value={data.bonusCnt} onChange={v => onChange('bonusCnt', v)} hint="EP+駿城合算" />
        <NumberField label="ST回数" value={data.stCnt} onChange={v => onChange('stCnt', v)} hint="全ST種合算" />
        <NumberField label="下段ベル回数" value={data.bellCnt} onChange={v => onChange('bellCnt', v)} />
        <NumberField label="3周期目ボーナス当選数" value={data.p3Bonus} onChange={v => onChange('p3Bonus', v)} />
        <NumberField label="3周期目到達数" value={data.p3Total} onChange={v => onChange('p3Total', v)} />
      </div>
      {data.p3Bonus != null && data.p3Total != null && data.p3Bonus > data.p3Total && (
        <p className="text-red-500 text-xs mt-2">3周期目当選数は到達数以下にしてください</p>
      )}
    </SectionCard>
  );
}
