import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function EditTitle() {
    const [newTitle, setNewTitle] = useState('');
    const router = useRouter();
    const NEXT_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newTitle) {
            await fetch(NEXT_URL + "/api/replies", {
                method: "POST",
                body: JSON.stringify({
                    title: newTitle,
                    date: new Date(),
                }),
            });
            router.push('/');
        }
    };

    return (
        <div className="container">
            <Head>
                <title>Edit Title</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="title">Edit Title</h1>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Enter new title"
                        className="titleInput"
                        rows={4}
                    />
                    <button type="submit" className="submitButton">
                        Update Title
                    </button>
                </form>
            </main>

            <style jsx>{`
                .container {
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                main {
                    padding: 5rem 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    max-width: 500px;
                }
                .title {
                    margin: 0 0 2rem;
                    line-height: 1.15;
                    font-size: 3rem;
                    text-align: center;
                }
                form {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .titleInput {
                    width: 100%;
                    padding: 0.5rem;
                    font-size: 1rem;
                    margin-bottom: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    resize: vertical;
                }
                .submitButton {
                    width: 100%;
                    padding: 0.75rem;
                    font-size: 1rem;
                    background-color: #0070f3;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .submitButton:hover {
                    background-color: #0051bb;
                }
                @media (max-width: 600px) {
                    .title {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </div>
    );
}