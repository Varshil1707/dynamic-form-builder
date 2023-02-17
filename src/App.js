//import logo from './logo.svg';
import './App.css';
import LeftBar from "./LeftBar/Index";
import Box from "@mui/material/Box"



function App() {
  return (
    <>
      <Box className="App" p={5} sx={{ textAlign: 'left' }}>
        <LeftBar />
        {/* <ListUser/> */}
      </Box>
    </>
  );
}

export default App;
