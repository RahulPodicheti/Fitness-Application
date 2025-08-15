import {BrowserRouter as Router, Routes, Route, Navigate, useLocation} from "react-router";
import {Button, Box, Typography} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";

const ActivityPage = () => {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <ActivityForm onActivityAdded={() => window.location.reload()} />
      <ActivityList />  
    </Box>
  );
};


function App() {
  const {token, tokenData, logIn, logOut, isAuthenticated} = useContext(AuthContext);
  const dispatch = useDispatch();
  const [athReady, setAuthReady] = useState(false);
  useEffect(() => {
    if(token){
      dispatch(setCredentials({token, user: tokenData}));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
     
      <Button variant="contained" color="primary" size="large" onClick={logIn} >
        LOGIN
      </Button>
          ) : (
            // <div>
            //   <pre>{JSON.stringify(tokenData, null, 2)}</pre>
            //   <pre>{JSON.stringify(token, null, 2)}</pre>
            // </div>

            <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
              <Button variant="contained" color="secondary" onClick={logOut}>
                Logout
              </Button>
              <Routes>
                <Route path="/activities" element={<ActivityPage/>} />
                <Route path="/activities/:id" element={<ActivityDetail/>} />

                <Route path="/" element={token ? <Navigate to="/activities" replace/> : <div>Welcome! Please Login.</div> }  />
              </Routes>
            </Box>
          )}
    </Router>
  )
}

export default App
