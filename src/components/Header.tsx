import { MACHINE_NAME, VERSION } from '../data/machineData';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-4 px-4 shadow-lg">
      <h1 className="text-lg md:text-xl font-bold text-center">{MACHINE_NAME}</h1>
      <p className="text-center text-purple-200 text-xs mt-1">設定判別ツール v{VERSION}</p>
    </header>
  );
}
