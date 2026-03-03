import { Button, Col, Row, Stack , Form, Card , Badge, Modal} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import type { Tag } from "./App";
import { useMemo, useState } from "react";
import styles from "./NoteList.module.css"




type NoteListProps = {
  availableTags: Tag[]
  notes: SimplifiedNote[]
  onDeleteTag: (id: string) => void;
  onUpdateTag : (id: string, label: string) => void;
}

type SimplifiedNote = {
  id: string;
  title: string;
  tags: Tag[];
} 

type EditTagsModalProps = {
  availableTags: Tag[];
  handleClose: () => void;
  show: boolean;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
} 

export function NoteList({ availableTags, notes, onDeleteTag, onUpdateTag }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter(note => 
      (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
      (selectedTags.length === 0 || selectedTags.every(tag =>
        note.tags.some(noteTag => noteTag.id === tag.id)
      ))
    );
  }, [title, selectedTags, notes]);

  const tagOptions = useMemo(() => 
    availableTags.map(tag => ({ label: tag.label, value: tag.id })), 
    [availableTags]
  );

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col><h1>Notes</h1></Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button  onClick={() => setEditTagsModalIsOpen(true)} variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>

      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map(tag => ({ label: tag.label, value: tag.id }))}
                options={tagOptions}
                onChange={tags => setSelectedTags(
                  (tags as {label: string; value: string}[] || []).map(tag => ({
                    label: tag.label,
                    id: tag.value
                  }))
                )}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard title={note.title} tags={note.tags} id={note.id} />
          </Col>
        ))}
      </Row>
      <EditTagsModal onUpdateTag={onUpdateTag} onDeleteTag={onDeleteTag} availableTags={availableTags} show={editTagsModalIsOpen} handleClose={() => setEditTagsModalIsOpen(false)} />
    </>
  );
}

function NoteCard({ id, title, tags}: SimplifiedNote) {
    return <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
      <Card.Body>
        <Stack gap={2} className="align-items-center justify-content-center h-100">
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
              {tags.map(tag => (
                <Badge key={tag.id} className="text-truncate">{tag.label}</Badge>
              ))}
            </Stack>

          )}
        </Stack>
        
      </Card.Body>
    </Card>
}


function EditTagsModal({ availableTags, handleClose, show, onUpdateTag, onDeleteTag}: EditTagsModalProps) {
  return <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Tags</Modal.Title>
    </Modal.Header> 
    <Modal.Body> 
      <Form>  
        <Stack gap={2}>
          { availableTags.map(tag => (
            <Row key={tag.id}>
              <Col><Form.Control type="text" value={tag.label} onChange={(e) => onUpdateTag(tag.id, e.target.value)} /></Col>
              <Col xs="auto">
                <Button onClick={() => onDeleteTag(tag.id)} variant="outline-danger">&times;</Button>
              </Col>
            </Row>
          ))}
        </Stack>
      </Form>
    </Modal.Body>
  </Modal>
}