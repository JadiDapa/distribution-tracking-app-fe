import { Upload, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { FormControl, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

type Props = {
  pictureUrl?: string | null;
  handlePicture: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePicture: () => void;
};

export default function ToolImageForm({
  handlePicture,
  pictureUrl,
  removePicture,
}: Props) {
  return (
    <div className="box-shadow flex flex-col gap-6 rounded-md bg-white p-6">
      <h2 className="text-xl font-medium ">Tool Image (optional)</h2>
      {pictureUrl ? (
        <div className="relative flex h-60 w-full flex-col rounded-md border-[3px] border-dashed">
          <div className="h-5/6 w-full items-center justify-center p-1 ">
            <img
              src={pictureUrl}
              className="max-h-full border-2 border-double p-1"
              alt=""
            />
          </div>
          <div
            onClick={removePicture}
            className="flex w-full cursor-pointer items-center justify-end gap-2 p-2 text-red-400"
          >
            <XCircle size={18} />
            <span className="text-lg font-medium">Remove File</span>
          </div>
        </div>
      ) : (
        <div className="relative flex h-60 w-full flex-col items-center justify-center rounded-md border-[3px] border-dashed">
          <div className="flex size-12 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <Upload size={28} strokeWidth={1.75} />
          </div>
          <div className="mt-8 flex flex-col items-center gap-2 text-center">
            <div className="max-w-80 text-2xl text-muted-foreground">
              Drop material image here
            </div>
            <div className="text-xl text-slate-400">Or</div>
            <Button type="button" className="max-w-fit bg-sky-100 text-primary">
              Browse Image
              <FormLabel className="absolute left-0 top-0 h-full w-full border opacity-0">
                SMTH
              </FormLabel>
              <FormControl>
                <Input
                  className="absolute left-0 top-0 opacity-0"
                  type="file"
                  onChange={handlePicture}
                />
              </FormControl>
              file
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
