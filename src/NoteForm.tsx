import { Form, Row, Stack, Col, Button } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import type { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";
import styles from "./NoteForm.module.css";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  }

  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label className={styles.label}>Title</Form.Label>
              <Form.Control
                ref={titleRef}
                required
                defaultValue={title}
                className={styles.input}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label className={styles.label}>Tags</Form.Label>
              <CreatableSelect
                isMulti
                value={selectedTags.map((tag) => ({ label: tag.label, value: tag.id }))}
                options={availableTags.map((tag) => ({ label: tag.label, value: tag.id }))}
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                onChange={(tags) =>
                  setSelectedTags(
                    (tags || []).map((tag) => ({ label: tag.label, id: tag.value }))
                  )
                }
                className={styles.select}
                classNamePrefix="react-select"
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

        <Form.Group controlId="markdown">
          <Form.Label className={styles.label}>Body</Form.Label>
          <Form.Control
            ref={markdownRef}
            as="textarea"
            rows={15}
            required
            defaultValue={markdown}
            className={styles.textarea}
          />
        </Form.Group>

        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" className={styles.button}>
            Save
          </Button>
          <Link to=".." className={styles.button}>
            Cancel
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}