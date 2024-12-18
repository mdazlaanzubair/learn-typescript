import React, { useState } from "react";
import {
  MdEdit,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { HiTrash } from "react-icons/hi2";
import { BiSolidSave } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { TaskInterface } from "../models";
import moment from "moment";
import { countWords, truncateStringByWords } from "../utils/formatter";

interface PropType {
  taskItem: TaskInterface;
  changeTaskStatus: (taskId: string, status: boolean) => void;
  updateTaskItem?: (updatedTask: TaskInterface | null) => void;
  deleteTaskItem: (taskId: string) => void;
}

const TaskItem: React.FC<PropType> = ({
  taskItem,
  changeTaskStatus,
  updateTaskItem,
  deleteTaskItem,
}) => {
  const [editItem, setEditItem] = useState<TaskInterface | null>(null);
  const [showLess, setShowLess] = useState<number>(40);
  const toggleTruncate = (): void => setShowLess(showLess <= 0 ? 40 : 0);

  return (
    <li
      className="relative w-full flex items-center justify-between border p-5 rounded-lg gap-3 cursor-pointer"
      onDoubleClick={() => {
        if (taskItem?.isCompleted) {
          changeTaskStatus(taskItem.id, false);
        } else {
          changeTaskStatus(taskItem.id, true);
        }
      }}
    >
      {/* task header */}
      <div className="group flex-shrink relative px-3 cursor-pointer">
        {taskItem?.isCompleted ? (
          <a
            role="button"
            href="#"
            className="text-decoration-none"
            onClick={() => changeTaskStatus(taskItem.id, false)}
          >
            <MdOutlineCheckBoxOutlineBlank
              title="Mark as incomplete"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            text-xl opacity-0 group-hover:opacity-50 cursor-pointer
            transition-all ease-in-out duration-300"
            />

            <MdOutlineCheckBox
              title="Mark as incomplete"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            text-xl opacity-100 group-hover:opacity-0 cursor-pointer
            transition-all ease-in-out duration-300"
            />
          </a>
        ) : (
          <a
            role="button"
            href="#"
            className="text-decoration-none"
            onClick={() => changeTaskStatus(taskItem.id, true)}
          >
            <MdOutlineCheckBoxOutlineBlank
              title="Mark as completed"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              text-xl opacity-100 group-hover:opacity-0 cursor-pointer
              transition-all ease-in-out duration-300"
            />

            <MdOutlineCheckBox
              title="Mark as completed"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              text-xl opacity-0 group-hover:opacity-50 cursor-pointer
              transition-all ease-in-out duration-300"
            />
          </a>
        )}
      </div>
      <form className="flex-grow flex flex-col items-center justify-start gap-1">
        <div className="w-full flex flex-wrap items-center justify-between gap-3">
          <input
            className={`
            p-1 rounded flex-grow border text-base font-bold cursor-text
            ${
              editItem ? "" : "text-slate-900 bg-transparent border-transparent"
            }
            transition-all ease-in-out duration-300
            `}
            type="text"
            name="title"
            value={editItem ? editItem.title : taskItem.title}
            readOnly={!editItem}
            disabled={!editItem}
            maxLength={50}
            onChange={(e) => {
              if (editItem) {
                setEditItem({
                  ...editItem,
                  title: e.target.value,
                });
              }
            }}
          />

          <div className="flex-shrink flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              title="Edit task item"
              className={`p-2 w-30 h-30 border bg-green-400 text-white rounded border-green-400 
                hover:bg-green-500 hover:border-green-500 hover:text-slate-50
                ${editItem ? "opacity-100" : "opacity-0"}
                transition-all ease-in-out duration-300`}
              onClick={() => {
                updateTaskItem && updateTaskItem(editItem);
                editItem && setEditItem(null);
              }}
            >
              <BiSolidSave className="text-xs" />
            </button>
            {!taskItem.isCompleted && (
              <button
                type="button"
                title="Edit task item"
                className="p-2 w-30 h-30 border text-blue-400 border-blue-400 rounded 
              hover:border-blue-400 hover:bg-blue-400 hover:text-white
            transition-all ease-in-out duration-300"
                onClick={() => setEditItem(editItem ? null : taskItem)}
              >
                {editItem ? (
                  <RxCross2 className="text-xs" />
                ) : (
                  <MdEdit className="text-xs" />
                )}
              </button>
            )}
            <button
              type="button"
              title="Remove task item"
              className="p-2 w-30 h-30 border text-white bg-red-500 border-red-500 rounded 
              hover:text-slate-50 hover:bg-red-600 hover:border-red-600
            transition-all ease-in-out duration-300"
              onClick={() => deleteTaskItem(taskItem.id)}
            >
              <HiTrash className="text-xs" />
            </button>
          </div>
        </div>
        {!editItem ? (
          <div className="flex-grow w-full flex flex-wrap gap-1 p-1">
            <p
              className="flex-grow w-full text-sm text-slate-900 cursor-text"
              onClick={toggleTruncate}
            >
              {truncateStringByWords(taskItem.desc, showLess)}
            </p>
            {countWords(taskItem.desc) > 40 && (
              <>
                {showLess > 0 ? (
                  <a
                    role="button"
                    href="#"
                    className="text-xs text-blue-600 hover:text-blue-700 transition-all ease-in-out duration-300"
                    onClick={() => setShowLess(0)}
                  >
                    show more
                  </a>
                ) : (
                  <a
                    role="button"
                    href="#"
                    className="text-xs text-blue-600 hover:text-blue-700 transition-all ease-in-out duration-300"
                    onClick={() => setShowLess(40)}
                  >
                    show less
                  </a>
                )}
              </>
            )}
          </div>
        ) : (
          <textarea
            className={`flex-grow w-full text-sm p-1 rounded resize-none cursor-text
                        min-h-fit max-h-[500px] border text-slate-900 bg-transparent
                    `}
            value={editItem ? editItem.desc : taskItem.desc}
            rows={10}
            readOnly={!editItem}
            disabled={!editItem}
            onChange={(e) => {
              if (editItem) {
                setEditItem({
                  ...editItem,
                  desc: e.target.value,
                });
              }
            }}
          ></textarea>
        )}
      </form>
      <span className="-bottom-5 left-1 absolute text-xs">
        Added on{" "}
        <strong>
          {moment(taskItem.created_at).format("DD MMM YYYY | h:mm A")}
        </strong>
      </span>
      <span className="-bottom-5 right-1 absolute text-xs text-slate-400 italic">
        Updated {moment(taskItem.updated_at).fromNow()}
      </span>
    </li>
  );
};

export default TaskItem;
