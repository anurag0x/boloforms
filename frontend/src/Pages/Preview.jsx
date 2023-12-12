import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa6";
import CategorizePreview from "../Components/Preview/CategorizePreview";
import ClozePreview from "../Components/Preview/ClozePreview";
import ComprehensionPreview from "../Components/Preview/ComprehensionPreview";
import { useNavigate, useParams } from "react-router-dom";
import successIcon from "../assests/successIcon.svg";

function Preview() {
  const { isOpen: messageIsOpen, onOpen: messageOnOpen, onClose: messageOnClose } = useDisclosure();
  const [data, setData] = useState({ questions: [] });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showImage, setShowImage] = useState("");
  const Navigate = useNavigate();
  const params = useParams();

  async function fetchData() {
    let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/form/get/${params.id}`);
    setData(res.data[0]);
  }

  async function handleSubmit() {
    // lopping the data and taking only required parameters
    // let questions = [];
    // data.questions.forEach((el) => {
    //   if (el.type == "Categorize") {
    //     questions.push({
    //       type: el.type,
    //       items: el.items,
    //     });
    //   } else if (el.type == "Cloze") {
    //     let obj = { question: el.question, type: el.type };
    //     if (el.answer) {
    //       obj.answer = el.answer;
    //     }
    //     questions.push(obj);
    //   } else {
    //     questions.push({
    //       type: el.type,
    //       passage: el.passage,
    //       mcq: el.questions,
    //     });
    //   }
    // });

    // // post method
    // try {
    //   let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/response`, {
    //     "formId":data._id,
    //     "questions":questions
    //   });
    messageOnOpen();
    // } catch (error) {
    //   console.log(error.message, "error");
    // }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-5">
      <nav className="flex gap-5  rounded-lg items-center border-b-8 border-blue-500 pb-2">
        <h2 className="font-bold text-[25px] capitalize text-blue-600">
          {data?.title}
        </h2>
        <FaImage
          size={"25px"}
          onClick={() => {
            setShowImage(data.image);
            onOpen();
          }}
        />
      </nav>

      {/* setting loader */}
      {!data.title ? (
        <h2 className="text-center text-[20px] font-semibold my-5">
          Loading <span id="loderAnimation">. . .</span>
        </h2>
      ) : null}

      {data?.questions.map((el, ind) => (
        <div
          key={ind}
          className="p-3 my-3 rounded-lg border-l-8 border-l-blue-400 border-2 border-gray-300 "
        >
          {el.type == "Categorize" ? (
            <CategorizePreview
              ind={ind}
              currentdata={el}
              data={data}
              setData={setData}
              setShowImage={setShowImage}
              onOpen={onOpen}
            />
          ) : null}
          {el.type == "Cloze" ? (
            <ClozePreview
              ind={ind}
              currentdata={el}
              data={data}
              setData={setData}
              setShowImage={setShowImage}
              onOpen={onOpen}
            />
          ) : null}
          {el.type == "Comprehension" ? (
            <ComprehensionPreview
              ind={ind}
              currentdata={el}
              data={data}
              setData={setData}
              setShowImage={setShowImage}
              onOpen={onOpen}
            />
          ) : null}
        </div>
      ))}

      {/* showing footer after data fetched */}
      {data.title ? (
        <footer className="flex justify-center gap-5">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 py-1 px-3 text-white font-bold text-[25px] rounded-lg"
          >
            Submit
          </button>
          <button
            onClick={fetchData}
            className="bg-purple-500 py-1 px-3 text-white font-bold text-[25px] rounded-lg"
          >
            Reset
          </button>
          <button
            onClick={()=>Navigate(-1)}
            className="bg-green-500 py-1 px-3 text-white font-bold text-[25px] rounded-lg"
          >
            Exit Preview
          </button>
        </footer>
      ) : null}

      {/* modal for image and form submit */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton bg={"white"} />
          <ModalBody padding={"20px"}>
            <img src={showImage} alt="" />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={messageIsOpen} onClose={messageOnClose}>
        <ModalOverlay />
        <ModalContent height={'400px'}>
          <ModalCloseButton />
          <ModalBody
            padding={"40px 0px"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"end"}
          >
            <img src={successIcon} alt="" className="block m-auto w-[200px]" />
            <h3 className="font-bold text-center text-[25px] my-3">
              Form Submitted Successfully
            </h3>
            <div className="flex gap-10">
              <button
                className="py-1 px-3 bg-blue-500 text-white rounded-lg text-[25px]"
                onClick={() => Navigate("/")}
              >
                Home
              </button>
              <button
                className="py-1 px-3 bg-blue-500 text-white rounded-lg text-[25px]"
                onClick={messageOnClose}
              >
                Close
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Preview;
