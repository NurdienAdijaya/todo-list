import { motion } from "framer-motion";
import React, { useRef } from "react";
import { FaRegEdit, FaRegWindowClose } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo } = props;
  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const update = (id, value, e) => {
    if (e.which === 13) {
      //13 is key code for enter key
      updateTodo({ id, item: value });
      inputRef.current.disabled = true;
    }
  };
  return (
    <motion.li
      initial={{ x: "100vw", transition: { tipe: "spring", duration: 1 } }}
      animate={{ x: 0, transition: { tipe: "spring", duration: 1 } }}
      whileHover={{
        scale: 1.05,
        transition: { tipe: "spring", duration: 0.1 },
      }}
      exit={{
        scale: [1, 0],
        transition: { duration: 0.5 },
      }}
      key={item.id}
      className="card"
    >
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item}
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
      />
      <div className="btns">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => changeFocus()}
        >
          <FaRegEdit />
        </motion.button>
        {item.completed === false && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "green" }}
            onClick={() => completeTodo(item.id)}
          >
            <IoCheckmarkDoneSharp />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={() => removeTodo(item.id)}
        >
          <FaRegWindowClose />
        </motion.button>
      </div>
      {item.completed && <span className="completed">Done</span>}
    </motion.li>
  );
};

export default TodoItem;
