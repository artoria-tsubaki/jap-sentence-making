export interface NotePointer {
  id?: number;
  type?: 'Sentence' | 'Grammar';
  title?: string;
  content?: string;
  note_id?: number;
}