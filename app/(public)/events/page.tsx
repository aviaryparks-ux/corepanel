import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default async function Page() {
  const snap = await getDocs(collection(db, "events"));
  const data = snap.docs.map((d) => d.data());

  return (
    <div style={{ padding: 20 }}>
      <h1>Events</h1>

      {data.map((e: any, i) => (
        <div key={i}>{e.title}</div>
      ))}
    </div>
  );
}