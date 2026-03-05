import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import styles from "./Note.module.css";

type NoteProps = {
  onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>{note.title}</h1>
          {note.tags.length > 0 && (
            <div className={styles.badgeStack}>
              {note.tags.map((tag) => (
                <span key={tag.id} className={styles.badge}>
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <Link to={`/${note.id}/edit`}>
            <button className={styles.button}>Edit</button>
          </Link>
          <button
            onClick={() => { onDelete(note.id); navigate("/"); }}
            className={`${styles.button} ${styles.deleteButton}`}
          >
            Delete
          </button>
          <Link to="/">
            <button className={`${styles.button} ${styles.backButton}`}>Back</button>
          </Link>
        </div>
      </div>

      <div className={styles.markdown}>
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
      </div>
    </div>
  );
}