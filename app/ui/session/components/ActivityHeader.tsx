import { UserAnswer } from "@/app/lib/data";

type ActivityHeaderProps = {
  title: string;
  duration: number;
  userProgress: UserAnswer[];
};

export const ActivityHeader = ({ title, duration, userProgress }: ActivityHeaderProps) => {
  const isCompleted = userProgress.length > 0;
  
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center p-4 bg-white rounded-lg shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      
      <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto">
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{duration}min</span>
        </div>

        <div className={`flex items-center gap-2 ${isCompleted ? 'text-green-600' : 'text-blue-600'}`}>
          <div className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`} />
          <span className="font-medium">
            {isCompleted ? 'Completed' : 'In Progress'}
          </span>
        </div>
      </div>
    </div>
  );
}; 