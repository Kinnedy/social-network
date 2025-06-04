// models/Thought.ts
import { Schema, model, Document } from 'mongoose';
import { reactionSchema } from './schemas/reactionSchema';

export interface IThought extends Document {
  thoughtText: string;
  username: string;
  createdAt?: Date;
  reactions: typeof reactionSchema[];
  reactionCount?: number;
}

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) =>
        new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }).format(timestamp),
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);
export default Thought;
