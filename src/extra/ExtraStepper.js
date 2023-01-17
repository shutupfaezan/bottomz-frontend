import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from "@mui/material/Button";
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

const steps = [
  'Log In',
  'Event Details',
  'Ticket/Tables Categories',
  'Preview',
];
export default function ExtraStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <div className='mt-4'>
      <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            {/* <StepContent>hi</StepContent> */}
          </Step>
        ))}
      </Stepper>
      </div>
      <div className='d-flex'>
      <Button className="ml-5" color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>Back</Button>
      <Button className="ml-auto mr-5" color="inherit" disabled={activeStep === 3} onClick={handleNext} sx={{ mr: 1 }}>Next</Button>
      </div>

    </div>
  );
}
