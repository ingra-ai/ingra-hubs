import React from "react";
import { FolderPlusIcon } from "lucide-react";
import { cn } from "@repo/shared/lib/utils";
import { MineCollectionMenuListGetPayload } from "./types";
import { Button } from "../../../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";

type ToggleCollectionMenuButtonProps = React.HTMLAttributes<HTMLDivElement> & {
  functionId: string;
  collections: MineCollectionMenuListGetPayload[];
  iconClassName?: string;
  onCheckedChange: (
    collectionId: string,
    functionId: string,
    checked: boolean,
  ) => void;
};

const ToggleCollectionMenuButton: React.FC<ToggleCollectionMenuButtonProps> = (
  props,
) => {
  const {
    functionId,
    collections,
    iconClassName = "h-4 w-4",
    onCheckedChange,
    ...divProps
  } = props;

  const handleCheckedChange = (collectionId: string, checked: boolean) => {
    if (typeof onCheckedChange === "function") {
      onCheckedChange(collectionId, functionId, checked);
    }
  };

  if (!collections.length) {
    return null;
  }

  const classes = cn("p-2", divProps.className),
    iconClasses = cn(iconClassName);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          title="Add or remove from collections"
        >
          <span className="sr-only">Open collections menu</span>
          <FolderPlusIcon className={iconClasses} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" {...divProps} className={classes}>
        <DropdownMenuLabel>Collections</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {collections.map((collection) => {
          const isSelected = collection.functions.some(
            (func) => func.id === functionId,
          );

          return (
            <DropdownMenuCheckboxItem
              key={collection.id}
              checked={isSelected}
              className="hover:bg-secondary hover:text-secondary-foreground cursor-pointer leading-6"
              onCheckedChange={(checked) =>
                handleCheckedChange(collection.id, checked)
              }
            >
              {collection.name}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ToggleCollectionMenuButton;