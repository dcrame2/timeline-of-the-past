import React, { createContext, useContext, useState } from "react";

type FileUploadContextType = {
  imageSrcs: string[];
  setImageSrcs: React.Dispatch<React.SetStateAction<string[]>>;
};

const FileUploadContext = createContext<FileUploadContextType>({
  imageSrcs: [],
  setImageSrcs: () => {},
});

export const useFileUpload = () => useContext(FileUploadContext);

export const FileUploadProvider: React.FC = ({ children }: any) => {
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);

  return (
    <FileUploadContext.Provider value={{ imageSrcs, setImageSrcs }}>
      {children}
    </FileUploadContext.Provider>
  );
};
