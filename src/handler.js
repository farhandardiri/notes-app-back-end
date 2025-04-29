const { nanoid } = require("nanoid");
const notes = require("./notes");

function addNotesHandler(req, h) {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    createdAt,
    updatedAt,
    id,
  };

  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const resp = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    resp.code(201);
    return resp;
  }
  const resp = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });
  resp.code(500);
  return resp;
}

function getAllNotesHandler() {
  return {
    status: "success",
    data: {
      notes,
    },
  };
}

function getNoteByIdHandler(req, h) {
  const { id } = req.params;
  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }
  const resp = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  resp.code(404);
  return resp;
}

function editNoteByIdHandler(req, h) {
  const { id } = req.params;
  const { title, tags, body } = req.payload;

  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const resp = h.response({
      status: "success",
      message: "Catatan berhasil diperbarui",
    });
    resp.code(200);
    return resp;
  }

  const resp = h.response({
    status: "fail",
    message: "Gagal memperbarui catatan. Id tidak ditemukan",
  });
  resp.code(404);
  return resp;
}

function deleteNoteByIdHandler(req, h) {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const resp = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    resp.code(200);
    return resp;
  }

  const resp = h.response({
    status: "fail",
    message: "Catatan gagal dihapus. Id tidak ditemukan",
  });
  resp.code(404);
  return resp;
}

module.exports = {
  addNotesHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
