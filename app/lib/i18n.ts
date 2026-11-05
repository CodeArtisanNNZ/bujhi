"use client";

import {useEffect,useState} from "react";
import type {NctbBook,StudentClassKey} from "../data/nctbBooks";

export type BujhiLanguage="en"|"bn";

// The Bangla and English language textbooks retain their official names.
// Other subjects can be displayed in either language without changing PDF sources.
const originalLanguageBooks=new Set([
  "charupath","anandapath","sahitya-kanika","bangla-grammar",
  "bangla-literature","bangla-sahapath","bangla-language-grammar",
  "english-for-today","english-grammar"
]);

export function isOriginalLanguageBook(book:Pick<NctbBook,"id">){
  return originalLanguageBooks.has(book.id)||book.id.startsWith("bangla-")||book.id.startsWith("english-");
}

export function localizedBookTitle(book:Pick<NctbBook,"id"|"title"|"englishTitle">,lang:BujhiLanguage){
  return isOriginalLanguageBook(book)?book.title:(lang==="bn"?book.title:book.englishTitle);
}

const classNamesBn:Record<StudentClassKey,string>={
  "6":"ষষ্ঠ শ্রেণি","7":"সপ্তম শ্রেণি","8":"অষ্টম শ্রেণি","9-10":"নবম–দশম শ্রেণি"
};
const classNamesEn:Record<StudentClassKey,string>={
  "6":"Class 6","7":"Class 7","8":"Class 8","9-10":"Classes 9–10"
};
export function localizedClassName(key:StudentClassKey,lang:BujhiLanguage){
  return lang==="bn"?classNamesBn[key]:classNamesEn[key];
}

export function useBujhiLanguage():BujhiLanguage{
  const[language,setLanguage]=useState<BujhiLanguage>("en");
  useEffect(()=>{
    const sync=()=>setLanguage(document.documentElement.lang==="bn"?"bn":"en");
    sync();
    window.addEventListener("bujhi-language-changed",sync);
    return()=>window.removeEventListener("bujhi-language-changed",sync);
  },[]);
  return language;
}
