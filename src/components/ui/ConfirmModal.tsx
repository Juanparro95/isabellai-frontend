import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from "@/components/ui/dialog";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({
  isOpen,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="tw-fixed tw-inset-0 tw-z-40 tw-bg-black/50" />
      <DialogContent className="tw-fixed tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-1/2 tw--translate-y-1/2 tw-z-50 tw-max-w-md tw-w-full tw-p-6 tw-bg-white tw-rounded-lg tw-shadow-lg">
        <DialogHeader>
          <DialogTitle className="tw-text-xl tw-font-semibold tw-text-center">
            Eliminar usuario
          </DialogTitle>
        </DialogHeader>
        <p className="tw-text-center tw-text-gray-700 tw-mb-6">
          ¿Estás seguro de que deseas eliminar este usuario?
        </p>
        <DialogFooter className="tw-flex tw-justify-center tw-space-x-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="tw-px-6 tw-py-3 tw-rounded-lg tw-border tw-border-gray-300 tw-text-gray-700 hover:tw-bg-gray-100 tw-shadow-md tw-transition-all"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="tw-bg-red-500 tw-text-white tw-px-6 tw-py-3 tw-rounded-lg hover:tw-bg-red-600 tw-shadow-md tw-transition-all"
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
