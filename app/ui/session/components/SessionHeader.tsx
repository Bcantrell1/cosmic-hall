type SessionHeaderProps = {
  title: string;
  currentIndex: number;
  totalActivities: number;
};

export const SessionHeader = ({ title, currentIndex, totalActivities }: SessionHeaderProps) => (
  <div className="flex flex-col sm:flex-row p-4 justify-between items-center bg-indigo-800 text-white rounded-t-lg shadow-md">
    <div className="flex flex-col sm:flex-row sm:gap-3 items-center mb-2 sm:mb-0">
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
    <div className="flex items-center gap-2 text-sm bg-indigo-700 px-3 py-1 rounded-full">
      <span className="font-semibold">{currentIndex + 1}</span>
      <span className="text-indigo-200">of</span>
      <span className="font-semibold">{totalActivities}</span>
    </div>
  </div>
); 