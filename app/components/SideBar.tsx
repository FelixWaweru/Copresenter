"use client"
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { TrashIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd";
import TextView from './TextView';
import { createClient } from '@supabase/supabase-js'
import voice from 'elevenlabs-node';
require('dotenv').config();

const apiKey = process.env.ELEVEN_API_KEY;
const voiceID = process.env.ELEVEN_VOICE_ID;

const Sidebar = ({ children } : any) => {
  // Fixes weird bug (https://github.com/atlassian/react-beautiful-dnd/issues/1756#issuecomment-599388505)
  resetServerContext();

  const supabaseUrl = 'https://maccvsbijpvqcraqmibj.supabase.co'
  const supabaseKey = process.env.SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  const jsonList = [
    {
      "text": "Add your text, presentation or speech and have your very own AI Copresenter narrate it out for you.",
      "presenter": "BOT"
    },
    {
      "text": "Add your own reading parts for whenever the presentation needs a human touch.",
      "presenter": "PERSON"
    },
    {
      "text": "Drag & Drop to reorder the list. You can also edit and delete any slide. Go on, try it out 🧪",
      "presenter": "PERSON"
    }
  ];

  // React state to track order of items
  const [itemList, setItemList] = useState(jsonList);
  const [newSlideOpen, setNewSlideOpen] = useState(false);

  const [newSlidePresenter, setNewSlidePresenter] = useState("BOT");
  const [newSlideText, setNewSlideText] = useState("");

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

  const handleNewSlideSave = () => {
    const newSlide = {
      text: newSlideText,
      presenter: newSlidePresenter
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
    const filename = `/tmp/${new Date(new Date().getTime() + (3 * 60 * 60 * 1000)).toISOString().slice(0,10)}.mp3`;

    try {
      const res = await voice.textToSpeech(apiKey, voiceID, filename, text);
      console.log(res);

      try {
        const { data, error } = await supabase
          .storage
          .from('avatars')
          .upload(filename, res, {
            cacheControl: '3600',
            upsert: false
        });

        if(!error) {
          console.log(`Success, Audio saved as: ${filename}`);
        }
      }
      catch (error)
      {
        console.log(error);
      }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className='flex'>
      <div className='fixed w-1/4 h-screen bg-background border-r-[1px] flex flex-col justify-between' style={{background: '#252627'}}>
        <div className='flex flex-col items-center p-4' style={containerStyle}>
          <Link href='/'>
            <div className='bg-green-400 cursor-pointer my-4 p-3 rounded-lg inline-block'>
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
                    <div className='mb-5 m-1 p-3 w-full bg-green-400 rounded-lg text-gray-800 text-base'>
                      Select AI Speaker
                      <select className='w-full' id="dropdown" value="AI Name">
                        <option value="BOT">🤖 AI</option>
                        <option value="PERSON">🧑🏽 PERSON</option>
                      </select>
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
                              <div className='w-auto bg-green-400 hover:bg-green-300 cursor-pointer mx-1 p-2 rounded-lg inline-block' onClick={r => handleEdit(index)}>
                                <PencilIcon className="h-4 w-4 text-primary"/>
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