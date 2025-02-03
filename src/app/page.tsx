"use client";

import { useUsersStore } from "@/src/store/useUsersStore";
import { useState, useEffect } from "react";
import { User, userSchema, UserFormData } from "@/src/types/user";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Trash } from "lucide-react";
import { useModalStore } from "@/src/store/useModalStore";
import ConfirmModal from "@/src/components/ui/ConfirmModal";

export default function Home() {
  const { users, fetchUsers, createUser, updateUser, deleteUser } =
    useUsersStore();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { isOpen, openModal, closeModal, onConfirm } = useModalStore();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (selectedUser) {
      setValue("name", selectedUser.name);
      setValue("email", selectedUser.email);
    } else {
      reset();
    }
  }, [selectedUser, setValue, reset]);

  const onSubmit = async (data: UserFormData) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, data);
        toast.success("Usuario actualizado exitosamente");
      } else {
        await createUser(data);
        toast.success("Usuario creado exitosamente");
      }
      setOpen(false);
      reset();
    } catch (error) {
      toast.error("Hubo un error al procesar el usuario");
      console.error("Error en el usuario", error);
    }
  };

  return (
    <div className="tw-max-w-6xl tw-mx-auto tw-py-10">
      <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-mb-6">
        Lista de Usuarios
      </h1>

      <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <Input
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="tw-w-3/4 tw-p-3 tw-border tw-border-gray-300 tw-rounded-lg tw-focus:ring-2 tw-focus:ring-blue-500"
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="tw-bg-blue-500 tw-text-white tw-rounded-md tw-px-5 tw-py-2 hover:tw-bg-blue-600">
              Nuevo Usuario
            </Button>
          </DialogTrigger>

          <DialogOverlay className="tw-fixed tw-inset-0 tw-z-40 tw-bg-black/50" />
          <DialogContent className="tw-fixed tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-1/2 tw--translate-y-1/2 tw-z-50 tw-max-w-md tw-w-full tw-p-6 tw-bg-white tw-rounded-lg tw-shadow-lg">
            <DialogHeader>
              <DialogTitle className="tw-text-xl tw-font-semibold tw-text-center">
                {selectedUser ? "Editar Usuario" : "Crear Usuario"}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="tw-text-gray-500 tw-text-center tw-mb-4">
              {selectedUser
                ? "Edita la información del usuario."
                : "Ingresa los datos para un nuevo usuario."}
            </DialogDescription>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="tw-grid tw-gap-4 tw-py-4">
                <div className="tw-grid tw-grid-cols-4 tw-items-center tw-gap-4">
                  <Label htmlFor="name" className="tw-text-right">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    className="tw-col-span-3 tw-p-2 tw-border tw-border-gray-300 tw-rounded-lg"
                  />
                  {errors.name && (
                    <p className="tw-col-span-4 tw-text-red-500 tw-text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="tw-grid tw-grid-cols-4 tw-items-center tw-gap-4">
                  <Label htmlFor="email" className="tw-text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    {...register("email")}
                    className="tw-col-span-3 tw-p-2 tw-border tw-border-gray-300 tw-rounded-lg"
                  />
                  {errors.email && (
                    <p className="tw-col-span-4 tw-text-red-500 tw-text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="tw-grid tw-grid-cols-4 tw-items-center tw-gap-4">
                  <Label htmlFor="password" className="tw-text-right">
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="tw-col-span-3 tw-p-2 tw-border tw-border-gray-300 tw-rounded-lg"
                    placeholder="******"
                  />
                  {errors.password && (
                    <p className="tw-col-span-4 tw-text-red-500 tw-text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <DialogFooter className="tw-flex tw-justify-center">
                <Button
                  type="submit"
                  className="tw-bg-blue-500 tw-text-white hover:tw-bg-blue-600 tw-px-6 tw-py-2 tw-rounded-md tw-transition"
                >
                  {selectedUser ? "Actualizar" : "Crear"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table className="tw-w-full tw-rounded-lg tw-shadow-lg tw-bg-white">
        <TableHeader className="tw-bg-gray-50 tw-text-gray-700 tw-border-b">
          <TableRow>
            <TableHead className="tw-px-6 tw-py-3 tw-font-semibold">
              Nombre
            </TableHead>
            <TableHead className="tw-px-6 tw-py-3 tw-font-semibold">
              Email
            </TableHead>
            <TableHead className="tw-px-6 tw-py-3 tw-font-semibold tw-text-right">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.id}
              className="tw-hover:bg-gray-100 tw-transition-all tw-duration-300"
            >
              <TableCell className="tw-px-6 tw-py-4">{user.name}</TableCell>
              <TableCell className="tw-px-6 tw-py-4">{user.email}</TableCell>
              <TableCell className="tw-px-6 tw-py-4 tw-text-right tw-space-x-2">
                <Button
                  onClick={() => {
                    setSelectedUser(user as User);
                    setOpen(true);
                  }}
                  className="tw-bg-transparent tw-p-2 tw-rounded-full tw-border tw-border-gray-300 tw-hover:bg-yellow-100 tw-transition-all"
                >
                  <Edit className="tw-w-5 tw-h-5 tw-text-yellow-500 hover:tw-text-yellow-600" />
                </Button>

                <Button
                  onClick={() =>
                    openModal(() => {
                      deleteUser(user.id as User["id"]);
                      closeModal();
                    })
                  }
                  className="tw-bg-transparent tw-p-2 tw-rounded-full tw-border tw-border-gray-300 tw-hover:bg-red-100 tw-transition-all"
                >
                  <Trash className="tw-w-5 tw-h-5 tw-text-red-500 hover:tw-text-red-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmModal
        isOpen={isOpen}
        onConfirm={onConfirm ?? (() => {})}
        onClose={closeModal}
      />
    </div>
  );
}
