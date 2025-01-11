import React, { useState } from "react";
import { Editor } from "primereact/editor";

export default function Custom_Editor({text,setText}) {
    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
                <button className="ql-code-block" aria-label="Code"></button>
                <button className="ql-list" value="ordered" aria-label="Ordered List"></button>
                <button className="ql-list" value="bullet" aria-label="Bullet List"></button>
                <button className="ql-align" value="" aria-label="Align Left"></button>
                <button className="ql-align" value="center" aria-label="Align Center"></button>
                <button className="ql-align" value="right" aria-label="Align Right"></button>
                <button className="ql-link" aria-label="Insert Link"></button>
                {/* <button className="ql-image" aria-label="Insert Image"></button> */}
                <select className="ql-size" defaultValue="" aria-label="Font Size">
                    <option value="small">Small</option>
                    <option value="normal">Normal</option>
                    <option value="large">Large</option>
                    <option value="huge">Huge</option>
                </select>

                {/* Font Color */}
                <select className="ql-color" aria-label="Font Color">
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="black" selected>Black</option>
                </select>

                {/* Background Color */}
                <select className="ql-background" aria-label="Background Color">
                    <option value="yellow">Yellow</option>
                    <option value="cyan">Cyan</option>
                    <option value="magenta">Magenta</option>
                    <option value="white">White</option>
                </select>

                {/* Blockquote */}
                <button className="ql-blockquote" aria-label="Blockquote"></button>

                {/* Clear Formatting */}
                <button className="ql-clean" aria-label="Clear Formatting"></button>
            </span>
        );
    }

    const header = renderHeader();
    return (
        <>
            <div className="w-full bg-gray-300">
                <Editor headerTemplate={header} value={text} onTextChange={(e) => setText(e.htmlValue)} 
                style={{
                    background: "black",
                    border: "gray",
                    color: "white",
                    fontSize: "14px",
                    minHeight: "140px",
                    maxHeight:"200px",
                    overflow: "auto",
                    whiteSpace: "pre-wrap", // This will ensure newlines and spaces are respected
                    overflowWrap: "break-word", // Ensures long words are wrapped
                    wordBreak: "break-word", // Breaks words that are too long
                  }} />
                
            </div>
        </>
    )
}
