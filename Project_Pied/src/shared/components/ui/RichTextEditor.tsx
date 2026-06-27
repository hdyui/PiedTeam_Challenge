import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import css của theme snow

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Nhập nội dung tại đây...",
}: RichTextEditorProps) => {
  // Cấu hình các thanh công cụ (Toolbar)
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="rich-text-container bg-white rounded-md">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        className="h-64 mb-12" // Chiều cao mặc định để không bị quá lùn
      />
    </div>
  );
};
