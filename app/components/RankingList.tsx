interface RankingListProps {
  entries: {
    username: string;
    score: number;
    avatar: string;
  }[];
}

const RankingList = ({ entries }: RankingListProps) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#080a18]/80 p-8 shadow-2xl backdrop-blur">
      <h3 className="font-display text-3xl uppercase tracking-[0.35em] text-center mb-6">Classement Chevaliers</h3>
      <ul className="space-y-4">
        {entries.map((entry, index) => (
          <li
            key={entry.username}
            className="flex items-center justify-between rounded-2xl bg-white/5 px-5 py-4 border border-white/10"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-civil-glow">#{index + 1}</span>
              <img
                src={entry.avatar}
                alt={entry.username}
                className="h-12 w-12 rounded-xl border border-white/20 object-cover"
              />
              <span className="text-lg font-semibold">{entry.username}</span>
            </div>
            <span className="text-sm uppercase tracking-[0.3em] text-white/70">{entry.score} points d'énergie</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
