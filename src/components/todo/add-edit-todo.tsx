import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { addTodo, updateTodo } from "@/actions/todo";
import { Todo } from "@prisma/client";


interface AddEditTodoProps {
  todo?: Todo;
  trigger: React.ReactNode;
}

export function AddEditTodo({ todo, trigger }: AddEditTodoProps) {
  const [title, setTitle] = useState(todo?.title || "");
  const [completed, setCompleted] = useState(todo?.completed || false);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo?.id) {
      updateTodo(todo.id, title, completed);
    } else {
      addTodo(title, completed);
    }
    setTitle("");
    setCompleted(false);
    setOpen(false);
  };

  const isEdit = !!todo?.id;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Todo" : "Add Todo"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="completed" className="text-right">
                Completed
              </Label>
              <div className="col-span-3">
                <Checkbox
                  id="completed"
                  defaultChecked={completed}
                  checked={completed}
                  onCheckedChange={(checked) =>
                    setCompleted(checked as boolean)
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {isEdit ? "Save changes" : "Add Todo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
