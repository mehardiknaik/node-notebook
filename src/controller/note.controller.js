import Note from "../model/note.model.js";

export const addNote = async (req, res) => {
  try {
    const { title, data } = req.body;
    const { userId } = req;
    let note = await new Note({ title, data, userId });
    await note.save();
    res.status(200).json({ message: "Note successfully Added" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const note = async (req, res) => {
  try {
    const { userId } = req;
    let note = await Note.find({ userId }, [
      "_id",
      "data",
      "title",
      "updatedAt",
    ]).sort({ updatedAt: -1 });
    res.status(200).json({ note });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req;
    let note = await Note.deleteOne({ _id: id, userId });
    if (note.deletedCount) return res.status(200).json({ message: "updated succesfully" });
    res.status(200).json({ message: "something went Wrong" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id, ...update } = req.body
    let note = await Note.updateOne({ _id: id }, update)
    if (note.modifiedCount) return res.status(200).json({ message: "updated succesfully" });
    res.status(200).json({ message: "something went Wrong" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
