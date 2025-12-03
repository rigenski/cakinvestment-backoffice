"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Icon } from "@iconify/react";
import { useRef } from "react";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function TiptapEditor({
  content,
  onChange,
  placeholder = "Tulis konten berita di sini...",
}: TiptapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[300px] p-4 prose prose-sm max-w-none",
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith("image/")) {
            event.preventDefault();
            const reader = new FileReader();
            reader.onload = (e) => {
              const src = e.target?.result as string;
              if (src) {
                const { schema } = view.state;
                const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
                if (coordinates) {
                  const node = schema.nodes.image.create({ src });
                  const transaction = view.state.tr.insert(coordinates.pos, node);
                  view.dispatch(transaction);
                }
              }
            };
            reader.readAsDataURL(file);
            return true;
          }
        }
        return false;
      },
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Convert image to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (src) {
        editor.chain().focus().setImage({ src }).run();
      }
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddLink = () => {
    if (!editor) return;

    const url = window.prompt("Enter URL:");
    if (url) {
      // Check if text is selected
      const { from, to } = editor.state.selection;
      const selectedText = editor.state.doc.textBetween(from, to);

      if (selectedText) {
        // If text is selected, make it a link
        editor.chain().focus().setLink({ href: url }).run();
      } else {
        // If no text selected, insert link with URL as text
        editor.chain().focus().insertContent(`<a href="${url}">${url}</a>`).run();
      }
    }
  };

  const handleRemoveLink = () => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg">
      {/* Toolbar */}
      <div className="border-b p-2 flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor.isActive("bold") ? "bg-primary text-primary-foreground" : ""
          }`}
        >
          <Icon icon="lucide:bold" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor.isActive("italic") ? "bg-primary text-primary-foreground" : ""
          }`}
        >
          <Icon icon="lucide:italic" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`p-2 rounded ${
            editor.isActive("strike") ? "bg-primary text-primary-foreground" : ""
          }`}
        >
          <Icon icon="lucide:strikethrough" className="h-4 w-4" />
        </button>
        <div className="w-px h-6 bg-border" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 1 })
              ? "bg-primary text-primary-foreground"
              : ""
          }`}
        >
          <Icon icon="lucide:heading-1" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-primary text-primary-foreground"
              : ""
          }`}
        >
          <Icon icon="lucide:heading-2" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 3 })
              ? "bg-primary text-primary-foreground"
              : ""
          }`}
        >
          <Icon icon="lucide:heading-3" className="h-4 w-4" />
        </button>
        <div className="w-px h-6 bg-border" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor.isActive("bulletList")
              ? "bg-primary text-primary-foreground"
              : ""
          }`}
        >
          <Icon icon="lucide:list" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${
            editor.isActive("orderedList")
              ? "bg-primary text-primary-foreground"
              : ""
          }`}
        >
          <Icon icon="lucide:list-ordered" className="h-4 w-4" />
        </button>
        <div className="w-px h-6 bg-border" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${
            editor.isActive("blockquote")
              ? "bg-primary text-primary-foreground"
              : ""
          }`}
        >
          <Icon icon="lucide:quote" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded"
        >
          <Icon icon="lucide:minus" className="h-4 w-4" />
        </button>
        <div className="w-px h-6 bg-border" />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded"
          title="Insert Image"
        >
          <Icon icon="lucide:image" className="h-4 w-4" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={handleAddLink}
          className={`p-2 rounded ${
            editor.isActive("link")
              ? "bg-primary text-primary-foreground"
              : ""
          }`}
          title="Add Link"
        >
          <Icon icon="lucide:link" className="h-4 w-4" />
        </button>
        {editor.isActive("link") && (
          <button
            type="button"
            onClick={handleRemoveLink}
            className="p-2 rounded"
            title="Remove Link"
          >
            <Icon icon="lucide:unlink" className="h-4 w-4" />
          </button>
        )}
        <div className="w-px h-6 bg-border" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded"
        >
          <Icon icon="lucide:undo" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded"
        >
          <Icon icon="lucide:redo" className="h-4 w-4" />
        </button>
      </div>
      {/* Editor Content */}
      <div className="[&_.ProseMirror]:prose [&_.ProseMirror]:prose-sm [&_.ProseMirror]:max-w-none">
        <EditorContent editor={editor} />
      </div>
      <style jsx global>{`
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
          cursor: pointer;
        }
        .ProseMirror img:hover {
          opacity: 0.9;
        }
        .ProseMirror a {
          color: var(--primary);
          text-decoration: underline;
          cursor: pointer;
        }
        .ProseMirror a:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

