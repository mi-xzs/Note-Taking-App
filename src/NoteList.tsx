import { Button, Col, Row, Stack, Form, Card, Modal , Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import type { Tag } from "./App";
import { useMemo, useState } from "react";
import styles from "./NoteList.module.css";


type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

type SimplifiedNote = {
  id: string;
  title: string;
  tags: Tag[];
};

type EditTagsModalProps = {
  availableTags: Tag[];
  handleClose: () => void;
  show: boolean;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};


export function NoteList({ availableTags, notes, onDeleteTag, onUpdateTag }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
    );
  }, [title, selectedTags, notes]);

  const tagOptions = useMemo(
    () => availableTags.map((tag) => ({ label: tag.label, value: tag.id })),
    [availableTags]
  );

  return (
    <>
      <header className={styles.heading}>NOTES</header>

      <Form className={styles.form}>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label className={styles.label}>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label className={styles.label}>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => ({ label: tag.label, value: tag.id }))}
                options={tagOptions}
                onChange={(tags) =>
                  setSelectedTags(
                    (tags as { label: string; value: string }[] || []).map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  )
                }
                isMulti
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: '#323530',
                    border: 'none',
                    borderRadius: '0.25rem',
                    fontSize: '18px',
                    padding: '2px',
                    '&:hover': {
                      borderColor: '#88857d',
                    },
                    boxShadow: state.isFocused ? '0 0 0 2px #88857d' : 'none',
                  }),
                  input: (base) => ({
                    ...base,
                    color: 'white',
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: 'white',
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: '#323530',
                  }),
                  option: (base) => ({
                    ...base,
                    backgroundColor: '#323530',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#555753',
                    },
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: '#555753',
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: 'white',
                  }),
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Container className={styles.container}>
        <Row className="buttons-row">
          <Col className="d-flex justify-content-end">
            <Stack gap={2} direction="horizontal">
              <Link to="/new">
                <Button className={styles.button}>Create</Button>
              </Link>
              <Button
                onClick={() => setEditTagsModalIsOpen(true)}
                className={styles.button}>Edit Tags
              </Button>
            </Stack>
          </Col>
        </Row>
      </Container>

      <div className={styles.notesContainer}>
        {filteredNotes.length === 0 ? (
          <p className={styles.emptyMessage}>{"- ".repeat(8)}No notes currently{"- ".repeat(8)}</p>
        ) : (
          <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
            {filteredNotes.map((note) => (
              <Col key={note.id}>
                <NoteCard title={note.title} tags={note.tags} id={note.id} />
              </Col>
            ))}
          </Row>
        )}
      </div>

      <EditTagsModal
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
        availableTags={availableTags}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
      />
    </>
  );
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Card as={Link} to={`/${id}`} className={`${styles.card}`}>
      <Card.Body className={styles.cardBody}>
        <Stack gap={2}>
          <span>{title}</span>
          {tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className={styles.badgeStack}>
              {tags.map((tag) => (
                <span key={tag.id} className={styles.badge}>
                  {tag.label}
                </span>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onUpdateTag,
  onDeleteTag,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose} className={styles.modal}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                    className={styles.input}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    onClick={() => onDeleteTag(tag.id)}
                    className={styles.deleteButton}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}