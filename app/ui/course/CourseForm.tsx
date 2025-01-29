"use client"

import { addCourse } from "@/app/actions/addCourseAction";
import { useRef } from "react";
import { Button, Input, Textarea, Label, Field } from "@headlessui/react";
import { useFormStatus } from "react-dom";

export default function CourseForm() {
    const { pending } = useFormStatus();
    const formRef = useRef<HTMLFormElement>(null);
    const onSubmitHandler = async (formData: FormData) => {
        const res = await addCourse(formData);
        if(res.error) {
            console.log(res.error);
        } else {
            formRef.current?.reset();
            console.log(res.success);
        }
    };

    return (
        <form ref={formRef} action={onSubmitHandler} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <Field className="space-y-2">
                <Label
                    htmlFor="title" 
                    className="block text-sm font-medium text-gray-700"
                >
                    Title
                </Label>
                <Input
                    type="text" 
                    name="title" 
                    id="title"
                    className="block p-2 w-full min-h-5 sm:min-h-10 text-sm outline-indigo-500 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    required 
                />
            </Field>
            
            <Field className="space-y-2">
                <Label
                    htmlFor="description" 
                    className="block text-sm font-medium text-gray-700"
                >

                    Description
                </Label>
                <Textarea
                    name="description" 
                    id="description"
                    rows={4}
                    className="block w-full p-2 outline-indigo-500 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                />
            </Field>


            <div className="pt-4">
                <Button
                    type="submit"

                    disabled={pending}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                    {pending ? "Adding..." : "Add Course"}
                </Button>
            </div>
        </form>
    )
}
