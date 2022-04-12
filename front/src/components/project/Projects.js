import React, { useEffect, useState } from "react"
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material"

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import CloseIcon from "@mui/icons-material/Close"
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';

import Project from "./Project"
import ProjectAddForm from "./ProjectAddForm"
import * as Api from "../../api"

function Projects({ portfolioOwnerId, isEditable }) {
  const [projects, setProjects] = useState([])
  const [clickAddBtn, setClickAddBtn] = useState(false)

  useEffect(() => {
    Api.get("project/list", portfolioOwnerId).then((res) => {
      setProjects(res.data)
    })
  }, [portfolioOwnerId])

  return (
    <Card sx={{ marginBottom: "20px", borderRadius: "15px" }}>
      <Accordion defaultExpanded={true} sx={{ boxShadow: 0 }}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{padding: 0}}
        >
          <Box 
            sx={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'space-between', 
            }}>
          
            <Box sx={{ display: 'flex', marginLeft: '20px'}}>
              <HistoryEduRoundedIcon sx={{fontSize: "2.8em"}}/>
              <Typography
                sx={{
                  fontFamily: "Elice Digital Baeum",
                  fontSize: "1.8em",
                  color: "#08075C",
                  fontWeight: 800,
                  marginLeft: "15px",
                }}
              >
                Project
              </Typography>
            </Box>
          
            <Typography
              sx={{
                marginTop: '10px',
                width: '500px',
                height: '20px',
                backgroundColor: '#6D55FF',
              }} />

          </Box>
          
        </AccordionSummary>

        <AccordionDetails>
          {projects.map((project) => (
            <Project
              key={project.id}
              project={project}
              setProjects={setProjects}
              isEditable={isEditable}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      {isEditable && (
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              style={{ color: "#08075C" }}
              aria-label="add-projects"
              onClick={() => setClickAddBtn((cur) => !cur)}
            >
              <AddCircleRoundedIcon sx={{ width: "56px", height: "56px" }} />
            </IconButton>
          </Box>

          {clickAddBtn && (
            <Dialog
              open={clickAddBtn}
              onClose={() => setClickAddBtn((cur) => !cur)}
            >
              <DialogTitle
                sx={{
                  fontFamily: "Elice Digital Baeum",
                  fontWeight: 500,
                  fontSize: "1.5rem",
                }}
              >
                <IconButton
                  onClick={() => setClickAddBtn((cur) => !cur)}
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    color: "#9e9e9e",
                  }}
                >
                  <CloseIcon />
                </IconButton>
                프로젝트 추가
              </DialogTitle>
              <DialogContent>
                <ProjectAddForm
                  portfolioOwnerId={portfolioOwnerId}
                  setClickAddBtn={setClickAddBtn}
                  setProjects={setProjects}
                />
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default Projects
