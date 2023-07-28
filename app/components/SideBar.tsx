"use client"
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { TrashIcon, PencilIcon, PlusIcon } from '@heroicons/react/solid';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Sidebar = ({ children } : any) => {

  const defaultList = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only centuries",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not five centuries",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived only five centuries",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has not only five centuries"
  ];

  const jsonList = [
    {
      "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not five",
      "presenter": "BOT"
    },
    {
      "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived only five",
      "presenter": "PERSON"
    },
    {
      "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has not only five",
      "presenter": "BOT"
    },
    {
      "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It survived not only five",
      "presenter": "PERSON"
    }
  ];

  // React state to track order of items
  const [itemList, setItemList] = useState(jsonList);

  const dashboardLink = `/dashboard/`;
  const historyLink = `/history/`;
  const billingLink = `/billing/`;

  // Function to update list on drop
  const handleDrop = (result) => {
    // Ignore drop outside droppable container
    console.log(result)
    if (!result.destination) return;
    var updatedList = [...itemList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(result.source.index, 1);
    // Add dropped item
    updatedList.splice(result.destination.index, 0, reorderedItem);
    // Update State
    setItemList(updatedList);
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "#77dd77" : "#ffffff",
    // styles we need to apply on draggables
    ...draggableStyle
  });

  const handlePresenterChange = (event, itemValue) => {
    const newItemList = [...itemList];
    const newValue = event.target.value;

    if (newItemList[itemValue].presenter !== newValue) {
      newItemList[itemValue].presenter = newValue;
    }
    setItemList(newItemList);
  };

  const handleEdit = (itemValue) => {
    console.log(itemValue)
  }

  const handleDelete = (itemValue) => {
    let newItemList = [...itemList];
    newItemList.splice(itemValue, 1);

    console.log(newItemList)

    setItemList(newItemList);
  }

  const handleNewSlide = () => {
    console.log("New Slide")
  }

  const containerStyle = {
    height: '100%', // Adjust the height as needed
    overflow: 'auto',
  };

  return (
    <div className='flex'>
      <div className='fixed w-1/4 h-screen bg-background border-r-[1px] flex flex-col justify-between'>
        <div className='flex flex-col items-center p-4' style={containerStyle}>
          <Link href={historyLink}>
            <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'>
              <PencilIcon className="h-6 w-6 text-primary"/>
            </div>
          </Link>

          <div className="w-full">
            <DragDropContext onDragEnd={handleDrop}>
              <Droppable droppableId="list-container">
                {(provided) => (
                  <div
                    className="list-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className='flex mb-5 m-1 p-5 w-full bg-green-400 hover:bg-green-500 rounded-lg text-gray-800' onClick={handleNewSlide}>
                      <PlusIcon className="h-6 w-6 mr-2"/>
                      Add New Slide
                    </div>
                    <div className='flex mb-5 m-1 p-5 w-full bg-green-400 hover:bg-green-500 rounded-lg text-gray-800' onClick={handleNewSlide}>
                      <select className='w-2/4' id="dropdown" value="AI Name">
                        <option value="BOT">🤖 AI</option>
                        <option value="PERSON">🧑🏽 PERSON</option>
                      </select>
                    </div>
                    {itemList.map((item, index) => (
                      <Draggable key={item} draggableId={index.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                          className='m-1 p-3 w-full rounded-lg text-gray-800 text-sm'
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div className='flex'>                            
                              <h2 className='text-green-500 text-lg w-1/4'>
                                {index + 1}
                              </h2>
                              <select className='w-2/4' id="dropdown" value={item.presenter} onChange={event => handlePresenterChange(event, index)}>
                                <option value="BOT">🤖 AI</option>
                                <option value="PERSON">🧑🏽 PERSON</option>
                              </select>
                              <div className='w-auto bg-green-400 hover:bg-green-500 cursor-pointer mx-1 p-2 rounded-lg inline-block' onClick={r => handleEdit(index)}>
                                <PencilIcon className="h-4 w-4 text-primary"/>
                              </div>
                              <div className='w-auto bg-red-400 hover:bg-red-500 cursor-pointer mx-1 p-2 rounded-lg inline-block' onClick={r => handleDelete(index)}>
                                <TrashIcon className="h-4 w-4 text-primary"/>
                              </div>
                            </div>
                            <br />

                            {item.text}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
      <main className='ml-auto w-3/4'>{children}</main>
    </div>
  );
};

export default Sidebar;