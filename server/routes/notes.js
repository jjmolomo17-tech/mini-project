const express = require("express");
const supabase = require("../supabaseClient");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const { data } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", req.user.user_id);

  res.json(data);
});

router.post("/", auth, async (req, res) => {
  const { content } = req.body;

  const { data } = await supabase
    .from("notes")
    .insert([{ content, user_id: req.user.user_id }]);

  res.json(data);
});

router.put("/:id", auth, async (req, res) => {
  const { content } = req.body;

  const { data } = await supabase
    .from("notes")
    .update({ content })
    .eq("id", req.params.id);

  res.json(data);
});

router.delete("/:id", auth, async (req, res) => {
  const { data } = await supabase
    .from("notes")
    .delete()
    .eq("id", req.params.id);

  res.json(data);
});

module.exports = router;