import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import React from "react";

function ErrorFormMessage({ message }: { message: string }) {
  return (
    <div className="rounded-md">
      <div className="flex items-center gap-1">
        <ExclamationTriangleIcon
          className="h-4 w-4 text-red"
          aria-hidden="true"
        />
        <div className="text-xs text-red">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorFormMessage;
