import { useState, useEffect } from 'react';
import { io } from 'socket.io-client'; 
import * as config from 'config-todolist'; 

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import GitHubIcon from '@mui/icons-material/GitHub';
import DeleteIcon from '@mui/icons-material/Delete';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const socket = io(config.webSocketsAddress)

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

function App() {
  const [theme, setTheme] = useState(darkTheme)
  const changeTheme = () => setTheme((theme == darkTheme) ? lightTheme : darkTheme)

  const [plannedTasks, setPlannedTasks] = useState([])
  const [makingTasks, setMakingTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])

  const [notes, setNotes] = useState('')
  const [notesSavings, setNotesSavings] = useState(0)

  useEffect(() => {
    socket.on('getTasks', (data) => {
      setPlannedTasks(data.planned)
      setMakingTasks(data.making)
      setCompletedTasks(data.completed)
      setNotes(data.notes)
    });
  }, [])

  const addTask = (event, type) => {
    if(event.target.value == '' || event.key != 'Enter') return;
    if(type == 'planned') setPlannedTasks([...plannedTasks, event.target.value])
    if(type == 'making') setMakingTasks([...makingTasks, event.target.value])
    if(type == 'completed') setCompletedTasks([...completedTasks, event.target.value])
    socket.emit('addTask', type, event.target.value)
    event.target.value = ''
  }

  const deleteTask = (type, index) => {
    if(type == 'planned') setPlannedTasks(plannedTasks.filter((_, i) => i != index))
    if(type == 'making') setMakingTasks(makingTasks.filter((_, i) => i != index))
    if(type == 'completed') setCompletedTasks(completedTasks.filter((_, i) => i != index))
    socket.emit('deleteTask', type, index)
  }

  const saveNote = (event) => {
    setNotesSavings(notesSavings + 1)
    setNotes(event.target.value)
    if(notesSavings >= 5) {
      socket.emit('saveNote', event.target.value)
      setNotesSavings(0)
    }
  }

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div style={{ fontFamily: 'roboto' }} className="App">

      <Stack alignItems="center" gap="10px" sx={{ marginTop: '70px' }}>
          <Avatar sx={{ height: '60px', width: '60px' }} src="https://avatars.githubusercontent.com/u/138053343?v=4" />
          <Typography sx={{ fontSize: 20, height: '20px' }} >Todo-List App</Typography>
          <Typography color="text.secondary" sx={{ fontSize: 15 }} >by apexory</Typography>
      </Stack>

      <Stack direction="row" gap="10px" justifyContent="center" sx={{ marginTop: '30px' }}>
        <Card variant="outlined" sx={{ minWidth: 265 }}>
          <CardContent>
            <Stack gap="10px">
              <Typography variant="h5" sx={{ textAlign: 'center' }}>Planned</Typography>
              <TextField onKeyDown={(event) => addTask(event, 'planned')} variant="outlined" size="small" label="Add task ..." />
              <Stack style={{ overflow: 'auto', height: '200px' }} gap="8px" mt="10px">
                {plannedTasks.map((task, i) => (
                  <ListItem key={i} sx={{ borderWidth: '1px', borderColor: `text.disabled`, borderStyle: 'solid', borderRadius: '5px' }} secondaryAction={<IconButton onClick={() => deleteTask('planned', i)} edge="end"><DeleteIcon /></IconButton>} disablePadding><ListItemButton><ListItemText primary={ task } /></ListItemButton></ListItem>
                ))}
              </Stack>
            </Stack>
          </CardContent>
        </Card>


        <Card variant="outlined" sx={{ minWidth: 265 }}>
          <CardContent>
            <Stack gap="10px">
              <Typography variant="h5" sx={{ textAlign: 'center' }}>Making</Typography>
              <TextField onKeyDown={(event) => addTask(event, 'making')} variant="outlined" size="small" label="Add task ..." />
              <Stack style={{ overflow: 'auto', height: '200px' }} gap="8px" mt="10px">
                {makingTasks.map((task, i) => (
                  <ListItem key={i} sx={{ borderWidth: '1px', borderColor: `text.disabled`, borderStyle: 'solid', borderRadius: '5px' }} secondaryAction={<IconButton onClick={() => deleteTask('making', i)} edge="end"><DeleteIcon /></IconButton>} disablePadding><ListItemButton><ListItemText primary={ task } /></ListItemButton></ListItem>
                ))}
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ minWidth: 265 }}>
          <CardContent>
            <Stack gap="10px">
              <Typography variant="h5" sx={{ textAlign: 'center' }}>Completed</Typography>
              <TextField onKeyDown={(event) => addTask(event, 'completed')} variant="outlined" size="small" label="Add task ..." />
              <Stack style={{ overflow: 'auto', height: '200px' }} gap="8px" mt="10px">
                {completedTasks.map((task, i) => (
                  <ListItem key={i} sx={{ borderWidth: '1px', borderColor: `text.disabled`, borderStyle: 'solid', borderRadius: '5px' }} secondaryAction={<IconButton onClick={() => deleteTask('completed', i)} edge="end"><DeleteIcon /></IconButton>} disablePadding><ListItemButton><ListItemText primary={ task } /></ListItemButton></ListItem>
                ))}
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ minWidth: 230, height: '345px' }}>
          <CardContent>
            <Stack gap="10px">
              <Typography variant="h5" sx={{ textAlign: 'center' }}>Notes</Typography>
              <Stack style={{ overflow: 'auto', height: '260px' }} gap="8px">
                <TextField onChange={ saveNote } label="e.x., the plans for today" multiline minRows={10} variant="filled" value={ notes } />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'absolute', bottom: '15px', left: '15px' }}>
          <Button href="https://github.com/apexory" size="small" color="inherit" variant="outlined">by apexory</Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'absolute', bottom: '15px', right: '15px' }}>
          <Button href="https://github.com/apexory/todolist" startIcon={<GitHubIcon />} size="small" color="inherit" variant="outlined">my github</Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'absolute', top: '10px', right: '10px' }}>
          <IconButton onClick={ changeTheme } color="inherit">{ theme == darkTheme ? <Brightness7Icon /> : <Brightness4Icon />}</IconButton>
        </div>
      </div>

    </div>
    </ThemeProvider>
  );
}

export default App;
