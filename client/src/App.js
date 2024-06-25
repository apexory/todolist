import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import LaptopIcon from '@mui/icons-material/Laptop';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

function App() {
  return (
    <div style={{ fontFamily: 'roboto' }} className="App">

      <Stack alignItems="center" gap="10px" sx={{ marginTop: '70px' }}>
          <LaptopIcon sx={{ fontSize: 50 }} />
          <Typography sx={{ fontSize: 20, height: '20px' }} >Todo-List App</Typography>
          <Typography sx={{ fontSize: 15, color: '#383838' }} >by apexory</Typography>
      </Stack>

      <Stack direction="row" gap="30px" justifyContent="center" sx={{ marginTop: '30px' }}>
        <div>efwef</div>
        <div>efwef</div>
        <div>efwef</div>
      </Stack>

      <div>
        <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
          ewfewfeewfwfe
        </div>

        <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
          olalallalallalal
        </div>
      </div>

    </div>
  );
}

export default App;
