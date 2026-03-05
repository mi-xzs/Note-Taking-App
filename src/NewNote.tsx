import type { NoteData, Tag } from "./App";
import { NoteForm } from "./NoteForm";
import  Styles  from "./Newnote.module.css";


type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NewNote({onSubmit, onAddTag, availableTags} : NewNoteProps) {
  return (
  <>
  <h1 className={Styles.newtitle}>New Note</h1>
  <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
  </>
  );
}