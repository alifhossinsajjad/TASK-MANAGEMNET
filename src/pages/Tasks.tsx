import { AddTaskModal } from "@/components/modules/Task/AddTaskModal";
import TaskCard from "@/components/modules/Task/TaskCard";
import Container from "@/components/ui/container";
// import Container from "@/components/ui/container";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  selectFilteredTasks,
  updateFilter,
} from "@/redux/features/todo/todoSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { type ITodo, type TFilter } from "@/types";

export default function Tasks() {
  const tasks = useAppSelector(selectFilteredTasks);
  const dispatch = useAppDispatch();

  const handleFilterChange = (filter: TFilter) => {
    console.log(filter);
    dispatch(updateFilter(filter));
  };

  return (
    <Container className="mt-20">
      <div className="flex justify-between">
        <h1 className="text-xl">Task</h1>
        <div className="flex gap-5">
          <Tabs
            defaultValue="all"
            className="w-[400px]"
            onValueChange={(e) => handleFilterChange(e as TFilter)}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="high">High</TabsTrigger>
              <TabsTrigger value="medium">Medium</TabsTrigger>
              <TabsTrigger value="low">Low</TabsTrigger>
            </TabsList>
          </Tabs>

          <AddTaskModal />
        </div>
      </div>

      <div className="space-y-5 mt-5">
        {tasks.length === 0 && (
          <div className="text-center mt-10 text-xl">Nothing to see here</div>
        )}
        {tasks
          .filter((task) => task.isCompleted === false)
          .map((task: ITodo) => (
            <TaskCard task={task} />
          ))}
        {tasks.some((task) => task.isCompleted === true) && (
          <div className="flex gap-5 items-center">
            <div className="border-b border-default h-[1px] w-full" />
            <p className="text-default/10">Completed</p>
            <div className="border-b border-default h-[1px] w-full" />
          </div>
        )}
        {tasks
          .filter((task) => task.isCompleted === true)
          .map((task: ITodo) => (
            <TaskCard task={task} />
          ))}
      </div>
    </Container>
  );
}
