import React, { useEffect, useState } from "react";
import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";
import Style from '../../App.module.css'
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
  } from "@mui/material";
  import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Awards({ portfolioOwnerId, isEditable }) {

    const [awards, setAwards] = useState([]);

    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        Api.get("award/list", portfolioOwnerId).then((res) => setAwards(res.data));
    }, [portfolioOwnerId]);

    return (
        <Card sx={{ marginBottom: "20px", borderRadius: "15px" }}>
          <Accordion defaultExpanded={true} sx={{ boxShadow: 0 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  fontFamily: "Elice Digital Baeum",
                  fontSize: "2em",
                  color: "#08075C",
                  fontWeight: 800,
                }}
              >
                수상이력
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {awards &&
                awards.map((award) => (
                  <Award
                    key={award.id}
                    award={award}
                    setAwards={setAwards}
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
                  aria-label="add-award"
                  onClick={() => setIsAdding((cur) => !cur)}
                >
                  <AddCircleRoundedIcon sx={{ width: "38px", height: "38px" }} />
                </IconButton>
              </Box>
              {isAdding && (
                <Dialog open={isAdding} onClose={() => setIsAdding((cur) => !cur)}>
                  <DialogTitle>수상이력 추가</DialogTitle>
                  <DialogContent>
                    <AwardAddForm
                      portfolioOwnerId={portfolioOwnerId}
                      setIsAdding={setIsAdding}
                      setAwards={setAwards}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          )}
        </Card>
      );
}

export default Awards
