import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./App.css";

function App() {
  const [formFields, setFormFields] = useState([]);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("/api/notes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Add this line
        setNotes(data);
      })
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...formFields];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormFields(items);
  };

  const addInputField = () => {
    const label = prompt("Enter label for the input field");
    const type =
      prompt(
        "Enter type for the input field (text, number, password , select, phone, email):"
      ) || "text";

    if (label) {
      let options = null;
      if (type === "select") {
        const optionString = prompt("Enter options for the input ");
        options = optionString.split(",").map((option) => option.trim());
      }
      setFormFields([
        ...formFields,
        {
          id: formFields.length + 1,
          type,
          label,
          options,
          selectedOptions: [],
        },
      ]);
    }
  };

  const handleSubmit = () => {
    console.log("Form data submitted:", formFields);
  };

  return (
    <div className="App">
      <h1>Form Builder</h1>

      <div>
        <button onClick={addInputField}>Add</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <form ref={provided.innerRef} {...provided.droppableProps}>
              {formFields.map((field, index) => (
                <Draggable
                  key={field.id}
                  draggableId={field.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <label>{field.label}</label>
                      {field.type === "select" ? (
                        <select>
                          {field.options &&
                            field.options.map((option, optionIndex) => (
                              <option key={optionIndex} value={option}>
                                {option}
                              </option>
                            ))}
                        </select>
                      ) : field.type === "phone" ? (
                        <input
                          type="tel"
                          pattern="\d{8}"
                          title="Please enter a valid 8-digit phone number"
                        />
                      ) : field.type === "email" ? (
                        <input type="email" />
                      ) : (
                        <input type={field.type} />
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <button type="button" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          )}
        </Droppable>
      </DragDropContext>
      <h2>Notes from Backend:</h2>
      <ul>
        {Array.isArray(notes) &&
          notes.map((note) => <li key={note._id}>{note.nom}</li>)}
      </ul>
    </div>
  );
}

export default App;
