import React from "react";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Card = () => {
  const [course, setCourse] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numCards, setNumCards] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const handleSetCourse = (e) => {
    setCourse(e.target.value);
  };
  const handleSetTopic = (e) => {
    setTopic(e.target.value);
  };
  const handleSetDifficulty = (e) => {
    setDifficulty(e.target.value);
  };
  const handleSetNumCards = (e) => {
    setNumCards(e.target.value);
  };

  const flipCard = () => {
    setFlipped(!flipped);
    console.log("flipping card");
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const createCard = async () => {
    try {
      setLoading(true);
      let prompt = `Create ${numCards} flashcards for a ${difficulty} difficulty ${course} course on the topic of ${topic}.  
      Each flashcard should be in the format: card number>question>answer,,. Separate flashcards with ,, (double comma)
       and DO NOT include any extra spaces or newlines. 
       Keep each flashcard under 30 words.
       Use only standard characters (e.g., +, -, *, /, =, <, >) 
       and  ALL mathematical symbols. 
       Example: 1>What is 1+1?>2,,2>What is 2*2?>4,,.`;
      // console.log("sending data to backend");
      const response = await fetch("http://localhost:8080/create_cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.status === 500) {
        throw new Error("Internal Server Error");
      }
      if (response.status === 400) {
        throw new Error("Bad Request");
      }
      const result = await response.json();
      setCards(result);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveCard = async () => {
    try {
      const response = await fetch("http://localhost:8080/save_cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cards,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.status === 500) {
        throw new Error("Internal Server Error");
      }
      if (response.status === 400) {
        throw new Error("Bad Request");
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center mt-20">Create Card</h1>

      <div>
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={handleSetCourse}
          className="w-full border-2 border-gray-300 p-2 rounded mt-4"
        />
        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={handleSetTopic}
          className="w-full border-2 border-gray-300 p-2 rounded mt-4"
        />
        <select
          className="w-full border-2 border-gray-300 p-2 rounded mt-4"
          value={difficulty}
          onChange={handleSetDifficulty}
        >
          <option>Choose Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <input
          type="number"
          placeholder="Number of Cards"
          className="w-full border-2 border-gray-300 p-2 rounded mt-4"
          value={numCards}
          onChange={handleSetNumCards}
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
          onClick={createCard}
        >
          Create Card <i className="fas fa-plus"></i>{" "}
        </button>
      </div>

      <div>
        <h1 className="text-4xl text-center mt-20">Your AI-Generated Cards</h1>
        <div className="w-full  p-4 h-full rounded mt-4 ">
          {loading ? (
            <div className="flex justify-center items-center text-2xl h-full font-bold">
              <p>Generating Smart Cards ...</p>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 align-middle rounded">
                Previous <i className="fas fa-arrow-left"></i>{" "}
              </button> */}

              <div className="overflow-hidden w-full slider-container">
                <Slider {...settings}>
                  {cards?.map((val, idx) => {
                    return (
                      <div
                        key={idx}
                        className=" w-full shadow-xl
                        border-2 border-gray-300 pt-10 pb-4 pl-32 pr-32 rounded mt-4 items-center sm:h-[20rem] md:h-[500px] max-h-full  "
                      >
                        <div className="text-center ">
                          <p className="mt-4 text-4xl mb-24">
                            {val.card_number}
                          </p>
                          <p className="mt-4 text-2xl">
                            <span className="font-bold">Question:</span>{" "}
                            {val.question}
                          </p>
                          {/* <p className="mt-4 text-2xl">Answer: {val.answer}</p> */}
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-40 rounded"
                            onClick={flipCard}
                          >
                            Flip Card <i className="fas fa-rotate"></i>
                          </button>
                          {flipped && (
                            <div className="back">
                              <p className="mt-4 text-2xl">
                                <span className="font-bold">Answer:</span>{" "}
                                {val.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>

              {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
                Next <i className="fas fa-arrow-right"></i>{" "}
              </button> */}
            </div>
          )}
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
          onClick={handleSaveCard}
        >
          Save Card Deck <i className="fas fa-save"></i>{" "}
        </button>
      </div>
    </div>
  );
};

export default Card;
