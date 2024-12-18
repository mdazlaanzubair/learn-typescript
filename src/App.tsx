import { useEffect, useState } from "react";
import InputForm from "./components/InputForm";
import TaskItem from "./components/TaskItem";
import { TaskInterface } from "./models";
import { extractTitle } from "./utils/formatter";

function App(): JSX.Element {
  const [tasksList, setTasksList] = useState<TaskInterface[]>([]);
  const [task, setTask] = useState<string>("");

  const saveTask = (e: any): void => {
    e.preventDefault();
    const newTask: TaskInterface = {
      id: `${Date.now()}`,
      title: extractTitle(task),
      desc: task,
      isCompleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const updatedTasksArray: TaskInterface[] = [newTask, ...tasksList];

    setTasksList([...updatedTasksArray]);
    localStorage.setItem("tasks", JSON.stringify([...updatedTasksArray]));
    setTask("");
  };

  const updateTaskItem = (updatedTask: TaskInterface | null): void => {
    if (updatedTask) {
      const filteredTasks: TaskInterface[] = tasksList.filter(
        (item) => item.id != updatedTask.id
      );

      const updatedTasksArray: TaskInterface[] = [
        {
          ...updatedTask,
          title: updatedTask.title ?? extractTitle(updatedTask.desc),
          isCompleted: false,
          updated_at: new Date(),
        },
        ...filteredTasks,
      ];

      setTasksList([...updatedTasksArray]);
      localStorage.setItem("tasks", JSON.stringify([...updatedTasksArray]));
    }
  };

  const deleteTaskItem = (taskId: string): void => {
    const filteredTasks: TaskInterface[] = tasksList.filter(
      (item) => item.id != taskId
    );
    setTasksList([...filteredTasks]);
    localStorage.setItem("tasks", JSON.stringify([...filteredTasks]));
  };

  const changeTaskStatus = (taskId: string, status: boolean): void => {
    const updatedTasksArray: TaskInterface[] = tasksList.map((item) => {
      if (item.id == taskId) {
        item.isCompleted = status;
        item.updated_at = new Date();
      }
      return item;
    });
    setTasksList([...updatedTasksArray]);
    localStorage.setItem("tasks", JSON.stringify([...updatedTasksArray]));
  };

  useEffect(() => {
    const tasksStored: string | null = localStorage.getItem("tasks");

    if (tasksStored) {
      const tasks = JSON.parse(tasksStored);
      setTasksList([...tasks]);
    }
  }, []);

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 p-5 lg:py-20 lg:px-10">
      <div className="col-span-1 lg:col-span-2">
        <h1 className="text-2xl lg:text-4xl font-bold text-center mb-10">
          Taskware
        </h1>
        <InputForm task={task} setTask={setTask} saveTask={saveTask} />
      </div>
      <div
        className={`col-span-1 
      ${
        tasksList?.length > 1 &&
        "border-b pb-10 lg:pb-0 lg:border-r pr-0 lg:pr-10 lg:border-b-0"
      }
      `}
      >
        <h1 className="text-lg font-bold text-center mb-5">Incomplete Tasks</h1>

        <ul className="list-none flex flex-col items-center justify-start gap-10">
          {tasksList.map(
            (taskItem, index) =>
              !taskItem.isCompleted && (
                <TaskItem
                  key={index}
                  taskItem={taskItem}
                  changeTaskStatus={changeTaskStatus}
                  updateTaskItem={updateTaskItem}
                  deleteTaskItem={deleteTaskItem}
                />
              )
          )}
        </ul>
      </div>
      <div className="col-span-1">
        <h1 className="text-lg font-bold text-center mb-5">Completed Tasks</h1>
        <ul className="list-none flex flex-col items-center justify-start gap-10">
          {tasksList.map(
            (taskItem, index) =>
              taskItem.isCompleted && (
                <TaskItem
                  key={index}
                  taskItem={taskItem}
                  changeTaskStatus={changeTaskStatus}
                  deleteTaskItem={deleteTaskItem}
                />
              )
          )}
        </ul>
      </div>
    </main>
  );
}

export default App;
