CREATE TABLE users (
    id SERIAL PRIMARY KEY,           
    chat_id BIGINT UNIQUE NOT NULL,  
    username VARCHAR(50),            
    first_name VARCHAR(50), 
    last_name VARCHAR(50),          
    role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'teacher', 'student')), -- Rol
    created_at TIMESTAMP DEFAULT NOW(), 
    updated_at TIMESTAMP DEFAULT NOW()  
);


-- Testning umumiy ma'lumotlari
CREATE TABLE tests (
    id SERIAL PRIMARY KEY,
    creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL, -- Test nomi
    subject VARCHAR(100) NOT NULL, -- Fanni tanlash
    is_open BOOLEAN DEFAULT TRUE, -- Ochiq yoki Yopiq test
    start_time TIMESTAMP, -- Boshlanish vaqti
    end_time TIMESTAMP,   -- Tugash vaqti
    created_at TIMESTAMP DEFAULT NOW()
);

-- Test savollari va to'g'ri javoblar
CREATE TABLE test_questions (
    id SERIAL PRIMARY KEY,
    test_id INTEGER REFERENCES tests(id) ON DELETE CASCADE,
    question_number INTEGER NOT NULL, -- 1 dan 45 gacha tartib raqami
    question_type VARCHAR(20) NOT NULL, -- 'multiple_choice', 'written', 'image'
    correct_answer TEXT, -- ABCDEF variantlar yoki yozma javob matni
    written_answer_count INTEGER DEFAULT 0 -- 36-45 savollar uchun javoblar soni
);