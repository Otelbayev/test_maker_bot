import { pool } from "../config/db.js";

export const createTest = async (req, res) => {
  const {
    creator_id,
    title,
    subject,
    is_open,
    start_time,
    end_time,
    mcq_answers, // 1-35 gacha [ 'A', 'B', 'C'...]
    special_questions, // 36-45 gacha obyektlar [{type: 'written', count: 2, answer: 'a, b'}, {type: 'image'}]
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Testni asosiy jadvalga saqlash
    const testRes = await client.query(
      `INSERT INTO tests (creator_id, title, subject, is_open, start_time, end_time) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [creator_id, title, subject, is_open, start_time, end_time],
    );
    const testId = testRes.rows[0].id;

    // 2. 1-35 gacha savollarni saqlash (Multiple Choice)
    for (let i = 0; i < mcq_answers.length; i++) {
      await client.query(
        `INSERT INTO test_questions (test_id, question_number, question_type, correct_answer) 
                 VALUES ($1, $2, 'multiple_choice', $3)`,
        [testId, i + 1, mcq_answers[i]],
      );
    }

    // 3. 36-45 gacha savollarni saqlash (Yozma yoki Rasm)
    for (let i = 0; i < special_questions.length; i++) {
      const q = special_questions[i];
      await client.query(
        `INSERT INTO test_questions (test_id, question_number, question_type, correct_answer, written_answer_count) 
                 VALUES ($1, $2, $3, $4, $5)`,
        [testId, 36 + i, q.type, q.answer || null, q.count || 0],
      );
    }

    await client.query("COMMIT");
    res.status(201).json({ message: "Test muvaffaqiyatli yaratildi", testId });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).send("Server xatosi");
  } finally {
    client.release();
  }
};
