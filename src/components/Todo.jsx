import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

export default function Todo(props) {
    const { todo } = props;
    return (
        <div>
            <div className="todo">
                <div className={"task " + (todo.complete ? "complete" : "")} key={todo._id}>
                    <div className="checkbox" onClick={props.completeTodo}></div>
                    <div className="text">{props.text}</div>
                </div>
                <div className="icons">
                    <BiEdit className="icon" onClick={props.updateHandle} />
                    <AiFillDelete className="icon" onClick={props.deleteTodo} />
                </div>
            </div>
        </div >
    )
}
