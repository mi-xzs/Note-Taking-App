import type { NoteData, Tag } from "./App";
import { NoteForm } from "./NoteForm";
import { useNote } from "./NoteLayout";
import  Styles  from "./Newnote.module.css";


type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function EditNote({onSubmit, onAddTag, availableTags} : 
  EditNoteProps) {
  const note = useNote()
  return (
  <>
  <h1 className={Styles.newtitle}>Edit Note</h1>
  <NoteForm 
  title = {note.title}
  markdown = {note.markdown}
  tags = {note.tags}
  onSubmit={(data) => onSubmit(note.id, data)} 
  onAddTag={onAddTag} 
  availableTags={availableTags} />
  </>
  );
}

