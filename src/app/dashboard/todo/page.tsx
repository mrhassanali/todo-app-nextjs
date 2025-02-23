import { getAllTodo } from "@/actions/todo";
import { DataTable } from "@/components/todo/table";
import { Todo } from "@prisma/client";
import React from "react";

export const dynamic = "force-dynamic";

const page: React.FC = async () => {
  const todoList = (await getAllTodo()) as Todo[];

  return (
    <>
      <DataTable data={todoList} />
    </>
  );
};

export default page;