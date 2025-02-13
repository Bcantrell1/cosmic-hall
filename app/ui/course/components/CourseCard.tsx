'use client';
import { addUserCourseProgress } from '@/app/actions/addProgressAction';
import { Course, UserCourse } from '@/app/lib/data';
import { getNasaImage } from '@/app/lib/nasa';
import { Button } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type CourseCardProps = Course & {
    progress?: UserCourse;
    userId: string;
};

export const CourseCard: React.FC<CourseCardProps> = ({
    id,
    title,
    description,
    progress,
    userId,
}) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState('https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001292/GSFC_20171208_Archive_e001292~orig.jpg');

    useEffect(() => {
        const fetchNasaImage = async () => {
            const url = await getNasaImage(title);
            setImageUrl(url);
        };
        fetchNasaImage();
    }, [title]);

    const buttonText = (progress: number) => {
        if (progress == 100) return 'Completed';
        if (progress == 0) return 'Start Course';
        return 'Continue';
    };

    const handleCourseStart = async () => {
        if (progress?.progress == 0 || progress?.progress == null) {
            await addUserCourseProgress(userId, id, 1);
        }
    };

    return (
        <div className="w-[350px] p-[5px] rounded-xl bg-gradient-to-l from-indigo-300 to-indigo-700 relative z-0 after:absolute after:content-[''] after:top-[25px] after:left-0 after:right-0 after:-z-10 after:h-full after:w-full after:scale-[0.8] after:blur-[45px] after:bg-gradient-to-l after:from-indigo-300 after:to-indigo-700 after:transition-opacity after:duration-500 hover:after:opacity-0">
            <div className="bg-white w-full h-full rounded-[0.5rem] transition-colors duration-1000">
                <div className="relative w-full h-[200px]">
                    {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        </div>
                    )}
                    <Image
                        src={imageUrl}
                        className={`rounded-t-md rounded-b-none object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                        fill
                        sizes="350px"
                        alt={title}
                        onLoad={() => setImageLoading(false)}
                    />
                </div>
                <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-xl font-bold text-indigo-500">{title}</h3>
                </div>

                <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-800">{description}</p>
                </div>

                <div className="space-y-2 mb-6">
                    <div className="w-full h-2 bg-indigo-200 rounded-full mt-2">
                        <div
                            className={`h-2 ${progress?.progress == 100 ? 'bg-emerald-600' : 'bg-indigo-500'} rounded-full`}
                            style={{ width: `${progress ? (progress?.progress / 100) * 100 : 0}%` }}
                        />
                    </div>
                </div>

                <div className="mt-auto flex gap-4">
                    <Button
                        as={Link}
                        href={`/course/${id}`}
                        className={`
                            relative flex-1 text-center
                            px-10 py-3
                            text-[15px] tracking-wider leading-relaxed font-semibold
                            ${progress?.progress == 100
                                ? 'text-emerald-600 hover:text-emerald-600'
                                : 'text-indigo-700 hover:text-indigo-300'
                            }
                            border-2 border-indigo-400 
                            rounded-lg 
                            overflow-hidden
                            bg-gradient-to-r from-indigo-400/10 via-transparent to-indigo-400/10
                            shadow-[inset_0_0_10px_rgba(99,102,241,0.4),0_0_9px_3px_rgba(99,102,241,0.1)]
                            hover:shadow-[inset_0_0_10px_rgba(99,102,241,0.6),0_0_9px_3px_rgba(99,102,241,0.2)]
                            transition-all duration-300
                            before:content-['']
                            before:absolute before:left-[-4em] before:top-0
                            before:w-[4em] before:h-full
                            before:bg-gradient-to-r before:from-transparent before:via-indigo-400/10 before:to-transparent
                            before:transition-transform before:duration-400 before:ease-in-out
                            hover:before:translate-x-[15em]
                        `}
                        onClick={handleCourseStart}
                    >
                        {buttonText(progress?.progress || 0)}
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
