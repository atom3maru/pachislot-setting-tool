import type { GameFlowInfo } from '../types/machine';

interface Props {
  flow: GameFlowInfo;
}

const colorMap: Record<string, { border: string; bg: string; darkBg: string; text: string }> = {
  blue:   { border: 'border-l-blue-500',   bg: 'bg-blue-50',   darkBg: 'dark:bg-blue-900/20',   text: 'text-blue-700 dark:text-blue-300' },
  amber:  { border: 'border-l-amber-500',  bg: 'bg-amber-50',  darkBg: 'dark:bg-amber-900/20',  text: 'text-amber-700 dark:text-amber-300' },
  red:    { border: 'border-l-red-500',     bg: 'bg-red-50',    darkBg: 'dark:bg-red-900/20',    text: 'text-red-700 dark:text-red-300' },
  green:  { border: 'border-l-green-500',   bg: 'bg-green-50',  darkBg: 'dark:bg-green-900/20',  text: 'text-green-700 dark:text-green-300' },
  purple: { border: 'border-l-purple-500',  bg: 'bg-purple-50', darkBg: 'dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-300' },
  gray:   { border: 'border-l-gray-400',    bg: 'bg-gray-50',   darkBg: 'dark:bg-gray-700/30',   text: 'text-gray-700 dark:text-gray-300' },
};

function getColor(c: string) {
  return colorMap[c] ?? colorMap.gray;
}

export default function GameFlowChart({ flow }: Props) {
  const { nodes, edges, notes } = flow;

  // ノードIDからノードを引く
  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  // 各ノードから出るエッジをグループ化
  const edgesFrom = new Map<string, typeof edges>();
  for (const e of edges) {
    const arr = edgesFrom.get(e.from) ?? [];
    arr.push(e);
    edgesFrom.set(e.from, arr);
  }

  // 描画順: nodesの順番に従って縦に並べる
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-slide-up">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <span>🔄</span> ゲームフロー
        </h3>
      </div>

      <div className="p-4 space-y-0">
        {nodes.map((node, i) => {
          const c = getColor(node.color);
          const outEdges = edgesFrom.get(node.id) ?? [];

          return (
            <div key={node.id}>
              {/* ノードカード */}
              <div
                className={`rounded-xl p-3 border-l-[4px] ${c.border} ${c.bg} ${c.darkBg} shadow-sm animate-slide-up`}
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
              >
                <div className={`font-bold text-sm ${c.text}`}>{node.label}</div>
                {node.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    {node.description}
                  </p>
                )}
              </div>

              {/* 矢印 + 遷移条件 */}
              {outEdges.length > 0 && (
                <div className="flex items-center justify-center py-1">
                  {outEdges.length === 1 ? (
                    // 単一遷移
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-gray-400 dark:text-gray-500 text-lg leading-none">↓</span>
                      {outEdges[0].label && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-700/80 px-2 rounded-full">
                          {outEdges[0].label}
                        </span>
                      )}
                    </div>
                  ) : (
                    // 分岐（横並び）
                    <div className="flex items-start gap-3 flex-wrap justify-center">
                      {outEdges.map((edge, ei) => {
                        const targetNode = nodeMap.get(edge.to);
                        const targetColor = targetNode ? getColor(targetNode.color) : getColor('gray');
                        return (
                          <div key={ei} className="flex flex-col items-center gap-0.5">
                            <span className="text-gray-400 dark:text-gray-500 text-lg leading-none">↓</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-700/80 px-2 rounded-full whitespace-nowrap">
                              {edge.label ?? ''}
                            </span>
                            <span className={`text-xs font-semibold ${targetColor.text}`}>
                              → {targetNode?.label ?? edge.to}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 注意書き */}
      {notes && notes.length > 0 && (
        <div className="px-4 pb-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 space-y-1">
            {notes.map((note, i) => (
              <p key={i} className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1.5">
                <span className="flex-shrink-0">💡</span>
                <span>{note}</span>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
