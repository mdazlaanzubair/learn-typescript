import React, { useRef } from "react";
import { GiSaveArrow } from "react-icons/gi";

interface PropType {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  saveTask: (e?: any) => void;
}

const InputForm: React.FC<PropType> = ({ task, setTask, saveTask }) => {
  // Adjust textarea height based on content
  const adjustHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault(); // Prevent new line
    const textarea = e.target;

    // Reset the height to calculate the correct scrollHeight
    textarea.style.height = "auto";

    // Set the height based on scrollHeight, with a max height of 100px
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    e.preventDefault(); // Prevent new line
    adjustHeight(e);
    setTask(e.target.value);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter") {
      if (e.shiftKey || e.ctrlKey) {
        // Allow Shift + Enter or Ctrl + Enter to insert a newline
        return;
      } else {
        if (task.trim().length >= 10) {
          saveTask(e); // Save the task
        }
      }
    }
  };

  return (
    <form onSubmit={saveTask} className="w-full overflow-hidden flex items-center justify-between gap-3 border p-3 rounded-lg bg-white">
      <textarea
        className="resize-none max-h-[100px] flex-grow rounded-lg border-none outline-none p-1"
        name="task-desc"
        id="item"
        rows={1}
        onChange={onChangeHandler} // Use onInput to capture changes reliably
        placeholder="Type your task..."
        value={task}
        minLength={10}
        onKeyDown={onKeyDownHandler}
      ></textarea>

      <button
        type="submit"
        title="Save task item"
        className={`relative p-3 border w-[40px] h-[40px] rounded-full 
        ${
          task.length > 10
            ? "text-blue-600 border-blue-600 hover:scale-90 hover:bg-blue-600 hover:text-white"
            : "text-slate-300 border-slate-300"
        }
        transition-all ease-in-out duration-300`}
        disabled={task.length < 10}
      >
        <GiSaveArrow className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base" />
      </button>
    </form>
  );
};

export default InputForm;
