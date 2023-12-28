import { NoteAPI } from "api/note-api";
import { NoteForm } from "components/NoteForm/NoteForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNote, updateNote } from "store/note/note-slice";

export function Note(props) {
  const { noteId } = useParams();
  const note = useSelector((store) =>
    store.NOTE.noteList.find((note) => note.id === noteId)
  );
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submit(formValues) {
    const updatedNote = await NoteAPI.update({ ...formValues, id: noteId });
    dispatch(updateNote(updatedNote));
    setIsEditable(false);
  }

  async function remove() {
    const deletedNote = await NoteAPI.deleteById(noteId.toString());
    dispatch(deleteNote(deletedNote));
    navigate("/");
  }

  return (
    <>
      {note && (
        <NoteForm
          isEditable={isEditable}
          title={isEditable ? "Edit note" : note.title}
          onClickEdit={() => {
            setIsEditable(!isEditable);
          }}
          onClickTrash={remove}
          note={note}
          onSubmit={isEditable && submit}
        />
      )}
    </>
  );
}
