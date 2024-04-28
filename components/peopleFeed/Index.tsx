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
    <MainContainer>
      {isLoading ? (
        <HourGlassContainer>
          <HourGlassLottieLoading />
        </HourGlassContainer>
      ) : (
        <>
          <PeopleFeedInnerContainer>
            {peopleData &&
            peopleData.userData &&
            peopleData.userData.length > 0 ? (
              peopleData.userData.map((person, index) => {
                const { firstName, lastName, slug, dob, mainImage, theme } =
                  person;

                return (
                  <Card key={index} className="py-4 h-auto w-full">
                    <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-start">
                      <h4 className="font-bold">
                        {firstName} {lastName}
                      </h4>
                      <small className="text-default-500">
                        Birthday: {formatDate(dob)}
                      </small>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 w-full">
                      <Image
                        alt="Card background"
                        className="object-cover rounded-xl h-40 w-full"
                        src={mainImage}
                        width={500}
                      />
                    </CardBody>
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
                        startContent={<ExternalIcon color={variables.white} />}
                      />
                      <Button
                        style={{
                          color: variables.white,
                          backgroundColor: "rgba(255, 180, 0, 0.8)",
                        }}
                        size="sm"
                        isIconOnly
                        startContent={<EditIcon color={variables.white} />}
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
                        startContent={<TrashIcon color={variables.white} />}
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
                                    You are about to delete the timeline for{" "}
                                    <b>
                                      {deletePerson?.firstName}{" "}
                                      {deletePerson?.lastName}
                                    </b>
                                    . This will delete all content and images
                                    from your account and is irreversible.
                                    Please click the Confirm Delete button to
                                    proceed.
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
                                      backgroundColor: "rgba(255, 0, 0, 0.8)",
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
                  </Card>
                );
              })
            ) : (
              <NoTimelineContainer>
                <p>No Timelines</p>
                <CreateButton />
              </NoTimelineContainer>
            )}
          </PeopleFeedInnerContainer>
        </>
      )}
    </MainContainer>
  );
}

export default PeopleFeed;
