import React from "react";
import CloseButton from "@theme-original/AnnouncementBar/CloseButton";
import { createStorageSlot } from "@docusaurus/theme-common";
import { DISMISSED_AT_STORAGE_KEY } from "../dismissExpiry";

type Props = React.ComponentProps<"button">;

const DismissedAtStorage = createStorageSlot(DISMISSED_AT_STORAGE_KEY);

// Records when the announcement bar was closed, so that it can be shown again after a while.
export default function CloseButtonWrapper(props: Props): JSX.Element {
  return (
    <CloseButton
      {...props}
      onClick={(event) => {
        DismissedAtStorage.set(String(Date.now()));
        props.onClick?.(event);
      }}
    />
  );
}
