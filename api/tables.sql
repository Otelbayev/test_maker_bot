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
