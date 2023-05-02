import React from 'react'
import { useState, useContext } from 'react'
import { MyContext } from './Context'

function MainView() {

    const {user} = useContext(MyContext);
    const {tasks} = useContext(MyContext);

  return (
    <div>
        <h1>Main view</h1>
        {tasks.map((item) => (
            <div>{item.task_name}</div>
        ))}
    </div>
  )
}

export default MainView