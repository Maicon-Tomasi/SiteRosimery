"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Paperclip, X } from "lucide-react";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
}

const FileUploader = ({ onFilesSelected }: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
    onFilesSelected([...files, ...acceptedFiles]);
  }, [files, onFilesSelected]);

  const removeFile = (file: File) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true
  });

  return (
    <div className="mt-2">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-4 text-center transition-colors ${
          isDragActive ? "border-yellow-500 bg-yellow-50" : "border-slate-300"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-slate-600">
          {isDragActive
            ? "Solte os arquivos aqui..."
            : "Arraste arquivos aqui ou clique para selecionar"}
        </p>
      </div>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex justify-between items-center text-sm border p-2 rounded-md"
            >
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-slate-500" />
                {file.name}
              </div>
              <button
                onClick={() => removeFile(file)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
