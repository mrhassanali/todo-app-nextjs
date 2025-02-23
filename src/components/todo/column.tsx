"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Todo } from "@prisma/client";
import { AddEditTodo } from "./add-edit-todo";
import { deleteTodo } from "@/actions/todo";

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "completed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Completed
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {row.getValue("completed") ? "True" : "false"}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <AddEditTodo
            todo={row.original}
            trigger={
              <Button variant="default" className="ml-auto">
                Edit Todo
              </Button>
            }
          />
          <Button
            variant="destructive"
            className="ml-auto"
            onClick={() => deleteTodo(row.original.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
