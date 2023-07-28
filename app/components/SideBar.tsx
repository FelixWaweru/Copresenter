"use client"
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { ClockIcon } from '@heroicons/react/solid';
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
    background: isDragging ? "#77dd77" : "#ff964f",
    // styles we need to apply on draggables
    ...draggableStyle
  });

  const handlePresenterChange = ({event, itemValue} : any) => {
    const newItemList = itemList;
    const newValue = event.target.value;

    if (newItemList[itemValue].presenter !== newValue) {
      newItemList[itemValue].presenter = newValue;
    }

    setItemList(newItemList);
  };

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
              <ClockIcon className="h-6 w-6 text-primary"/>
            </div>
          </Link>
          <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
          <div className="w-full">
            <DragDropContext onDragEnd={handleDrop}>
              <Droppable droppableId="list-container">
                {(provided) => (
                  <div
                    className="list-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {itemList.map((item, index) => (
                      <Draggable key={item} draggableId={item} index={index}>
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
                            <h2 className='text-white text-lg'>
                              {index + 1} 🤖
                            </h2>
                            <select id="dropdown" value={item.presenter} onChange={event => handlePresenterChange(event, index)}>
                              <option value="BOT">BOT</option>
                              <option value="PERSON">PERSON</option>
                            </select>

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