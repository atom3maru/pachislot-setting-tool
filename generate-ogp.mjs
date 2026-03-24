// OGP画像生成スクリプト
// 実行方法: node generate-ogp.mjs
// 出力先: public/ogp.png

import { createCanvas } from 'canvas';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const WIDTH = 1200;
const HEIGHT = 630;

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

// ─── 背景グラデーション ───
const bg = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
bg.addColorStop(0, '#0f172a');
bg.addColorStop(0.5, '#1e1b4b');
bg.addColorStop(1, '#0f172a');
ctx.fillStyle = bg;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// ─── 上下アクセントライン ───
const lineGrad = ctx.createLinearGradient(0, 0, WIDTH, 0);
lineGrad.addColorStop(0,   'rgba(139,92,246,0)');
lineGrad.addColorStop(0.5, 'rgba(139,92,246,0.9)');
lineGrad.addColorStop(1,   'rgba(139,92,246,0)');
ctx.fillStyle = lineGrad;
ctx.fillRect(0, 0, WIDTH, 4);
ctx.fillRect(0, HEIGHT - 4, WIDTH, 4);

// ─── 星/粒 ───
const stars = [
  {x:120,y:70},{x:280,y:45},{x:450,y:90},{x:620,y:55},
  {x:780,y:80},{x:950,y:50},{x:1100,y:75},
  {x:160,y:560},{x:380,y:580},{x:550,y:550},{x:750,y:570},{x:1020,y:555}
];
stars.forEach(s => {
  ctx.beginPath();
  ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(167,139,250,0.5)';
  ctx.fill();
});

// ─── ユーティリティ: 角丸矩形 ───
function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y); ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r); ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h); ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r); ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
}

// ─── スロットアイコン ───
ctx.font = '80px serif';
ctx.fillStyle = '#ffffff';
ctx.fillText('🎰', 58, 188);

// ─── メインタイトル ───
ctx.textAlign = 'left';
ctx.fillStyle = '#f1f5f9';
ctx.font = 'bold 64px sans-serif';
ctx.fillText('パチスロ', 168, 136);
ctx.fillText('設定判別ツール', 168, 216);

// ─── サブタイトル（グラデーション） ───
const subGrad = ctx.createLinearGradient(168, 0, 1000, 0);
subGrad.addColorStop(0, '#a78bfa');
subGrad.addColorStop(1, '#60a5fa');
ctx.fillStyle = subGrad;
ctx.font = 'bold 28px sans-serif';
ctx.fillText('スマスロ・Lスロ対応 ｜ ベイズ推定で高精度判別', 168, 272);

// ─── 区切り線 ───
ctx.strokeStyle = 'rgba(139,92,246,0.4)';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(55, 308); ctx.lineTo(1145, 308);
ctx.stroke();

// ─── 機種タグ ───
const tags = [
  { label: 'カバネリ',      color: '#5b21b6' },
  { label: '炎炎ノ消防隊2', color: '#991b1b' },
  { label: 'うみねこ2',     color: '#075985' },
  { label: '攻殻機動隊',    color: '#065f46' },
  { label: '北斗転生2',     color: '#1e40af' },
  { label: '東京喰種',      color: '#3b0764' },
  { label: 'ハナハナV',     color: '#831843' },
];

ctx.font = 'bold 20px sans-serif';
let tx = 55, ty = 335;
tags.forEach((tag, i) => {
  if (i === 4) { tx = 55; ty = 395; }
  const tw = ctx.measureText(tag.label).width + 28;

  ctx.fillStyle = tag.color;
  ctx.globalAlpha = 0.88;
  roundRect(tx, ty, tw, 42, 8); ctx.fill();
  ctx.globalAlpha = 1;

  ctx.strokeStyle = 'rgba(255,255,255,0.22)';
  ctx.lineWidth = 1;
  roundRect(tx, ty, tw, 42, 8); ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.fillText(tag.label, tx + 14, ty + 28);
  tx += tw + 10;
});

// ─── 特徴リスト ───
ctx.font = '22px sans-serif';
ctx.fillStyle = 'rgba(203,213,225,0.9)';
ctx.fillText('✦  ボーナス確率・演出・小役を総合判定', 55, 466);
ctx.fillText('✦  確定演出入力で設定を自動絞り込み', 55, 500);
ctx.fillText('✦  スマホ対応 ・ ダークモード ・ 結果共有', 55, 534);
ctx.fillText('✦  完全無料 ・ 登録不要', 55, 568);

// ─── 右パネル ───
const panelGrad = ctx.createLinearGradient(840, 310, 1160, 610);
panelGrad.addColorStop(0, 'rgba(139,92,246,0.20)');
panelGrad.addColorStop(1, 'rgba(96,165,250,0.12)');
ctx.fillStyle = panelGrad;
roundRect(840, 312, 312, 288, 16); ctx.fill();
ctx.strokeStyle = 'rgba(139,92,246,0.45)';
ctx.lineWidth = 1.5;
roundRect(840, 312, 312, 288, 16); ctx.stroke();

ctx.textAlign = 'center';
ctx.font = 'bold 18px sans-serif';
ctx.fillStyle = '#a78bfa';
ctx.fillText('無料でご利用いただけます', 996, 350);

ctx.font = '15px monospace';
ctx.fillStyle = 'rgba(203,213,225,0.6)';
ctx.fillText('pachislot-setting-tool.vercel.app', 996, 380);

// ─── バーグラフ ───
const bars = [
  { label: '設定1', val: 0.04, color: '#60a5fa' },
  { label: '設定2', val: 0.07, color: '#3b82f6' },
  { label: '設定3', val: 0.11, color: '#2563eb' },
  { label: '設定4', val: 0.19, color: '#f59e0b' },
  { label: '設定5', val: 0.24, color: '#f97316' },
  { label: '設定6', val: 0.35, color: '#ef4444' },
];

bars.forEach((b, i) => {
  const by = 404 + i * 28;
  const bw = b.val * 220;

  ctx.textAlign = 'right';
  ctx.font = '13px sans-serif';
  ctx.fillStyle = 'rgba(203,213,225,0.65)';
  ctx.fillText(b.label, 898, by + 16);

  ctx.fillStyle = b.color;
  ctx.globalAlpha = 0.85;
  roundRect(903, by, bw, 20, 3); ctx.fill();
  ctx.globalAlpha = 1;

  ctx.textAlign = 'left';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(Math.round(b.val * 100) + '%', 903 + bw + 4, by + 14);
});

// ─── PNG出力 ───
const outputDir = resolve('./public');
if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });
const outputPath = resolve('./public/ogp.png');
const buffer = canvas.toBuffer('image/png');
writeFileSync(outputPath, buffer);
console.log(`✅ OGP画像を生成しました: ${outputPath}`);
console.log(`   サイズ: ${WIDTH}x${HEIGHT}px (${(buffer.length / 1024).toFixed(0)}KB)`);
