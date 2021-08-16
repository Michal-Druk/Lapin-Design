import React from 'react';
import './abautItem.css'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function AbautItem(props){
    return(
        <div >
        <Accordion className="accordion">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div >{props.text.title}</div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {props.text.content}
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
    )
}
export default AbautItem