"use client"
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { TrashIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd";
import TextView from './TextView';
import Loader from './Loader';
require('dotenv').config();

const Sidebar = ({ children } : any) => {
  // Fixes weird bug (https://github.com/atlassian/react-beautiful-dnd/issues/1756#issuecomment-599388505)
  resetServerContext();

  const jsonList = [
    {
      "text": "Copresenter is a virtual co-host that makes presentations a breeze by using AI to read out your slides, freeing you from prep hassles and letting you focus on delivery.",
      "presenter": "BOT",
       "audio_link": "https://maccvsbijpvqcraqmibj.supabase.co/storage/v1/object/public/audio_files/9d6dc8f9-36b2-468a-8e62-8504ac7aa194.mp3"
    },
    {
      "text": "Add your text, presentation or speech and have your very own AI Copresenter narrate it out for you.",
      "presenter": "BOT",
       "audio_link": "https://maccvsbijpvqcraqmibj.supabase.co/storage/v1/object/public/audio_files/e2c4cfae-d0b5-4135-ace6-bbcb62a503bd.mp3"
    },
    {
      "text": "Drag & Drop to reorder the list. You can also edit and delete any slide. Go on, try it out 🧪",
      "presenter": "BOT",
      "audio_link": "https://maccvsbijpvqcraqmibj.supabase.co/storage/v1/object/public/audio_files/13a4ab41-27a6-41ec-bb2c-cbcf44d2faaf.mp3"
    },
    {
      "text": "Add your own reading parts for whenever the presentation needs a human touch.",
      "presenter": "PERSON",
       "audio_link": ""
    }
  ];

  // const aiVoiceList = [
  //   { name: 'Rachel', id: '21m00Tcm4TlvDq8ikWAM' },
  //   { name: 'Clyde', id: '2EiwWnXFnvU5JabPnv8n' },
  //   { name: 'Domi', id: 'AZnzlk1XvdvUeBnXmlld' },
  //   { name: 'Dave', id: 'CYw3kZ02Hs0563khs1Fj' },
  //   { name: 'Fin', id: 'D38z5RcWu1voky8WS1ja' },
  //   { name: 'Bella', id: 'EXAVITQu4vr4xnSDxMaL' },
  //   { name: 'Antoni', id: 'ErXwobaYiN019PkySvjV' },
  //   { name: 'Thomas', id: 'GBv7mTt0atIp3Br8iCZE' },
  //   { name: 'Charlie', id: 'IKne3meq5aSn9XLyUdCD' },
  //   { name: 'Emily', id: 'LcfcDJNUP1GQjkzn1xUU' },
  //   { name: 'Elli', id: 'MF3mGyEYCl7XYWbV9V6O' },
  //   { name: 'Callum', id: 'N2lVS1w4EtoT3dr4eOWO' },
  //   { name: 'Patrick', id: 'ODq5zmih8GrVes37Dizd' },
  //   { name: 'Harry ', id: 'SOYHLrjzK2X1ezoPC6cr' },
  //   { name: 'Liam', id: 'TX3LPaxmHKxFdv7VOQHJ' },
  //   { name: 'Dorothy', id: 'ThT5KcBeYPX3keUQqHPh' },
  //   { name: 'Josh', id: 'TxGEqnHWrfWFTfGW9XjX' },
  //   { name: 'Arnold', id: 'VR6AewLTigWG4xSOukaG' },
  //   { name: 'Charlotte', id: 'XB0fDUnXU5powFXDhCwa' },
  //   { name: 'Matilda ', id: 'XrExE9yKIg1WjnnlVkGX' },
  //   { name: 'Matthew', id: 'Yko7PKHZNXotIFUBG7I9' },
  //   { name: 'James', id: 'ZQe5CZNOzWyzPSCn5a3c' },
  //   { name: 'Joseph', id: 'Zlb1dXrM653N07WRdFW3' },
  //   { name: 'Jeremy', id: 'bVMeCyTHy58xNoL34h3p' },
  //   { name: 'Michael ', id: 'flq6f7yk4E4fJM5XTYuZ' },
  //   { name: 'Ethan', id: 'g5CIjZEefAph4nQFvHAz' },
  //   { name: 'Gigi', id: 'jBpfuIE2acCO8z3wKNLl' },
  //   { name: 'Freya', id: 'jsCqWAovK2LkecY7zXl4' },
  //   { name: 'Grace', id: 'oWAxZDx7w5VEj9dCyTzz' },
  //   { name: 'Daniel', id: 'onwK4e9ZLuTAKqWW03F9' },
  //   { name: 'Serena', id: 'pMsXgVXv3BLzUgSXRplE' },
  //   { name: 'Adam', id: 'pNInz6obpgDQGcFmaJgB' },
  //   { name: 'Nicole', id: 'piTKgcLEGmPE4e6mEKli' },
  //   { name: 'Jessie', id: 't0jbNlBVZ17f02VDIeMI' },
  //   { name: 'Ryan ', id: 'wViXBPUzp2ZZixB1xQuM' },
  //   { name: 'Sam', id: 'yoZ06aMxZJJ28mfd3POQ' },
  //   { name: 'Glinda', id: 'z9fAnlkpzviPz146aGWa' },
  //   { name: 'Giovanni', id: 'zcAOhNBS3c14rBihAFp1' },
  //   { name: 'Mimi ', id: 'zrHiDhphv9ZnVXBqCLjz' }
  // ];

  // React state to track order of items
  const [itemList, setItemList] = useState(jsonList);
  const [newSlideOpen, setNewSlideOpen] = useState(false);

  const [newSlidePresenter, setNewSlidePresenter] = useState("BOT");
  const [newSlideText, setNewSlideText] = useState("");

  const [loading, setLoading] = useState(false);
  const [scroll, setScroll] = useState(false);

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
    background: isDragging ? "#ffffffe6" : "#ffffff",
    // styles we need to apply on draggables
    ...draggableStyle
  });

  const handlePresenterChange = async (event, itemValue) => {
    const newItemList = [...itemList];
    const newValue = event.target.value;

    if (newItemList[itemValue].presenter !== newValue) {
      newItemList[itemValue].presenter = newValue;

      if(newValue === "BOT") {
        const responseUrl = await audioGen(newItemList[itemValue].text);
        console.log(responseUrl)

        newItemList[itemValue].audio_link = responseUrl.publicUrl ? responseUrl.publicUrl : ""
      }
    }
    console.log(newItemList)
    setItemList(newItemList);
  };

  const handleDelete = (itemValue) => {
    let newItemList = [...itemList];
    newItemList.splice(itemValue, 1);

    console.log(newItemList)

    setItemList(newItemList);
  }

  const handleNewSlide = () => {
    setNewSlideOpen(wasOpened => !wasOpened);
  }

  const handleNewSlideText = (event) => {
    const newText = event.target.value;
    console.log(newText)

    setNewSlideText(newText);
  }

  const handleNewSlidePresenter = (event) => {
    const newPresenter = event.target.value;

    setNewSlidePresenter(newPresenter);
  };

  const handleNewSlideSave = async () => {
    let newSlide = {};

    if(newSlidePresenter === "BOT") {
      const responseUrl = await audioGen(newSlideText);

      newSlide = {
        text: newSlideText,
        presenter: newSlidePresenter,
        audio_link: responseUrl.publicUrl ? responseUrl.publicUrl : ""
      }
    }
    else {
      newSlide = {
          text: newSlideText,
          presenter: newSlidePresenter,
          audio_link: ""
        }
    }

    const newItemList = [...itemList, newSlide];

    setItemList(newItemList);
    setNewSlideOpen(!newSlideOpen);
  }

  const handleScrollButtonClick = () => {
    setScroll(!scroll);
  };

  const containerStyle = {
    height: '100%', // Adjust the height as needed
    overflow: 'auto',
  };

  
  const audioGen = async (text) => {
    setLoading(true);

    const data = {
      text: text
    };

    const headers = {
      'Content-Type': 'application/json'
    };

    const response = await fetch("/api/elevenlabs", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    setLoading(false);
    return response.json();
  };

  return (
    <div className='flex'>
      {loading && 
        (<Loader />)
      }
      <div className='fixed w-1/4 h-screen bg-background border-r-[1px] flex flex-col justify-between' style={{background: '#111827'}}>
        <div className='flex flex-col items-center p-4' style={containerStyle}>
          <div className="w-full">
            <DragDropContext onDragEnd={handleDrop}>
              <Droppable droppableId="list-container">
                {(provided) => (
                  <div
                    className="list-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className='mb-5 m-1 pb-5 p-3 w-full rounded-lg text-white text-2xl text-center'>
                      COPRESENTER
                    </div>
                    {itemList.map((item, index) => (
                      <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                          className='m-1 p-3 w-full rounded-lg text-gray-800 text-xs bg-gray-900'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                            )}
                          >
                            <div className='flex'> 
                              <h2 className='text-green-300 text-base w-1/4'>
                                {index + 1}
                              </h2>
                              <select className='w-2/4' id="dropdown" value={item.presenter} onChange={event => handlePresenterChange(event, index)}>
                                <option value="BOT">🤖 AI</option>
                                <option value="PERSON">🧑🏽 PERSON</option>
                              </select>
                              <div className='w-auto cursor-pointer mx-1 p-2 rounded-lg inline-block'>
                                
                              </div>
                              <div className='w-auto bg-red-400 hover:bg-red-300 cursor-pointer mx-1 p-2 rounded-lg inline-block' onClick={r => handleDelete(index)}>
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

                    {newSlideOpen && (
                    <div
                    className='m-1 mt-5 p-3 w-full rounded-lg text-gray-800 text-sm bg-white'
                    >
                      <div className='flex'>                            
                        <h2 className='text-green-300 text-lg w-1/4'>
                          +
                        </h2>
                        <select className='w-3/4' id="dropdown" value={newSlidePresenter} onChange={event => handleNewSlidePresenter(event)}>
                          <option value="BOT">🤖 AI</option>
                          <option value="PERSON">🧑🏽 PERSON</option>
                        </select>
                      </div>
                      <br />

                      <textarea name="body" className='w-full border border-2 border-gray-300 rounded-lg'
                        maxLength={200}
                        placeholder='Add Speaker Lines Here..'
                        onChange={event => handleNewSlideText(event)}/>
                      <div className='flex'>
                        <div className='w-auto bg-green-400 hover:bg-green-300 cursor-pointer mx-1 p-2 rounded-lg inline-block text-white' onClick={handleNewSlideSave}>
                          Save
                        </div>
                        <div className='w-auto bg-red-400 hover:bg-red-300 cursor-pointer mx-1 p-2 rounded-lg inline-block text-white' onClick={handleNewSlide}>
                          Cancel
                        </div>
                      </div>
                    </div>
                    )}
                    {!newSlideOpen && (
                    <div className='flex mt-5 m-1 p-3 w-full bg-green-400 hover:bg-green-300 rounded-lg text-gray-800 text-base' onClick={handleNewSlide}>
                      <PlusIcon className="h-6 w-6 mr-2"/>
                      Add New Card
                    </div>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
      {/* <main className='ml-auto w-3/4'>{children}</main> */}
      <TextView itemList={itemList} />
    </div>
  );
};

export default Sidebar;