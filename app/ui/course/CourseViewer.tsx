'use client'
import { Course } from "@/app/lib/data";
import { Button, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export const CourseViewer: React.FC<Course> = ({
	id,
  name,
  description,
  units,
}) => (
  <div className="pt-3">
    <div className="mb-6">
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
    <div className="space-y-4">
      {units.map((unit) => (
        <Disclosure key={unit.id}>
          {({ open }) => (
            <div className="border rounded-lg">
              <DisclosureButton className="w-full p-4 flex justify-between items-center">
                <div className="flex items-center">
									<ChevronDown
										className={`w-5 h-5 transform transition-transform ${
											open ? 'rotate-180' : ''
										}`}
									/>
									<div className="pl-2">
										<h3 className="font-medium">Unit {unit.unitId}: {unit.title}</h3>
										<div className="w-full h-2 bg-gray-200 rounded-full mt-2">
											<div
												className="h-2 bg-green-500 rounded-full"
												style={{ width: `${unit.progress}%` }}
											/>
										</div>
									</div>
                </div>
								<div>

								</div>
              </DisclosureButton>
              <DisclosurePanel className="p-4 bg-gray-50">
                {unit.sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex justify-between items-center py-2"
                  >
                    <span>Session {session.sessionId}: {session.title}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">{session.duration}</span>
                      <Button as={Link} href={`/course/${id}/session/${session.id}`} className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
                        {session.status === 'complete' ? 'Review' : 'Start'}
                      </Button>
                    </div>
                  </div>
                ))}
              </DisclosurePanel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  </div>
);