import { useEffect, useState } from "react";

const ModeSacreeToggle = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add("mode-sacree");
    } else {
      root.classList.remove("mode-sacree");
    }
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled((prev) => !prev)}
      className="fixed right-6 bottom-6 z-30 px-5 py-3 rounded-full bg-gradient-to-r from-civil-glow via-white to-civil-aura text-[#231f1a] font-semibold uppercase tracking-[0.2em] shadow-lg hover:shadow-2xl transition-all border border-white/30"
    >
      {enabled ? "Mode Sacré désactivé" : "Mode Pâtes Sacrées"}
    </button>
  );
};

export default ModeSacreeToggle;
