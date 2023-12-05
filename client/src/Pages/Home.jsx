import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlashcards } from "../redux/flashcards/flashcardsSlice";


export default function Home() {

  const {currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getFlashcards(currentUser))
  },[])
  return (
    <section className="h-screen bg-slate-100">

    </section>
  );
}
