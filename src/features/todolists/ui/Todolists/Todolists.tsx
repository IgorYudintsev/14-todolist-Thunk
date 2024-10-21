import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Unstable_Grid2"
import React, {useEffect} from "react"
import {useAppDispatch, useAppSelector} from "common/hooks"
import { selectTodolists } from "../../model/todolistsSelectors"
import { Todolist } from "./Todolist/Todolist"
import {todolistsApi} from "../../api/todolistsApi";
import {tasksApi} from "../../api/tasksApi";
import {setTodolistsThunk} from "../../model/todolists-reducer";

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch=useAppDispatch()

  useEffect(() => {
    dispatch(setTodolistsThunk())


    // todolistsApi.getTodolists().then((res) => {
    //   const todolists = res.data
    //   console.log(todolists)
      // setTodolists(todolists)

      // todolists.forEach((tl) => {
        // tasksApi.getTasks(tl.id).then((res) => {
        //   setTasks((prevState) => {
        //     return { ...prevState, [tl.id]: res.data.items }
        //   })
        // })
      // })

    // })
  }, []);

  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
