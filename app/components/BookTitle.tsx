"use client";
import {useLanguage} from "./useLanguage";
import {bookTitle} from "../i18n";
import type {NctbBook} from "../data/nctbBooks";
export default function BookTitle({book}:{book:Pick<NctbBook,"id"|"title"|"englishTitle">}){
 const language=useLanguage();
 return <span data-no-translate>{bookTitle(book,language)}</span>;
}
