import { AnimatePresence, motion } from "framer-motion";
import { Alert, AlertDescription } from "./alert";
import { CircleX } from "lucide-react";

type Props = {
  condition: string | boolean;
  message: string;
  onClose: (value: string) => void;
};

export default function ErrorAlert({ condition, message, onClose }: Props) {
  return (
    <AnimatePresence>
      {condition && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
        >
          <Alert className="rounded-md bg-red-400 px-3 py-2 text-xl text-white ">
            <AlertDescription className="flex items-center justify-between">
              {message} <CircleX size={20} onClick={() => onClose("")} />
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
