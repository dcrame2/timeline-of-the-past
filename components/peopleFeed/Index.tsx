import React from "react";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import { variables } from "@/styles/Variables";
import Link from "next/link";
import { pSmall, pXSmall } from "@/styles/Type";
import HourGlassLottieLoading from "../reusable/hourglassLottieLoading/Index";
import { MediaQueries } from "@/styles/Utilities";
import MainContainer from "../reusable/mainContainer/Index";
import CreateButton from "../reusable/createButton/Index";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import ExternalIcon from "../reusable/svg/externalIcon/Index";
import EditIcon from "../reusable/svg/editIcon/Index";
import { useRouter } from "next/router";
import TrashIcon from "../reusable/svg/trashIcon/Index";
import formatDate from "@/lib/formatDate";
import Notification from "../reusable/notification/Index";

interface UserData {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  slug?: string;
  dob?: any;
  mainImage?: string;
  theme?: string;
}

interface PeopleDataProps {
  userData?: UserData[];
}

const PeopleFeedInnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  flex-direction: column;
  padding: 8px;
  overflow-y: scroll;
  @media ${MediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${MediaQueries.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const HourGlassContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const CRUDBtns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  z-index: 1;
  position: relative;
  align-items: center;
`;

const NoTimelineContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  p {
    ${pSmall}
  }
`;

const ModalDescription = styled.p`
  ${pXSmall}
  b {
    font-weight: bold;
  }
`;

interface PeopleProps {
  firstName?: string;
  lastName?: string;
  dob?: string;
  mainImage?: string;
}

function PeopleFeed({
  peopleData,
  fetchData,
  isLoading,
  getUserInfo,
}: {
  peopleData: PeopleDataProps;
  getUserInfo: () => void;
  fetchData: () => void;
  isLoading: boolean;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [deletePerson, setDeletePerson] = React.useState<PeopleProps | null>();

  const deletePersonHandler = (name: PeopleProps) => {
    setDeletePerson(name);
  };

  const handleRemoveAllImages = async (person: PeopleProps) => {
    try {
      // Make a POST request to the deleteImage API route
      const response = await fetch("/api/deleteImage/deleteAllImages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ person }),
      });

      if (response.ok) {
        // Image deletion was successful
        console.log("Image deleted successfully");
      } else {
        // Handle error response from the API route
        console.error("Failed to delete image:", response.statusText);
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error("Error deleting image:", error);
    }
  };

  const handleSingleRemoveImage = async (imageUrlToDelete: string) => {
    // Check if selectedAge is not empty
    try {
      // Make a POST request to the deleteImage API route
      await fetch("/api/deleteImage/deleteImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrlToDelete }),
      });
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error("Error deleting image:", error);
    }
  };

  const deletePeopleHandler = async (person: PeopleProps, index: number) => {
    const session = await getSession();
    const sessionUserEmail: string | null | undefined = session?.user?.email;
    console.log(sessionUserEmail, "session");

    const response = await fetch("/api/people/delete-people", {
      method: "POST",
      body: JSON.stringify({
        sessionUserEmail,
        person,
        index,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await fetch("/api/auth/user/increase-timelines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Include the sessionUserEmail in the request body
      body: JSON.stringify({ sessionUserEmail }),
    });

    if (person.mainImage) {
      handleSingleRemoveImage(person.mainImage);
    }

    handleRemoveAllImages(person);

    fetchData();
    getUserInfo();

    console.log(response, "Response");
  };

  const router = useRouter();

  const handleEditClick = (person: any, index: number) => {
    // Navigate to the edit page with query parameters
    router.push({
      pathname: "/auth/edit",
      query: {
        person: JSON.stringify(person),
        selectedIndex: index,
      },
    });
  };
  return (
    <>
      <MainContainer>
        {isLoading ? (
          <HourGlassContainer>
            <HourGlassLottieLoading />
          </HourGlassContainer>
        ) : (
          <>
            <div />
            {peopleData &&
            peopleData.userData &&
            peopleData.userData.length > 0 ? (
              <PeopleFeedInnerContainer>
                {peopleData.userData.map((person, index) => {
                  const { firstName, lastName, slug, dob, mainImage, theme } =
                    person;

                  return (
                    <>
                      <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="px-4 py-5 sm:px-4">
                          <h4 className="font-bold text-black">
                            {firstName} {lastName}
                          </h4>
                          <small className="text-default-500">
                            Birthday: {formatDate(dob)}
                          </small>
                        </div>
                        <div className="px-4 sm:px-4">
                          <Image
                            alt="Card background"
                            className="object-cover rounded-xl h-56 w-full"
                            src={mainImage}
                            width={500}
                          />
                        </div>
                        <div className="px-4 py-4 sm:px-4">
                          <CRUDBtns className="mt-2   justify-center">
                            <Button
                              style={{
                                backgroundColor: "rgba(13, 51, 80, 0.8)",
                                color: variables.white,
                              }}
                              size="sm"
                              target="_blank"
                              as={Link}
                              isIconOnly
                              href={`https://timelinethat.com${slug}`}
                              startContent={
                                <ExternalIcon color={variables.white} />
                              }
                            />
                            <Button
                              style={{
                                color: variables.white,
                                backgroundColor: "rgba(255, 180, 0, 0.8)",
                              }}
                              size="sm"
                              isIconOnly
                              startContent={
                                <EditIcon color={variables.white} />
                              }
                              onClick={() => handleEditClick(person, index)}
                            />
                            <Button
                              style={{
                                color: variables.white,
                                backgroundColor: "rgba(255, 0, 0, 0.8)",
                              }}
                              size="sm"
                              target="_blank"
                              color="danger"
                              isIconOnly
                              onPress={onOpen}
                              onClick={() => deletePersonHandler(person)}
                              startContent={
                                <TrashIcon color={variables.white} />
                              }
                            />
                            <>
                              <Modal
                                placement="center"
                                isOpen={isOpen}
                                onOpenChange={onOpenChange}
                              >
                                <ModalContent>
                                  {(onClose) => (
                                    <>
                                      <ModalHeader className="flex flex-col gap-1 text-black">
                                        Are you sure?
                                      </ModalHeader>
                                      <ModalBody>
                                        <ModalDescription>
                                          You are about to delete the timeline
                                          for{" "}
                                          <b>
                                            {deletePerson?.firstName}{" "}
                                            {deletePerson?.lastName}
                                          </b>
                                          . This will delete all content and
                                          images from your account and is
                                          irreversible. Please click the Confirm
                                          Delete button to proceed.
                                        </ModalDescription>
                                      </ModalBody>
                                      <ModalFooter>
                                        <Button
                                          color="danger"
                                          variant="light"
                                          onPress={onClose}
                                        >
                                          Close
                                        </Button>
                                        <Button
                                          style={{
                                            color: variables.white,
                                            backgroundColor:
                                              "rgba(255, 0, 0, 0.8)",
                                          }}
                                          onClick={() =>
                                            deletePeopleHandler(person, index)
                                          }
                                          onPress={onClose}
                                        >
                                          Confirm Delete
                                        </Button>
                                      </ModalFooter>
                                    </>
                                  )}
                                </ModalContent>
                              </Modal>
                            </>
                          </CRUDBtns>
                        </div>
                      </div>
                    </>
                  );
                })}
              </PeopleFeedInnerContainer>
            ) : (
              <NoTimelineContainer>
                <p>No Timelines</p>
                <CreateButton />
              </NoTimelineContainer>
            )}
          </>
        )}
      </MainContainer>
    </>
  );
}

export default PeopleFeed;
