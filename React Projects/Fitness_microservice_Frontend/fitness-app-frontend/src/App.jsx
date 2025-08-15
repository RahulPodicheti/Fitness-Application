import {BrowserRouter as Router, Routes, Route, Navigate, useLocation} from "react-router";
import {Button, Box, Typography, Paper} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import { motion } from "framer-motion";

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
      //LOGIN
      <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 5,
            borderRadius: 3,
            minWidth: 300,
            textAlign: "center",
            backgroundColor: "rgba(255,255,255,0.95)",
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "#555" }}>
            Please log in to continue to your dashboard
          </Typography>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: "30px",
                fontWeight: "bold",
                fontSize: "1.1rem",
                background: "linear-gradient(90deg, #00C9FF, #92FE9D)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(90deg, #00C9FF, #6EFCEB)",
                  boxShadow: "0 6px 25px rgba(0,0,0,0.3)",
                },
              }}
              onClick={logIn}
            >
              LOGIN
            </Button>
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
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
