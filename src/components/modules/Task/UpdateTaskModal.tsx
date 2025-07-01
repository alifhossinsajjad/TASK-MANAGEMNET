import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Pencil } from "lucide-react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import TMInput from "../../form/TMInput";
import TMForm from "../../form/TMForm";
import TMTextarea from "../../form/TMTextArea";
import TMSelect from "../../form/TMSelect";
import TMDatePicker from "../../form/TMDatePicker";
import { useAppDispatch } from "@/redux/hooks";
import { updateTask } from "@/redux/features/todo/todoSlice";
import { type ITodo } from "@/types";
import { v4 as uuid } from "uuid";

const priorityOptions = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export function UpdateTaskModal({ task }: { task: ITodo }) {
  const dispatch = useAppDispatch();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const taskData: ITodo = {
      _id: uuid(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate,
      isCompleted: false,
      member: ""
    };

    dispatch(updateTask(taskData));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 text-default-500">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <TMForm className="space-y-3" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>

          <TMInput name="title" label="Title" defaultValue={task.title} />
          <TMTextarea
            name="description"
            label="Title"
            defaultValue={task.description}
          />
          <TMSelect
            name="priority"
            label="Priority"
            options={priorityOptions}
            defaultValue={task.priority}
          />
          <TMDatePicker
            name="dueDate"
            label="Due Date"
            defaultValue={task.dueDate}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </TMForm>
      </DialogContent>
    </Dialog>
  );
}
