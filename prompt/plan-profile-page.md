# PEMBUATAN HALAMAN PROFILE
## Overview
Halaman ini adalah halaman profile user yang akan menampilkan identitas user seperti foto profil, nama, email dan lain-lain. 

## Problem
Karena adanya foto profile, haruskah saya memperbarui kolom di tabel user agar user bisa upload foto profile?, saat ini isi kolom dari tabel user adalah:
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY, 
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    dob DATE, 
    gender VARCHAR(20),
    place_of_birth VARCHAR(100),
    occupation VARCHAR(100),
    address TEXT,
    risk_score INTEGER NOT NULL DEFAULT 0,
    risk_profile VARCHAR(50) CHECK (risk_profile IN ('turtle', 'hippo', 'capybara', 'wolf', 'lion')), 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
```
kolom kolom yang memang bersifat opsional adalah kolom: 
- last_name
- dob
- gender
- place_of_birth
- occupation
- address
- risk_profile
- risk_score

jadi untuk di UI nya nanti tolong diberi warna merah jika kolom tersebut kosong

## Design UI
Untuk design UI saya rasa kamu sudah bisa melihat dari gambar yang saya kirim ya, jadi silahkan ikuti design UI tersebut dan kalau bisa dibuat lebih bagus lagi, mungkin kamu bisa menambahkan tombol untuk upload foto profile

## Backend
Silakan analisis file di folder backend yang berkaitan dengan user seperti controllers, models, routes, services dan lain-lain

## Frontend
Buatkan untuk halaman profile user di dalam features/profile 