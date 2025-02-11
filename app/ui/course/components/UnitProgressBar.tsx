type UnitProgressBarProps = {
    progress: number;
}

export const UnitProgressBar: React.FC<UnitProgressBarProps> = ({ progress }) => {
    return (
        <div className="relative w-full h-2.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
            <div
                className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
            >
                {progress === 100 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500" />
                )}
            </div>
        </div>
    );
}; 