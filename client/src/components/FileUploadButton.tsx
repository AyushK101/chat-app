import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import React, { useRef } from "react";

const FileUploadButton = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="file"
        ref={inputRef}
        className="hidden" // hide the native file input
        onChange={handleFileChange}
        accept="image/*,video/*"
      />
      <Button
        type="button"
        variant="outline"
        className="flex items-center gap-1"
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="w-4 h-4" />
        Upload Media
      </Button>
    </div>
  );
};

export default FileUploadButton;
