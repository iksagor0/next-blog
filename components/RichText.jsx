import JoditEditor from "jodit-react";
import { useRef } from "react";
// const Jodit = dynamic(() => import("./Jodit"), { ssr: false });

// interface formObject {
//   title: string;
//   shortDes: string;
//   description: string;
//   category: string;
// }

// type formAndFunc = {
//   form: formObject;
//   setForm: any;
// };

export default function RichText({ form, setForm }: formAndFunc) {
  const editor = useRef(null);

  const handleRichText = (content: any) => {
    setForm({ ...form, description: content });
  };

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <JoditEditor
      ref={editor}
      value={form.description}
      // config={config}
      tabIndex={1} // tabIndex of textarea
      onChange={(content) => handleRichText(content)}
    />
  );
}
