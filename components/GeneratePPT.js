import React from "react";
import PptxGenJS from "pptxgenjs";

const DynamicPPT = () => {
  const createPPT = () => {
    const pptx = new PptxGenJS();

    // Add a slide
    const slide = pptx.addSlide();

    // Add the headline
    slide.addText("5 January-2025 Current Affairs Important Question", {
      x: 0.5,
      y: 0.2,
      fontSize: 18,
      bold: true,
      color: "084594",
      align: "center",
      w: "90%",
    });

    // Add the question
    slide.addText("प्रश्न: खो-खो वर्ल्ड कप 2025 भारत में कब आयोजित होने वाला है?", {
      x: 0.5,
      y: 1,
      fontSize: 16,
      bold: true,
      color: "222222",
      w: "90%",
    });

    // Add the options
    const options = [
      "1. 5-10 जनवरी",
      "2. 13-19 जनवरी",
      "3. 1-7 फरवरी",
      "4. 15-21 फरवरी",
    ];
    slide.addText(options.join("\n"), {
      x: 0.5,
      y: 1.5,
      fontSize: 14,
      color: "222222",
      w: "90%",
    });

    // Add the footer
    slide.addText("Railway, Banking, SSC, Teaching, DSSSB, and all competitive exams", {
      x: 0.5,
      y: 5,
      fontSize: 12,
      bold: true,
      color: "084594",
      align: "center",
      w: "90%",
    });

    // Add branding text
    slide.addText("Edustream India", {
      x: 0.5,
      y: 6,
      fontSize: 20,
      bold: true,
      color: "FF5722",
      align: "center",
      w: "90%",
    });

    // Export the PowerPoint
    pptx.writeFile("Current_Affairs_Slide");
  };

  return (
    <div>
      <h1>Generate a Current Affairs PPT Slide</h1>
      <button onClick={createPPT}>Download Slide</button>
    </div>
  );
};

export default DynamicPPT;
