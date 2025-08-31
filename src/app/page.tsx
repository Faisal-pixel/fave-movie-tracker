"use client";
import { useEffect } from "react";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home() {
  async function* generator() {
    yield "first";
    yield "second";
    yield "third";
  }

  const gen = generator();

  (async () => {
    for await (const n of gen) {
      console.log(n);
    }
  })();

  async function* numbers() {
    yield 1;
    yield 2;
    yield 3;
  }

  (async () => {
    for await (const n of numbers()) {
      console.log(n);
    }
  })();

  useEffect(() => {
    async function* getShows() {
      for (let page = 0; ; page++) {
        const res = await fetch(`${BASE_URL}/shows?page=${page}`);
        if (res.status === 404) break; // means we have gotten to the end of the lists of shows
        if (!res.ok) throw new Error(`TVMaze error ${res.status}`);
        const shows = await res.json();
        yield shows;
      }
    }

    (async () => {
      for await (const n of getShows()) {
        console.log(n.length);
        break;
      }
    })();
  }, []);
  return <>This is landing page.</>;
}
