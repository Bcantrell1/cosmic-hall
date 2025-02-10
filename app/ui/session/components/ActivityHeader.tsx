import { UserAnswer } from "@/app/lib/data";

type ActivityHeaderProps = {
  title: string;
  duration: number;
  userProgress: UserAnswer[];
};

export const ActivityHeader = ({ title, duration, userProgress }: ActivityHeaderProps) => (
  <div className="flex justify-between items-center">
    <h1 className="text-xl font-semibold">{title}</h1>
    <div className="space-x-4">
      <span className="text-gray-600">
        <span className="hidden md:inline-block">Duration:</span> {duration}min
      </span>
      <span className="text-gray-600">
        <span className="hidden md:inline-block">Status:</span> {userProgress.length > 0 ? "Completed" : "In Progress"}
      </span>
    </div>
  </div>
); 