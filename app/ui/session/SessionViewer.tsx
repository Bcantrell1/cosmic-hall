'use client'
import { Session } from "@/app/lib/data";
import Image from "next/image";
import { useState } from "react";
import MultipleChoiceQuestion from "../activity/MultipleChoice";
import Sidebar from "./SessionSidebar";

export const SessionViewer: React.FC<Session> = ({
	title,
	activities
})=> {
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	return (
		<div className="flex">
			<Sidebar 
				activities={activities}
				selectedIndex={selectedIndex}
				onChange={setSelectedIndex}
			/>
			<section className="flex flex-col w-full">
				<div className="flex p-4 justify-between">
					<div className="flex gap-2">
						<div>{activities[selectedIndex].activityId}</div>
						<div>{title}</div>
					</div>
					<div className="flex gap-2">
						<div>{selectedIndex+1}</div>
						of
						<div>{activities.length}</div>
					</div>
				</div>
				{activities[selectedIndex] && (
          <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">{activities[selectedIndex].title}</h1>
              <div className="space-x-4">
                <span className="text-gray-600"><span className="hidden md:inline-block">Duration:</span> {activities[selectedIndex].duration}</span>
                <span className="text-gray-600"><span className="hidden md:inline-block">Status:</span> {activities[selectedIndex].status}</span>
              </div>
            </div>
						{activities[selectedIndex]?.description}
            {activities[selectedIndex].imgUrl && (
								<Image 
									src={activities[selectedIndex].imgUrl} 
									alt={activities[selectedIndex].title}
									width={350}
									height={200}
									className="mt-4 rounded-lg"
								/>
            )}
						{
							activities[selectedIndex]?.questions && (
								<>
									<h3 className="py-3 text-xl">Question:</h3>
									{
										activities[selectedIndex].questions.map((question) => {
											return <MultipleChoiceQuestion key={question.id} questionNumber={question.questionId} questionText={question.question} options={question.options} correctAnswer={question.correct} />
										})
									}
								</>
							)
						}
          </div>
        )}
			</section>
		</div>
	)
}