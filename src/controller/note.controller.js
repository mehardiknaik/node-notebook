import Note from '../model/note.model.js';
import User from '../model/user.model.js';

export const addNote = async (req, res) => {
  try {
    const { title, data } = req.body;
    const { userId } = req;
    const note = new Note({ title, data, userId });
    await note.save();
    await User.findByIdAndUpdate(userId, {
      $push: {
        notes: note._id,
      },
    });
    res.status(200).json({ message: 'Note successfully Added' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const note = async (req, res) => {
  try {
    const { userId } = req;
    const notes = await User.findById(userId, ['notes'])
      .populate('notes', null, null, { sort: { updatedAt: -1 } })
      .sort({ updatedAt: -1 });
    res.status(200).json({ notes });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req;
    const note = await Note.deleteOne({ _id: id, userId });
    if (note?.deletedCount) {
      await User.findByIdAndUpdate(userId, {
        $pull: {
          notes: id,
        },
      });
      return res.status(200).json({ message: 'updated succesfully' });
    }
    res.status(200).json({ message: 'something went Wrong' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id, ...update } = req.body;
    const note = await Note.updateOne({ _id: id }, update);
    if (note.modifiedCount)
      return res.status(200).json({ message: 'updated succesfully' });
    res.status(200).json({ message: 'something went Wrong' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const noteById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const note = await Note.findOne({ _id: id, userId }, ['-userId']);
    res.status(200).json({ note });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
